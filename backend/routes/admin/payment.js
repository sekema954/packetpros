const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// ======================================================
// FIREBASE ADMIN IMPORTS
// ======================================================

const {
  initializeApp,
  getApps,
  cert,
} = require("firebase-admin/app");

const { getAuth } = require("firebase-admin/auth");

const {
  getFirestore,
  FieldValue,
  Timestamp,
} = require("firebase-admin/firestore");

const router = express.Router();

// ======================================================
// FIREBASE SERVICE ACCOUNT
// ======================================================

// Render: FIREBASE_SERVICE_ACCOUNT contains the full JSON.
// Local: FIREBASE_SERVICE_ACCOUNT contains the filename
// or absolute path of the Firebase service account JSON.

function loadServiceAccount() {
  const value = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();

  if (!value) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT is not configured."
    );
  }

  // Render environment variable containing JSON.
  if (value.startsWith("{")) {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new Error(
        "FIREBASE_SERVICE_ACCOUNT contains invalid JSON. " +
        "For local development, use the service-account " +
        "filename in backend/.env instead. " +
        error.message
      );
    }
  }

  // Local VS Code service account file.
  const filePath = path.isAbsolute(value)
    ? value
    : path.resolve(__dirname, value);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Firebase service account file not found: ${filePath}`
    );
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(
      `Unable to read Firebase service account: ${error.message}`
    );
  }
}

const serviceAccount = loadServiceAccount();

// ======================================================
// FIREBASE ADMIN INITIALIZATION
// ======================================================

const EXPECTED_FIREBASE_PROJECT_ID = "packet-pros-a52f7";

if (serviceAccount.project_id !== EXPECTED_FIREBASE_PROJECT_ID) {
  throw new Error(
    `Firebase project mismatch: ${serviceAccount.project_id}`
  );
}

try {
  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount),
      projectId: EXPECTED_FIREBASE_PROJECT_ID,
    });
  }
} catch (error) {
  console.error("Firebase Admin initialization failed:", {
    code: error.code,
    message: error.message,
  });

  throw error;
}

const auth = getAuth();
const db = getFirestore();

console.log("[PAYMENT] Firebase Admin project:", {
  initialized: auth.app.options.projectId || "NOT DETECTED",
  serviceAccount: serviceAccount.project_id,
  matches:
    auth.app.options.projectId === EXPECTED_FIREBASE_PROJECT_ID &&
    serviceAccount.project_id === EXPECTED_FIREBASE_PROJECT_ID,
});

// ======================================================
// ENVIRONMENT VARIABLES
// ======================================================

const HIGHLEVEL_API_TOKEN =
  process.env.HIGHLEVEL_API_TOKEN;

const HIGHLEVEL_LOCATION_ID =
  process.env.HIGHLEVEL_LOCATION_ID;

const HIGHLEVEL_WEBHOOK_SECRET =
  process.env.HIGHLEVEL_WEBHOOK_SECRET;

const HIGHLEVEL_BEGINNER_SOURCE_ID =
  process.env.HIGHLEVEL_BEGINNER_PAYMENT_SOURCE_ID;

const HIGHLEVEL_ADVANCED_SOURCE_ID =
  process.env.HIGHLEVEL_ADVANCED_PAYMENT_SOURCE_ID;

const HIGHLEVEL_BEGINNER_CHECKOUT_URL =
  process.env.HIGHLEVEL_BEGINNER_CHECKOUT_URL;

const HIGHLEVEL_ADVANCED_CHECKOUT_URL =
  process.env.HIGHLEVEL_ADVANCED_CHECKOUT_URL;

// ======================================================
// COURSE CONFIGURATION
// ======================================================

// IMPORTANT:
// productId must match CHECKOUT_BEGINNER_PRODUCT_ID and
// CHECKOUT_ADVANCED_PRODUCT_ID in PacketPros.tsx.
//
// courseId is the membership course ID.
// productId is the HighLevel payment product ID.

const COURSES = {
  beginner: {
    courseId: "a3dc430d-234d-47e7-ba3d-781c8cae6560",
    productId: "6acb9be8c0e70c7fefb73dc2",
    name: "Beginner Network Engineering",
    expectedAmount: 0,
    currency: "usd",
    sourceId: HIGHLEVEL_BEGINNER_SOURCE_ID,
    checkoutUrl: HIGHLEVEL_BEGINNER_CHECKOUT_URL,
  },

  advanced: {
    courseId: "95697c98-ace9-4c2e-a14e-45d1547061df",
    productId: "6acd43bcc0e70c7fefb741cb",
    name: "Advanced Network Engineering",
    expectedAmount: 0,
    currency: "usd",
    sourceId: HIGHLEVEL_ADVANCED_SOURCE_ID,
    checkoutUrl: HIGHLEVEL_ADVANCED_CHECKOUT_URL,
  },
};

const CHECKOUT_EXPIRATION_MINUTES = 60;

// ======================================================
// GENERAL HELPERS
// ======================================================

function sendError(res, status, message) {
  return res.status(status).json({
    success: false,
    message,
  });
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizeCurrency(currency) {
  return String(currency || "").trim().toLowerCase();
}

function normalizeId(value) {
  return value === undefined || value === null
    ? ""
    : String(value).trim();
}

// Updated product ID lookup.
function getCourseByProductId(productId) {
  const normalizedProductId = normalizeId(productId);

  return Object.entries(COURSES).find(
    ([, course]) => course.productId === normalizedProductId
  );
}

function getCheckoutSessionId(req) {
  return (
    req.body?.checkoutSessionId ||
    req.body?.customData?.checkoutSessionId ||
    req.body?.customFields?.checkoutSessionId ||
    req.query?.checkoutSessionId ||
    null
  );
}

// Constant-time comparison for secrets.
function safeEqual(a, b) {
  const bufA = Buffer.from(String(a || ""));
  const bufB = Buffer.from(String(b || ""));

  return (
    bufA.length === bufB.length &&
    crypto.timingSafeEqual(bufA, bufB)
  );
}

function verifyWebhookSecret(req) {
  if (!HIGHLEVEL_WEBHOOK_SECRET) {
    return false;
  }

  const provided =
    req.headers["x-webhook-secret"] ||
    req.headers["x-highlevel-webhook-secret"] ||
    req.body?.webhookSecret ||
    "";

  return (
    Boolean(provided) &&
    safeEqual(provided, HIGHLEVEL_WEBHOOK_SECRET)
  );
}

// ======================================================
// FIREBASE AUTHENTICATION MIDDLEWARE
// ======================================================

async function requireFirebaseAuth(req, res, next) {
  const requestId = crypto.randomUUID();

  try {
    const authorization = req.headers.authorization || "";

    if (!authorization.startsWith("Bearer ")) {
      return sendError(
        res,
        401,
        "Authentication token is required."
      );
    }

    const token = authorization.substring(7).trim();

    if (!token) {
      return sendError(
        res,
        401,
        "Authentication token is empty."
      );
    }

    const decodedToken = await auth.verifyIdToken(token);

    if (!decodedToken.email) {
      return sendError(
        res,
        401,
        "Your account must have an email address."
      );
    }

    if (!decodedToken.email_verified) {
      return sendError(
        res,
        403,
        "Please verify your email before continuing."
      );
    }

    req.firebaseUser = decodedToken;
    req.authRequestId = requestId;

    return next();
  } catch (error) {
    console.error(
      `[AUTH ${requestId}] Firebase verification FAILED`,
      {
        code: error.code,
        message: error.message,
      }
    );

    return sendError(
      res,
      401,
      "Invalid or expired authentication token."
    );
  }
}

// ======================================================
// GHL API REQUEST
// ======================================================

async function highLevelRequest(url, options = {}) {
  if (!HIGHLEVEL_API_TOKEN) {
    throw new Error(
      "HIGHLEVEL_API_TOKEN is not configured."
    );
  }

  const response = await fetch(url, {
    ...options,

    headers: {
      Authorization: `Bearer ${HIGHLEVEL_API_TOKEN}`,
      Version: "v3",
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options.headers,
    },

    signal: AbortSignal.timeout(15000),
  });

  const responseText = await response.text();

  let data = {};

  try {
    data = responseText
      ? JSON.parse(responseText)
      : {};
  } catch {
    data = {
      rawResponse: responseText,
    };
  }

  if (!response.ok) {
    console.error("[GHL API ERROR]", {
      status: response.status,
      endpoint: new URL(url).pathname,
      response: data,
    });

    throw new Error(
      `HighLevel API request failed (${response.status}).`
    );
  }

  return data;
}

// ======================================================
// VERIFY TRANSACTION WITH GHL
// ======================================================

async function getVerifiedTransaction(transactionId) {
  if (!HIGHLEVEL_LOCATION_ID) {
    throw new Error(
      "HIGHLEVEL_LOCATION_ID is not configured."
    );
  }

  const url = new URL(
    `https://services.leadconnectorhq.com/payments/transactions/${encodeURIComponent(
      transactionId
    )}`
  );

  url.searchParams.set(
    "altId",
    HIGHLEVEL_LOCATION_ID
  );

  url.searchParams.set(
    "altType",
    "location"
  );

  url.searchParams.set(
    "locationId",
    HIGHLEVEL_LOCATION_ID
  );

  const data = await highLevelRequest(
    url.toString(),
    {
      method: "GET",
    }
  );

  const tx =
    data.transaction ||
    data.data?.transaction ||
    data.data ||
    data;

  return Array.isArray(tx) ? tx[0] : tx;
}

// ======================================================
// TRANSACTION DATA HELPERS
// ======================================================

function getTransactionStatus(transaction) {
  return String(
    transaction.status ||
    transaction.paymentStatus ||
    transaction.transactionStatus ||
    ""
  ).toLowerCase();
}

function getTransactionAmount(transaction) {
  const value =
    transaction.amount ??
    transaction.totalAmount ??
    transaction.amountPaid;

  const amount = Number(value);

  return Number.isFinite(amount)
    ? amount
    : null;
}

function getTransactionCurrency(transaction) {
  return normalizeCurrency(
    transaction.currency ||
    transaction.currencyCode ||
    "usd"
  );
}

function getTransactionEmail(transaction) {
  return normalizeEmail(
    transaction.contactSnapshot?.email ||
    transaction.contact?.email ||
    transaction.customer?.email ||
    transaction.email ||
    transaction.customerEmail
  );
}

function getTransactionSourceId(transaction) {
  return (
    transaction.entitySource?.id ||
    transaction.source?.id ||
    transaction.sourceId ||
    transaction.paymentSourceId ||
    null
  );
}

function getTransactionRefundedAmount(transaction) {
  const value =
    transaction.amountRefunded ??
    transaction.refundedAmount ??
    0;

  const amount = Number(value);

  return Number.isFinite(amount)
    ? amount
    : 0;
}

// ======================================================
// GET STUDENT ENROLLMENTS
// GET /api/my-enrollments
// ======================================================

router.get(
  "/my-enrollments",
  requireFirebaseAuth,
  async (req, res) => {
    try {
      const uid = req.firebaseUser.uid;

      const snapshot = await db
        .collection("users")
        .doc(uid)
        .collection("enrollments")
        .get();

      const enrollments = snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

      const activeEnrollments = enrollments.filter(
        (enrollment) =>
          enrollment.status === "active" ||
          enrollment.active === true
      );

      return res.json({
        success: true,
        enrollments: activeEnrollments,
      });
    } catch (error) {
      console.error("Enrollment lookup error:", {
        code: error.code,
        message: error.message,
      });

      return sendError(
        res,
        500,
        "Unable to retrieve your course enrollments."
      );
    }
  }
);

// ======================================================
// CREATE CHECKOUT SESSION
// POST /api/highlevel/create-checkout-session
// ======================================================

router.post(
  "/highlevel/create-checkout-session",
  requireFirebaseAuth,
  async (req, res) => {
    try {
      // Updated product ID normalization.
      const productId = normalizeId(req.body?.productId);

      // Debugging for Render logs.
      console.log("[COURSE CHECKOUT]", {
        receivedProductId: productId,
        validProductIds: Object.values(COURSES).map(
          (course) => course.productId
        ),
      });

      if (!productId) {
        return sendError(
          res,
          400,
          "Product ID is required."
        );
      }

      const courseEntry = getCourseByProductId(productId);

      if (!courseEntry) {
        return sendError(
          res,
          400,
          "Invalid course product."
        );
      }

      const [courseKey, course] = courseEntry;

      if (!course.checkoutUrl) {
        return sendError(
          res,
          500,
          `Checkout URL for ${courseKey} is not configured.`
        );
      }

      const uid = req.firebaseUser.uid;

      const email = normalizeEmail(
        req.firebaseUser.email
      );

      // Check whether the student already owns this course.
      const existingEnrollment = await db
        .collection("users")
        .doc(uid)
        .collection("enrollments")
        .doc(courseKey)
        .get();

      if (
        existingEnrollment.exists &&
        existingEnrollment.data()?.status === "active"
      ) {
        return res.json({
          success: true,
          alreadyEnrolled: true,
          courseKey,
        });
      }

      // Generate a unique checkout session.
      const checkoutSessionId = crypto.randomUUID();

      const expiresAt =
        Date.now() +
        CHECKOUT_EXPIRATION_MINUTES * 60 * 1000;

      // Save pending checkout in Firestore.
      await db
        .collection("pendingCheckouts")
        .doc(checkoutSessionId)
        .set({
          checkoutSessionId,
          uid,
          email,
          courseKey,
          courseId: course.courseId,
          productId: course.productId,
          courseName: course.name,
          expectedAmount: course.expectedAmount,
          currency: course.currency,
          status: "pending",
          createdAt: FieldValue.serverTimestamp(),
          expiresAt: Timestamp.fromMillis(expiresAt),
        });

      // Construct the HighLevel payment URL.
      const checkoutUrl = new URL(course.checkoutUrl);

      checkoutUrl.searchParams.set(
        "checkoutSessionId",
        checkoutSessionId
      );

      checkoutUrl.searchParams.set(
        "email",
        email
      );

      return res.json({
        success: true,
        checkoutUrl: checkoutUrl.toString(),
        checkoutSessionId,
      });
    } catch (error) {
      console.error("Checkout creation error:", {
        code: error.code,
        message: error.message,
      });

      return sendError(
        res,
        500,
        "Unable to create checkout session."
      );
    }
  }
);

// ======================================================
// GHL PAYMENT WEBHOOK
// POST /api/highlevel/payment
// ======================================================

router.post(
  "/highlevel/payment",
  async (req, res) => {
    // Validate webhook configuration.
    if (!HIGHLEVEL_WEBHOOK_SECRET) {
      console.error(
        "HIGHLEVEL_WEBHOOK_SECRET is not configured."
      );

      return sendError(
        res,
        500,
        "Webhook configuration error."
      );
    }

    // Validate webhook authentication.
    if (!verifyWebhookSecret(req)) {
      return sendError(
        res,
        401,
        "Invalid webhook secret."
      );
    }

    try {
      const body = req.body || {};

      // Extract transaction ID.
      const transactionId = normalizeId(
        body.transactionId ||
        body.transaction_id ||
        body.payment?.transactionId ||
        body.payment?.id
      );

      // Extract product ID.
      const productId = normalizeId(
        body.productId ||
        body.product_id ||
        body.customData?.productId ||
        body.customFields?.productId
      );

      // Extract checkout session ID.
      const checkoutSessionId = normalizeId(
        getCheckoutSessionId(req)
      );

      if (!transactionId || !productId) {
        return sendError(
          res,
          400,
          "Missing transaction ID or product ID."
        );
      }

      // Find the course using the corrected payment product ID.
      const courseEntry = getCourseByProductId(productId);

      if (!courseEntry) {
        return sendError(
          res,
          400,
          "Unknown course product."
        );
      }

      const [courseKey, course] = courseEntry;

      // Firestore payment event reference.
      const eventRef = db
        .collection("coursePaymentEvents")
        .doc(transactionId);

      const recordEvent = (
        status,
        extra = {}
      ) =>
        eventRef.set(
          {
            transactionId,
            productId,
            courseKey,
            status,
            ...extra,
            updatedAt: FieldValue.serverTimestamp(),
          },
          {
            merge: true,
          }
        );

      // ==================================================
      // CHECK FOR DUPLICATE PAYMENT
      // ==================================================

      const paymentRef = db
        .collection("highlevelPayments")
        .doc(transactionId);

      const existingPayment = await paymentRef.get();

      if (existingPayment.exists) {
        return res.json({
          success: true,
          alreadyProcessed: true,
        });
      }

      // ==================================================
      // VERIFY PAYMENT DIRECTLY WITH HIGHLEVEL
      // ==================================================

      const transaction = await getVerifiedTransaction(
        transactionId
      );

      if (
        !transaction ||
        typeof transaction !== "object"
      ) {
        return sendError(
          res,
          400,
          "Unable to verify payment transaction."
        );
      }

      // ==================================================
      // VERIFY PAYMENT STATUS
      // ==================================================

      const transactionStatus = getTransactionStatus(
        transaction
      );

      if (transactionStatus !== "succeeded") {
        await recordEvent(
          `ghl_${transactionStatus || "unknown"}`
        );

        return sendError(
          res,
          400,
          "Payment has not succeeded."
        );
      }

      // ==================================================
      // CHECK FOR REFUNDS
      // ==================================================

      if (getTransactionRefundedAmount(transaction) > 0) {
        await recordEvent("refunded");

        return sendError(
          res,
          400,
          "Refunded transactions cannot grant course access."
        );
      }

      // ==================================================
      // VERIFY PAYMENT AMOUNT
      // ==================================================

      const transactionAmount = getTransactionAmount(
        transaction
      );

      if (
        transactionAmount === null ||
        transactionAmount !== Number(course.expectedAmount)
      ) {
        await recordEvent(
          "amount_mismatch",
          {
            amount: transactionAmount,
            expectedAmount: course.expectedAmount,
          }
        );

        return sendError(
          res,
          400,
          "Payment amount does not match the course price."
        );
      }

      // ==================================================
      // VERIFY PAYMENT CURRENCY
      // ==================================================

      if (
        getTransactionCurrency(transaction) !== course.currency
      ) {
        await recordEvent("currency_mismatch");

        return sendError(
          res,
          400,
          "Payment currency does not match the course currency."
        );
      }

      // ==================================================
      // VERIFY PAYMENT SOURCE
      // ==================================================

      const transactionSourceId = getTransactionSourceId(
        transaction
      );

      if (
        !course.sourceId ||
        transactionSourceId !== course.sourceId
      ) {
        await recordEvent(
          "source_mismatch",
          {
            sourceId: transactionSourceId,
          }
        );

        return sendError(
          res,
          403,
          "Payment source does not match the configured course."
        );
      }

      // ==================================================
      // MATCH PAYMENT TO PACKETPROS USER
      // ==================================================

      const transactionEmail = getTransactionEmail(
        transaction
      );

      let uid = null;
      let accountEmail = null;
      let sessionRef = null;

      // First attempt to match the checkout session.
      if (checkoutSessionId) {
        const candidateRef = db
          .collection("pendingCheckouts")
          .doc(checkoutSessionId);

        const sessionSnapshot = await candidateRef.get();

        if (sessionSnapshot.exists) {
          const session = sessionSnapshot.data();

          const sessionValid =
            session.status === "pending" &&
            session.productId === course.productId &&
            session.courseKey === courseKey &&
            (
              !session.expiresAt ||
              session.expiresAt.toMillis() >= Date.now()
            );

          if (sessionValid) {
            uid = session.uid;
            accountEmail = normalizeEmail(session.email);
            sessionRef = candidateRef;
          }
        }
      }

      // ==================================================
      // FALLBACK: MATCH BY TRANSACTION EMAIL
      // ==================================================

      if (!uid) {
        if (!transactionEmail) {
          await recordEvent("no_email");

          return sendError(
            res,
            400,
            "No email on transaction."
          );
        }

        try {
          const user = await auth.getUserByEmail(
            transactionEmail
          );

          uid = user.uid;
          accountEmail = normalizeEmail(user.email);
        } catch {
          await recordEvent(
            "no_matching_user",
            {
              email: transactionEmail,
            }
          );

          return res.status(202).json({
            success: true,
            enrollmentCreated: false,
          });
        }
      }

      // ==================================================
      // GRANT COURSE ENROLLMENT
      // ==================================================

      const enrollmentRef = db
        .collection("users")
        .doc(uid)
        .collection("enrollments")
        .doc(courseKey);

      const batch = db.batch();

      // ==================================================
      // SAVE VERIFIED PAYMENT
      // ==================================================

      batch.set(
        paymentRef,
        {
          transactionId,
          checkoutSessionId: checkoutSessionId || null,
          uid,
          email: accountEmail,
          paymentEmail: transactionEmail || null,
          productId: course.productId,
          courseId: course.courseId,
          courseKey,
          courseName: course.name,
          amount: transactionAmount,
          currency: course.currency,
          sourceId: transactionSourceId,
          status: "succeeded",
          createdAt: FieldValue.serverTimestamp(),
        }
      );

      // ==================================================
      // SAVE ACTIVE ENROLLMENT
      // ==================================================

      batch.set(
        enrollmentRef,
        {
          uid,
          email: accountEmail,
          courseKey,
          courseId: course.courseId,
          productId: course.productId,
          courseName: course.name,
          status: "active",
          active: true,
          paymentTransactionId: transactionId,
          enrolledAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      // ==================================================
      // COMPLETE PENDING CHECKOUT SESSION
      // ==================================================

      if (sessionRef) {
        batch.update(
          sessionRef,
          {
            status: "completed",
            transactionId,
            completedAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
          }
        );
      }

      // ==================================================
      // UPDATE PAYMENT EVENT
      // ==================================================

      batch.set(
        eventRef,
        {
          transactionId,
          productId,
          courseKey,
          uid,
          status: "completed",
          updatedAt: FieldValue.serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      // Commit all Firestore writes together.
      await batch.commit();

      console.log(
        "Course payment verified and enrollment created:",
        {
          transactionId,
          uid,
          courseKey,
        }
      );

      return res.json({
        success: true,
        message:
          "Payment verified and course enrollment created.",
        courseKey,
        courseId: course.courseId,
      });
    } catch (error) {
      console.error("HighLevel payment webhook error:", {
        code: error.code,
        message: error.message,
      });

      return sendError(
        res,
        500,
        "Unable to process payment webhook."
      );
    }
  }
);
module.exports = router