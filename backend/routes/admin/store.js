"use strict";

const express = require("express");
const axios = require("axios");
const crypto = require("crypto");

const { getApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const {
  getFirestore,
  FieldValue,
} = require("firebase-admin/firestore");

const router = express.Router();

const LOCATION_ID = process.env.HIGHLEVEL_LOCATION_ID;
const API_TOKEN = process.env.HIGHLEVEL_API_TOKEN;

const GHL_API =
  process.env.HIGHLEVEL_API_BASE ||
  "https://services.leadconnectorhq.com";

const GHL_VERSION =
  process.env.HIGHLEVEL_API_VERSION ||
  "2021-07-28";

const EXCLUDED_IDS = new Set([
  "6acb9be8c0e70c7fefb73dc2",
  "6acd43bcc0e70c7fefb741cb",
  "a3dc430d-234d-47e7-ba3d-781c8cae6560",
  "95697c98-ace9-4c2e-a14e-45d1547061df",
]);

const PAYMENT_HOST = "link.fastpaydirect.com";

const ghl = axios.create({
  baseURL: GHL_API,
  timeout: 20000,
  headers: {
    Authorization: `Bearer ${API_TOKEN || ""}`,
    Version: GHL_VERSION,
    Accept: "application/json",
  },
});

// ================================================
// FIREBASE
// ================================================

function firebaseServices() {
  const app = getApp();

  return {
    auth: getAuth(app),
    db: getFirestore(app),
  };
}

async function recordVerifiedPurchase({
  uid,
  productId,
  transactionId,
}) {
  if (!uid || !productId || !transactionId) {
    throw new Error("Missing verified purchase information");
  }

  const { db } = firebaseServices();

  const purchaseRef = db
    .collection("users")
    .doc(uid)
    .collection("purchases")
    .doc(productId);

  await purchaseRef.set(
    {
      productId,
      transactionId,
      status: "completed",
      purchasedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  console.log(
    `[SHOP] Verified purchase saved: ${uid} / ${productId}`
  );
}

function normalizeId(value) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function logError(label, error) {
  console.error(label, {
    message: error.message,
    status: error.response?.status,
    details: error.response?.data,
  });
}

// ================================================
// EXCLUDE ACADEMY / COURSES FROM SHOP
// ================================================

function isCourseProduct(product) {
  const id = normalizeId(
    product?.id || product?._id
  );

  if (EXCLUDED_IDS.has(id)) {
    return true;
  }

  const name = String(
    product?.name || product?.title || ""
  )
    .toLowerCase()
    .trim();

  const category = String(
    product?.category?.name ||
    product?.category ||
    product?.productType ||
    ""
  ).toLowerCase();

  if (
    name === "packetpros academy" ||
    name === "packet pros academy" ||
    name === "advanced" ||
    name === "beginner" ||
    name === "advanced course" ||
    name === "beginner course" ||
    name.includes("packetpros academy") ||
    name.includes("packet pros academy") ||
    name.includes("advanced membership") ||
    name.includes("beginner membership")
  ) {
    return true;
  }

  return [
    "course",
    "courses",
    "membership",
    "memberships",
  ].includes(category);
}

// ================================================
// VALIDATE PAYMENT LINKS
// ================================================

function isValidCheckoutUrl(value) {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      url.hostname === PAYMENT_HOST &&
      /^\/payment-link\/[a-zA-Z0-9]+\/?$/.test(
        url.pathname
      )
    );
  } catch {
    return false;
  }
}

// ================================================
// FIREBASE AUTH
// ================================================

async function requireFirebaseUser(req, res, next) {
  const header = req.headers.authorization || "";

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Missing Firebase authentication token",
    });
  }

  try {
    const token = header.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        error: "Empty Firebase token",
      });
    }

    const { auth } = firebaseServices();

    req.firebaseUser =
      await auth.verifyIdToken(token);

    next();
  } catch (error) {
    console.error("[SHOP AUTH]", error.message);

    return res.status(401).json({
      error: "Invalid or expired Firebase session",
    });
  }
}

// ================================================
// FETCH GHL PRODUCTS
// ================================================

async function getAllProducts() {
  if (!LOCATION_ID || !API_TOKEN) {
    throw new Error(
      "Missing HIGHLEVEL_LOCATION_ID or HIGHLEVEL_API_TOKEN"
    );
  }

  const products = new Map();
  const seenNames = new Set();

  const limit = 100;
  let offset = 0;

  for (let page = 0; page < 30; page++) {
    const response = await ghl.get("/products/", {
      params: {
        locationId: LOCATION_ID,
        limit,
        offset,
      },
    });

    const data = response.data || {};

    const batch = Array.isArray(data.products)
      ? data.products
      : Array.isArray(data.data?.products)
        ? data.data.products
        : [];

    for (const product of batch) {
      const id = normalizeId(
        product.id || product._id
      );

      if (!id || isCourseProduct(product)) {
        continue;
      }

      const nameKey = String(
        product.name || product.title || ""
      )
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

      if (
        products.has(id) ||
        (nameKey && seenNames.has(nameKey))
      ) {
        continue;
      }

      products.set(id, product);

      if (nameKey) {
        seenNames.add(nameKey);
      }
    }

    if (batch.length < limit) {
      return [...products.values()];
    }

    offset += limit;
  }

  throw new Error("Product pagination limit exceeded");
}

// ================================================
// FETCH ACTUAL GHL PRICES
// ================================================

async function getGHLProductPrices(productId) {
  const allPrices = [];
  const limit = 100;
  let offset = 0;

  try {
    for (let page = 0; page < 10; page++) {
      const response = await ghl.get(
        `/products/${encodeURIComponent(productId)}/price`,
        {
          params: {
            locationId: LOCATION_ID,
            limit,
            offset,
          },
        }
      );

      const data = response.data || {};

      const batch = Array.isArray(data.prices)
        ? data.prices
        : Array.isArray(data.data?.prices)
          ? data.data.prices
          : [];

      allPrices.push(...batch);

      if (batch.length < limit) {
        break;
      }

      offset += limit;
    }

    return allPrices;
  } catch (error) {
    logError(
      `[SHOP PRICE ERROR] ${productId}`,
      error
    );

    // Do not invent a price when GHL fails.
    return allPrices;
  }
}

// ================================================
// VERIFY TRANSACTION WITH GHL
// ================================================

async function getVerifiedTransaction(transactionId) {
  const response = await ghl.get(
    `/payments/transactions/${encodeURIComponent(transactionId)}`,
    {
      params: {
        altId: LOCATION_ID,
        altType: "location",
        locationId: LOCATION_ID,
      },
    }
  );

  const d = response.data || {};
  const tx = d.transaction || d.data?.transaction || d.data || d;

  // GHL returns the transaction wrapped in an array.
  return Array.isArray(tx) ? tx[0] : tx;
}

// ================================================
// NORMALIZE PRICE
// ================================================

function parsePrice(product) {
  const firstPrice = product.prices?.[0];

  const candidates = [
    firstPrice?.amount,
    firstPrice?.price,
    product.price?.amount,
    product.price,
    product.amount,
  ];

  for (const value of candidates) {
    if (value == null || value === "") {
      continue;
    }

    const amount = Number(value);

    if (Number.isFinite(amount) && amount >= 0) {
      return amount;
    }
  }

  return null;
}

// ================================================
// NORMALIZE PRODUCT FOR REACT
// ================================================

function normalizeProduct(product, payment = null) {
  const id = normalizeId(
    product.id || product._id
  );

  const prices = Array.isArray(product.prices)
    ? product.prices
    : [];

  const firstImage = product.images?.[0];

  return {
    id,

    name:
      product.name ||
      product.title ||
      "Digital Product",

    description:
      product.description || "",

    image:
      product.image ||
      (typeof firstImage === "string"
        ? firstImage
        : firstImage?.url) ||
      null,

    prices,

    // Actual GHL price, not Firestore override.
    price: parsePrice(product),

    currency:
      prices[0]?.currency ||
      product.price?.currency ||
      product.currency ||
      "USD",

    canPurchase: Boolean(payment),

    paymentLinkAvailable: Boolean(payment),
  };
}

// ================================================
// FIRESTORE PAYMENT LINKS
// ================================================

async function getPaymentLinks() {
  const { db } = firebaseServices();

  const snapshot = await db
    .collection("shopPaymentLinks")
    .get();

  const links = new Map();

  snapshot.forEach((doc) => {
    const data = doc.data() || {};

    if (
      data.active === true &&
      isValidCheckoutUrl(data.checkoutUrl)
    ) {
      links.set(doc.id, {
        checkoutUrl: data.checkoutUrl,
      });
    }
  });

  return links;
}

// ================================================
// ENRICH PRODUCTS WITH GHL PRICES
// ================================================

async function enrichProducts(products, paymentLinks) {
  // Limit simultaneous requests to avoid
  // overwhelming the GHL API.
  const results = [];
  const concurrency = 5;

  for (let i = 0; i < products.length; i += concurrency) {
    const batch = products.slice(i, i + concurrency);

    const enriched = await Promise.all(
      batch.map(async (product) => {
        const id = normalizeId(
          product.id || product._id
        );

        const prices = await getGHLProductPrices(id);

        const payment = paymentLinks.get(id) || null;

        return normalizeProduct(
          {
            ...product,
            prices: prices.length
              ? prices
              : Array.isArray(product.prices)
                ? product.prices
                : [],
          },
          payment
        );
      })
    );

    results.push(...enriched);
  }

  return results;
}

async function getProductById(productId) {
  const products = await getAllProducts();

  return products.find(
    (product) =>
      normalizeId(product.id || product._id) === productId
  );
}

// ================================================
// HEALTH CHECK
// ================================================

router.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "packetpros-shop",
    highlevelConfigured: Boolean(
      LOCATION_ID && API_TOKEN
    ),
  });
});

// ================================================
// GET ALL SHOP PRODUCTS
// ================================================

router.get("/products", async (req, res) => {
  try {
    const [products, paymentLinks] =
      await Promise.all([
        getAllProducts(),
        getPaymentLinks(),
      ]);

    const results = await enrichProducts(
      products,
      paymentLinks
    );

    return res.json({
      success: true,
      products: results,
      count: results.length,
    });
  } catch (error) {
    logError("[SHOP PRODUCTS]", error);

    return res.status(502).json({
      error: "Unable to load Shop products",
    });
  }
});

// ================================================
// GET USER PURCHASES
// ================================================

router.get(
  "/my-purchases",
  requireFirebaseUser,
  async (req, res) => {
    try {
      const { db } = firebaseServices();

      const snapshot = await db
        .collection("users")
        .doc(req.firebaseUser.uid)
        .collection("purchases")
        .get();

      const purchases = snapshot.docs.map((doc) => ({
        ...doc.data(),
        productId: doc.id,
      }));

      return res.json({
        success: true,
        purchases,
      });
    } catch (error) {
      logError("[SHOP PURCHASES]", error);

      return res.status(500).json({
        error: "Unable to retrieve purchases",
      });
    }
  }
);

// ================================================
// CREATE CHECKOUT SESSION
// ================================================

router.post(
  "/create-checkout-session",
  requireFirebaseUser,
  async (req, res) => {
    try {
      const { db } = firebaseServices();

      const productId = normalizeId(
        req.body?.productId
      );

    console.log("[SHOP CHECKOUT DEBUG]", {
    receivedProductId: req.body?.productId,
    firebaseUid: req.firebaseUser?.uid,
    });

      if (!productId) {
        return res.status(400).json({
          error: "Product ID is required",
        });
      }

      const product = await getProductById(productId);

      if (!product) {
        return res.status(404).json({
          error: "Shop product not found",
        });
      }

      const purchaseRef = db
        .collection("users")
        .doc(req.firebaseUser.uid)
        .collection("purchases")
        .doc(productId);

      const existing = await purchaseRef.get();

      if (
        existing.exists &&
        ["completed", "active"].includes(
          existing.data()?.status
        )
      ) {
        return res.status(409).json({
          error: "You already own this product",
        });
      }

      const linkSnapshot = await db
        .collection("shopPaymentLinks")
        .doc(productId)
        .get();

      const link = linkSnapshot.data();

      if (
        !linkSnapshot.exists ||
        link?.active !== true ||
        !isValidCheckoutUrl(link?.checkoutUrl)
      ) {
        return res.status(400).json({
          error: "Checkout link is not configured",
        });
      }

      const pendingRef = db
        .collection("shopPendingCheckouts")
        .doc();

      await pendingRef.set({
        uid: req.firebaseUser.uid,
        email: normalizeEmail(req.firebaseUser.email),
        productId,
        status: "pending",
        createdAt: FieldValue.serverTimestamp(),
      });

      // Prefill the buyer's account email so the webhook can match
      // the payment to their PacketPros account. Buyers can still
      // edit this field, so the webhook keeps a no_matching_user
      // fallback.
      const checkoutUrl = new URL(link.checkoutUrl);

      if (req.firebaseUser.email) {
        checkoutUrl.searchParams.set(
          "email",
          req.firebaseUser.email
        );
      }

      return res.json({
        success: true,
        checkoutUrl: checkoutUrl.toString(),
        checkoutReference: pendingRef.id,
      });
    } catch (error) {
      logError("[SHOP CHECKOUT]", error);

      return res.status(500).json({
        error: "Unable to start checkout",
      });
    }
  }
);

// ================================================
// GET SINGLE PRODUCT
// ================================================

router.get("/products/:productId", async (req, res) => {
  try {
    const productId = normalizeId(
      req.params.productId
    );

    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    const [prices, paymentLinks] =
      await Promise.all([
        getGHLProductPrices(productId),
        getPaymentLinks(),
      ]);

    const payment = paymentLinks.get(productId);

    return res.json({
      success: true,
      product: normalizeProduct(
        {
          ...product,
          prices: prices.length
            ? prices
            : product.prices || [],
        },
        payment
      ),
    });
  } catch (error) {
    logError("[SHOP PRODUCT DETAIL]", error);

    return res.status(502).json({
      error: "Unable to retrieve product",
    });
  }
});

// ================================================
// WEBHOOK SECRET VALIDATION
// ================================================

function verifyWebhookSecret(req) {
  const expected =
    process.env.SHOP_WEBHOOK_SECRET || "";

  const supplied =
    req.get("x-packetpros-webhook-secret") || "";

  if (!expected || !supplied) {
    return false;
  }

  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);

  return (
    a.length === b.length &&
    crypto.timingSafeEqual(a, b)
  );
}

// ================================================
// GHL PAYMENT WEBHOOK
// ================================================

router.post("/highlevel/payment", async (req, res) => {
  if (!verifyWebhookSecret(req)) {
    return res.status(401).json({
      error: "Unauthorized webhook",
    });
  }

  try {
    const { db, auth } = firebaseServices();
    const body = req.body || {};

    const transactionId = normalizeId(body.transactionId);
    const productId = normalizeId(body.productId);

    if (!transactionId || !productId) {
      return res.status(400).json({
        error: "Transaction ID and Product ID are required",
      });
    }

    // Never grant anything for course products via the shop webhook.
    if (EXCLUDED_IDS.has(productId)) {
      return res.status(400).json({
        error: "Not a shop product",
      });
    }

    const eventRef = db
      .collection("shopPaymentEvents")
      .doc(transactionId);

    const existing = await eventRef.get();

    if (existing.exists && existing.data()?.status === "completed") {
      return res.json({
        success: true,
        alreadyProcessed: true,
      });
    }

    // 1. Verify the transaction directly with GHL.
    //    Never trust the webhook body for payment status.
    const tx = await getVerifiedTransaction(transactionId);

    if (!tx || typeof tx !== "object") {
      return res.status(400).json({
        error: "Unable to verify transaction",
      });
    }

    const status = String(
      tx.status ||
        tx.paymentStatus ||
        tx.transactionStatus ||
        ""
    ).toLowerCase();

    if (status !== "succeeded") {
      await eventRef.set(
        {
          transactionId,
          productId,
          status: `ghl_${status || "unknown"}`,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      return res.status(400).json({
        error: "Payment has not succeeded",
      });
    }

    if (Number(tx.amountRefunded ?? tx.refundedAmount ?? 0) > 0) {
      return res.status(400).json({
        error: "Transaction was refunded",
      });
    }

    // Confirm the payment came from the payment link configured for
    // this product, so a valid transaction can't be replayed against
    // a different productId.
    const linkDoc = await db
      .collection("shopPaymentLinks")
      .doc(productId)
      .get();

    const storedUrl = linkDoc.data()?.checkoutUrl || "";
    const paidLinkId = tx.entitySource?.id || "";

    if (!paidLinkId || !storedUrl.includes(paidLinkId)) {
      await eventRef.set(
        {
          transactionId,
          productId,
          status: "link_mismatch",
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      return res.status(403).json({
        error: "Payment link does not match product",
      });
    }

    // 2. Find the Firebase user by the verified payment email.
    const email = normalizeEmail(
      tx.contactSnapshot?.email ||
        tx.contact?.email ||
        tx.customer?.email ||
        tx.email ||
        tx.customerEmail
    );

    if (!email) {
      await eventRef.set(
        {
          transactionId,
          productId,
          status: "no_email",
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      return res.status(400).json({
        error: "No email on transaction",
      });
    }

    let user;

    try {
      user = await auth.getUserByEmail(email);
    } catch (lookupError) {
      // Paid with an email that has no PacketPros account.
      // Keep the event for manual reconciliation.
      await eventRef.set(
        {
          transactionId,
          productId,
          email,
          status: "no_matching_user",
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      return res.status(202).json({
        success: true,
        purchaseRecorded: false,
      });
    }

    // 3. Record the purchase.
    await recordVerifiedPurchase({
      uid: user.uid,
      productId,
      transactionId,
    });

    await eventRef.set(
      {
        transactionId,
        productId,
        email,
        uid: user.uid,
        status: "completed",
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return res.json({
      success: true,
      purchaseRecorded: true,
    });
  } catch (error) {
    logError("[SHOP WEBHOOK]", error);

    return res.status(500).json({
      error: "Unable to process payment event",
    });
  }
});

module.exports = router;