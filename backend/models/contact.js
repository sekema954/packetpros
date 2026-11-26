const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    reason: {
      type: String,
      required: true,
      enum: [
        "Academy / Courses",
        "Community / Discord",
        "Technical Question",
        "Partnership",
        "Something Else",
      ],
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    webhookStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;