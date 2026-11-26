const express = require("express");
const Contact = require("../../models/contact");
require("dotenv").config();

const router = express.Router();

const HIGHLEVEL_CONTACT_WEBHOOK_URL =
  process.env.HIGHLEVEL_CONTACT_WEBHOOK_URL;

const VALID_REASONS = [
  "Academy / Courses",
  "Community / Discord",
  "Technical Question",
  "Partnership",
  "Something Else",
];

const MAX_MESSAGE_LENGTH = 5000;

// ======================================================
// SEND CONTACT SUBMISSION TO GHL WEBHOOK
// ======================================================

async function sendToHighLevel(contact) {
  if (!HIGHLEVEL_CONTACT_WEBHOOK_URL) {
    throw new Error(
      "HIGHLEVEL_CONTACT_WEBHOOK_URL is not configured."
    );
  }

  const payload = {
    contactId: contact._id.toString(),
    firstname: contact.firstname,
    lastname: contact.lastname,
    email: contact.email,
    reason: contact.reason,
    message: contact.message,
    source: "PacketPros Website",
    submittedAt: new Date().toISOString(),
  };

  const response = await fetch(
    HIGHLEVEL_CONTACT_WEBHOOK_URL,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(payload),

      signal: AbortSignal.timeout(15000),
    }
  );

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { rawResponse: text };
  }

  if (!response.ok) {
    console.error("[CONTACT WEBHOOK FAILED]", {
      status: response.status,
    });

    throw new Error(
      `HighLevel webhook failed (${response.status}).`
    );
  }

  console.log("[CONTACT WEBHOOK SUCCESS]", {
    submissionId: contact._id.toString(),
    status: response.status,
  });

  return data;
}

// ======================================================
// CONTACT FORM ENDPOINT
// POST /api/send-contact
// ======================================================

router.post("/send-contact", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      reason,
      message,
    } = req.body || {};

    // ==================================================
    // VALIDATE REQUIRED FIELDS
    // ==================================================

    if (
      ![
        firstname,
        lastname,
        email,
        reason,
        message,
      ].every(
        (value) =>
          typeof value === "string" && value.trim()
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ==================================================
    // NORMALIZE FORM DATA
    // ==================================================

    const clean = {
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim().toLowerCase(),
      reason: reason.trim(),
      message: message.trim(),
    };

    // ==================================================
    // VALIDATE FIELD LENGTHS
    // ==================================================

    if (
      clean.firstname.length > 100 ||
      clean.lastname.length > 100 ||
      clean.email.length > 254
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more fields are too long.",
      });
    }

    if (clean.message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        success: false,
        message: "Your message is too long.",
      });
    }

    // ==================================================
    // VALIDATE EMAIL ADDRESS
    // ==================================================

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // ==================================================
    // VALIDATE CONTACT REASON
    // ==================================================

    if (!VALID_REASONS.includes(clean.reason)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid contact reason.",
      });
    }

    // ==================================================
    // STEP 1: SAVE CONTACT TO MONGODB
    // ==================================================

    const savedContact = await Contact.create(clean);

    console.log("[CONTACT SAVED]", {
      submissionId: savedContact._id.toString(),
    });

    // ==================================================
    // STEP 2: TRIGGER GHL WORKFLOW
    // ==================================================

    let webhookTriggered = false;

    try {
      await sendToHighLevel(savedContact);

      webhookTriggered = true;

    } catch (webhookError) {
      console.error("[GHL CONTACT ERROR]", {
        submissionId: savedContact._id.toString(),
        message: webhookError.message,
      });

      // The contact submission remains saved in MongoDB
      // even if the GHL webhook fails.
    }

    // ==================================================
    // STEP 3: RETURN RESPONSE TO FRONTEND
    // ==================================================

    return res.status(201).json({
      success: true,
      message: "Contact submitted successfully.",
      submissionId: savedContact._id,
      webhookTriggered,
    });

  } catch (error) {
    console.error(
      "[CONTACT SUBMISSION ERROR]",
      error.message
    );

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid contact form submission.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "An error occurred while processing your submission.",
    });
  }
});

module.exports = router;