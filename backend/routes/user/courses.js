
const express = require("express");
const router = express.Router();
const HIGHLEVEL_API = "https://services.leadconnectorhq.com";

const COURSES = [
  {
    id: "a3dc430d-234d-47e7-ba3d-781c8cae6560",
    title: "Beginner",
    level: "Beginner",
    productId: "a3dc430d-234d-47e7-ba3d-781c8cae6560",
    url: "https://app.gohighlevel.com/v2/location/CEmPERpihL9Qy3FoDjad/memberships/courses/course-creator-studio?view=manager&sub_view=outline&product_id=a3dc430d-234d-47e7-ba3d-781c8cae6560",
  },
  {
    id: "95697c98-ace9-4c2e-a14e-45d1547061df",
    title: "Advanced",
    level: "Advanced",
    productId: "95697c98-ace9-4c2e-a14e-45d1547061df",
    url: "https://app.gohighlevel.com/v2/location/CEmPERpihL9Qy3FoDjad/memberships/courses/course-creator-studio?view=manager&sub_view=outline&product_id=95697c98-ace9-4c2e-a14e-45d1547061df",
  },
];

router.get("/", async (req, res) => {
  try {
    const token = process.env.HIGHLEVEL_API_TOKEN;
    const locationId = process.env.HIGHLEVEL_LOCATION_ID;

    if (!token || !locationId) {
      console.error("Missing HighLevel environment variables", {
        hasToken: Boolean(token),
        hasLocationId: Boolean(locationId),
      });

      return res.status(500).json({
        error: "HighLevel API credentials are not configured.",
      });
    }

    const response = await fetch(
      `${HIGHLEVEL_API}/courses/products?locationId=${encodeURIComponent(locationId)}&limit=50`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          Version: "v3",
        },
      }
    );

    const responseText = await response.text();

    if (!response.ok) {
      console.error("HighLevel API error:", {
        status: response.status,
        body: responseText,
      });

      return res.status(502).json({
        error: "HighLevel rejected the courses request.",
        upstreamStatus: response.status,
      });
    }

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      console.error("HighLevel returned invalid JSON:", responseText);

      return res.status(502).json({
        error: "HighLevel returned an invalid response.",
      });
    }

    const products = Array.isArray(data.products)
      ? data.products
      : [];

    // Match the configured Beginner and Advanced product IDs.
    const courses = COURSES.map((configuredCourse) => {
      const product = products.find((item) => {
        const id = String(item.id || item._id || "");
        return id === configuredCourse.productId;
      });

      return {
        ...configuredCourse,
        ...(product || {}),
        id: configuredCourse.id,
        productId: configuredCourse.productId,
        title:
          product?.title ||
          product?.name ||
          configuredCourse.title,
        name:
          product?.name ||
          product?.title ||
          configuredCourse.title,
      };
    });

    return res.json({
      courses,
      total: courses.length,
    });
  } catch (error) {
    console.error("Courses route exception:", error);

    return res.status(500).json({
      error: "Unexpected error while fetching HighLevel courses.",
    });
  }
});

module.exports = router;