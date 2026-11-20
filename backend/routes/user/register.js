const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      firebaseUid,
    } = req.body;

    if (!name || !email || !firebaseUid) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and Firebase UID are required",
      });
    }

    // Check that HighLevel environment variables exist
    console.log(
      "HighLevel token loaded:",
      !!process.env.HIGHLEVEL_API_TOKEN
    );

    console.log(
      "HighLevel location loaded:",
      !!process.env.HIGHLEVEL_LOCATION_ID
    );

    if (
      !process.env.HIGHLEVEL_API_TOKEN ||
      !process.env.HIGHLEVEL_LOCATION_ID
    ) {
      return res.status(500).json({
        success: false,
        message:
          "HighLevel environment variables are missing.",
      });
    }

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts.shift();
    const lastName = nameParts.join(" ");

    console.log("Creating HighLevel contact for:", email);

    const highLevelResponse = await fetch(
      "https://services.leadconnectorhq.com/contacts/",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.HIGHLEVEL_API_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          Version: "2023-02-21",
        },

        body: JSON.stringify({
          firstName,
          lastName,
          email: email.trim().toLowerCase(),
          locationId:
            process.env.HIGHLEVEL_LOCATION_ID,
          source: "Course Website Registration",
          tags: ["Registered User"],
        }),
      }
    );

    const highLevelData =
      await highLevelResponse.json();

    console.log(
      "HighLevel status:",
      highLevelResponse.status
    );

    console.log(
      "HighLevel response:",
      highLevelData
    );

    if (!highLevelResponse.ok) {
      return res.status(highLevelResponse.status).json({
        success: false,
        message: "HighLevel API error",
        highLevelError: highLevelData,
      });
    }

    console.log(
      "HighLevel registration contact created:",
      highLevelData.contact?.id
    );

    return res.status(200).json({
      success: true,
      contactId: highLevelData.contact?.id,
    });

  } catch (error) {
    console.error(
      "HighLevel registration error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "HighLevel registration failed",
      error: error.message,
    });
  }
});

module.exports = router;