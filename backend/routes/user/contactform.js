const express = require("express");
const nodemailer = require("nodemailer");
const Contact = require("../../models/contact");
require("dotenv").config();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const HIGHLEVEL_API_VERSION =
  process.env.HIGHLEVEL_API_VERSION || "2021-07-28";

const VALID_REASONS = [
  "Academy / Courses",
  "Community / Discord",
  "Technical Question",
  "Partnership",
  "Something Else",
];

const MAX_MESSAGE_LENGTH = 5000;

// Escape user input before inserting it into HTML emails
const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);

// Create or update the contact in HighLevel.
// Uses the upsert endpoint so an existing email does not fail.
async function syncToHighLevel(clean) {
  if (!process.env.HIGHLEVEL_API_TOKEN || !process.env.HIGHLEVEL_LOCATION_ID) {
    throw new Error("HighLevel is not configured.");
  }

  // Only send custom fields whose IDs are configured.
  const customFields = [];

  if (process.env.HIGHLEVEL_REASON_FIELD_ID) {
    customFields.push({
      id: process.env.HIGHLEVEL_REASON_FIELD_ID,
      field_value: clean.reason,
    });
  }

  if (process.env.HIGHLEVEL_MESSAGE_FIELD_ID) {
    customFields.push({
      id: process.env.HIGHLEVEL_MESSAGE_FIELD_ID,
      field_value: clean.message,
    });
  }

  const response = await fetch(
    "https://services.leadconnectorhq.com/contacts/upsert",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HIGHLEVEL_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        Version: HIGHLEVEL_API_VERSION,
      },
      body: JSON.stringify({
        locationId: process.env.HIGHLEVEL_LOCATION_ID,
        firstName: clean.firstname,
        lastName: clean.lastname,
        email: clean.email,
        source: "Website Contact Form",
        tags: ["Website Contact Form"],
        ...(customFields.length ? { customFields } : {}),
      }),
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
    // Log the real reason GHL rejected the request.
    console.error("HighLevel contact sync failed:", {
      status: response.status,
      response: data,
    });

    throw new Error(`HighLevel request failed (${response.status}).`);
  }

  return data.contact?.id || null;
}

router.post("/send-contact", async (req, res) => {
  try {
    const { firstname, lastname, email, reason, message } = req.body || {};

    // Validate required fields
    if (
      ![firstname, lastname, email, reason, message].every(
        (value) => typeof value === "string" && value.trim()
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const clean = {
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim().toLowerCase(),
      reason: reason.trim(),
      message: message.trim(),
    };

    if (clean.message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        success: false,
        message: "Your message is too long.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (!VALID_REASONS.includes(clean.reason)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid contact reason.",
      });
    }

    // 1. Save the inquiry. If this fails, the request fails.
    const savedContact = await Contact.create(clean);

    // Escape submitted content before rendering HTML
    const first = escapeHtml(clean.firstname);
    const last = escapeHtml(clean.lastname);
    const safeEmail = escapeHtml(clean.email);
    const safeReason = escapeHtml(clean.reason);
    const safeMessage = escapeHtml(clean.message).replace(/\r?\n/g, "<br>");

    const htmlToOwner = `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${first} ${last}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Reason:</strong> ${safeReason}</p>
        <p><strong>Message:</strong></p>
        <div style="background:#f4f4f9;padding:15px">
          ${safeMessage}
        </div>
      </div>
    `;

    const htmlToSender = `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>Thanks for reaching out, ${first}!</h2>
        <p>
          I've received your message and will get back to you
          as soon as possible.
        </p>
        <p><strong>Reason:</strong> ${safeReason}</p>
        <div style="background:#f4f4f9;padding:15px">
          ${safeMessage}
        </div>
        <p>Cheers,<br>Chris</p>
        <p style="color:#999;font-size:12px">
          This is an automated confirmation.
        </p>
      </div>
    `;

    // 2. CRM sync and both emails are best effort. One failing must
    //    not stop the others, and must not hide a saved inquiry.
    const [crm, ownerMail, senderMail] = await Promise.allSettled([
      syncToHighLevel(clean),
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: clean.email,
        subject: `New Contact: ${clean.firstname} ${clean.lastname}`,
        html: htmlToOwner,
      }),
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: clean.email,
        subject: "Thanks for contacting me!",
        html: htmlToSender,
      }),
    ]);

    if (ownerMail.status === "rejected") {
      console.error("Owner email failed:", ownerMail.reason?.message);
    }

    if (senderMail.status === "rejected") {
      console.error("Confirmation email failed:", senderMail.reason?.message);
    }

    return res.status(201).json({
      success: true,
      message: "Contact submitted successfully.",
      submissionId: savedContact._id,
      crmSynced: crm.status === "fulfilled",
      highLevelContactId: crm.status === "fulfilled" ? crm.value : null,
    });
  } catch (error) {
    console.error("Contact submission error:", error.message);

    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your submission.",
    });
  }
});

module.exports = router;