const express = require("express");
require("dotenv").config();

const router = express.Router();

const HIGHLEVEL_API = "https://services.leadconnectorhq.com";

// HighLevel credentials and IDs
const LOCATION_ID = process.env.HIGHLEVEL_LOCATION_ID;
const BLOG_ID = process.env.HIGHLEVEL_BLOG_ID;
const API_TOKEN = process.env.HIGHLEVEL_API_TOKEN;

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  Accept: "application/json",
  Version: "2021-07-28",
};

// The "Get Blog Post by ID" endpoint only accepts Version: v3.
// It is the endpoint that returns the article body (rawHTML).
const detailHeaders = {
  ...headers,
  Version: "v3",
};

// Validate environment configuration
function checkConfig(res) {
  if (!API_TOKEN || !LOCATION_ID || !BLOG_ID) {
    res.status(500).json({
      success: false,
      message: "Missing HighLevel environment variables.",
      required: [
        "HIGHLEVEL_API_TOKEN",
        "HIGHLEVEL_LOCATION_ID",
        "HIGHLEVEL_BLOG_ID",
      ],
    });
    return false;
  }

  return true;
}

// --------------------------------------------------
// GET /api/blogs
// Get all posts for the configured blog site.
//
// Examples:
// /api/blogs
// /api/blogs?limit=100
// /api/blogs?limit=100&offset=100
// /api/blogs?status=PUBLISHED
// --------------------------------------------------
router.get("/", async (req, res) => {
  if (!checkConfig(res)) return;

  try {
    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 20, 1),
      100
    );

    const offset = Math.max(
      parseInt(req.query.offset, 10) || 0,
      0
    );

    const params = new URLSearchParams({
      locationId: LOCATION_ID,
      blogId: BLOG_ID,
      limit: String(limit),
      offset: String(offset),
    });

    // Only apply a status filter when explicitly requested.
    if (req.query.status) {
      params.set("status", String(req.query.status));
    }

    const url = `${HIGHLEVEL_API}/blogs/posts/all?${params}`;

    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) {
      console.error("HighLevel list error:", data);

      return res.status(response.status).json({
        success: false,
        message: "Failed to retrieve blog posts.",
        details: data,
      });
    }

    // Accommodate possible response property names.
    const posts =
      data.blogs ??
      data.posts ??
      data.blogPosts ??
      [];

    return res.json({
      success: true,
      blogId: BLOG_ID,
      locationId: LOCATION_ID,
      count: data.count ?? posts.length,
      limit,
      offset,
      blogs: posts,
    });
  } catch (error) {
    console.error("HighLevel list exception:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while retrieving blog posts.",
    });
  }
});

// --------------------------------------------------
// GET /api/blogs/post/:postId
// Get ONE post by its actual HighLevel post ID,
// including its body (rawHTML).
//
// IMPORTANT:
// This route is deliberately different from /api/blogs.
// Never pass the word "blogs" as a post ID.
// --------------------------------------------------
router.get("/post/:postId", async (req, res) => {
  if (!checkConfig(res)) return;

  try {
    const { postId } = req.params;

    if (!postId || postId === "blogs") {
      return res.status(400).json({
        success: false,
        message:
          "A valid HighLevel post ID is required. Use GET /api/blogs to list posts.",
      });
    }

    const params = new URLSearchParams({
      locationId: LOCATION_ID,
    });

    const url =
      `${HIGHLEVEL_API}/blogs/posts/post/` +
      `${encodeURIComponent(postId)}?${params}`;

    // Uses Version: v3, which this endpoint requires.
    const response = await fetch(url, { headers: detailHeaders });
    const data = await response.json();

    if (!response.ok) {
      console.error("HighLevel post detail error:", data);

      return res.status(response.status).json({
        success: false,
        message: "Failed to retrieve this blog post.",
        details: data,
      });
    }

    const blog = data.blogPost ?? data.post ?? data.blog ?? data;
    console.log("HighLevel post detail fields:", Object.keys(blog));

    return res.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("HighLevel post detail exception:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while retrieving the blog post.",
    });
  }
});

// Configuration diagnostics (never log the API token)
console.log("HighLevel configuration:", {
  tokenLoaded: Boolean(API_TOKEN),
  locationId: LOCATION_ID || "MISSING",
  blogId: BLOG_ID || "MISSING",
});

module.exports = router;