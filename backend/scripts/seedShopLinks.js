
"use strict";

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const {
  initializeApp,
  getApps,
  cert,
} = require("firebase-admin/app");

const {
  getFirestore,
} = require("firebase-admin/firestore");

// =====================================================
// 1. LOAD ENVIRONMENT VARIABLES
// =====================================================

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// =====================================================
// 2. FIREBASE CONFIGURATION
// =====================================================

const PROJECT_ID = "packet-pros-a52f7";

// Your existing Firebase Admin service account JSON
const SERVICE_ACCOUNT_PATH = path.resolve(
  __dirname,
  "../routes/admin/packet-pros-a52f7-firebase-adminsdk-fbsvc-c2b0b4f7cd.json"
);

// =====================================================
// 3. INITIALIZE FIREBASE ADMIN
// =====================================================

function initializeFirebase() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    throw new Error(
      `Firebase service account JSON not found:\n${SERVICE_ACCOUNT_PATH}`
    );
  }

  const serviceAccount = JSON.parse(
    fs.readFileSync(SERVICE_ACCOUNT_PATH, "utf8")
  );

  if (serviceAccount.project_id !== PROJECT_ID) {
    throw new Error(
      `Wrong Firebase project. Expected ${PROJECT_ID}, found ${serviceAccount.project_id}`
    );
  }

  const app = initializeApp({
    credential: cert(serviceAccount),
    projectId: PROJECT_ID,
  });

  console.log(
    `Firebase initialized: ${app.options.projectId}`
  );

  return app;
}

// =====================================================
// 4. GHL PRODUCT → PAYMENT LINK MAPPINGS
// =====================================================

const shopLinks = [
  {
    name: "Resume Template",
    productId: "6ae102947d1cf1464057edcf",
    paymentLinkId: "6ae103245b49394de8f575e1",
  },
  {
    name: "Command Vault",
    productId: "6ac5660fb12dc3020c8093d1",
    paymentLinkId: "6ae0f86c00921ddbe8edf8ea",
  },
  {
    name: "NE Interview Guide",
    productId: "6ac564187fb41b96b5ba1ef3",
    paymentLinkId: "6ae0f36a5b49394de8f57579",
  },
  {
    name: "Subnet Cheat Sheet",
    productId: "6ac5673afca4ee164f3379d1",
    paymentLinkId: "6ae0f8dd00921ddbe8edf8ee",
  },
  {
    name: "NE Roadmap",
    productId: "6ac54c1a37cbe0a7a0cea437",
    paymentLinkId: "6ae0f90d5b49394de8f575aa",
  },
];

// =====================================================
// 5. VALIDATE MAPPINGS
// =====================================================

function validateShopLinks() {
  const productIds = new Set();
  const paymentLinkIds = new Set();

  for (const product of shopLinks) {
    if (
      !/^[a-f0-9]{24}$/i.test(product.productId) ||
      !/^[a-f0-9]{24}$/i.test(product.paymentLinkId)
    ) {
      throw new Error(
        `Invalid ID for ${product.name}`
      );
    }

    if (productIds.has(product.productId)) {
      throw new Error(
        `Duplicate product ID: ${product.productId}`
      );
    }

    if (paymentLinkIds.has(product.paymentLinkId)) {
      throw new Error(
        `Duplicate payment link ID: ${product.paymentLinkId}`
      );
    }

    productIds.add(product.productId);
    paymentLinkIds.add(product.paymentLinkId);
  }
}

// =====================================================
// 6. SAVE PAYMENT LINKS TO FIRESTORE
// =====================================================

async function seedShopPaymentLinks() {
  console.log("\nStarting PacketPros Shop setup...\n");

  validateShopLinks();

  const app = initializeFirebase();

  const db = getFirestore(app);

  const batch = db.batch();

  for (const product of shopLinks) {
    const checkoutUrl =
      `https://link.fastpaydirect.com/payment-link/${product.paymentLinkId}`;

    const documentRef = db
      .collection("shopPaymentLinks")
      .doc(product.productId);

    batch.set(
      documentRef,
      {
        name: product.name,
        productId: product.productId,
        paymentLinkId: product.paymentLinkId,
        checkoutUrl,
        active: true,
      },
      { merge: true }
    );

    console.log(
      `[READY] ${product.name}`
    );

    console.log(
      `        Product: ${product.productId}`
    );

    console.log(
      `        Checkout: ${checkoutUrl}\n`
    );
  }

  await batch.commit();

  console.log(
    "SUCCESS: All 5 payment links saved to Firestore!\n"
  );

  console.log(
    "Collection: shopPaymentLinks"
  );

  console.log(
    `Firebase Project: ${PROJECT_ID}`
  );

  console.log(
    `Total Products: ${shopLinks.length}`
  );
}

// =====================================================
// 7. RUN SCRIPT
// =====================================================

seedShopPaymentLinks()
  .then(() => {
    console.log("\nSetup completed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error(
      "\nERROR:",
      error.message
    );

    process.exitCode = 1;
  });
