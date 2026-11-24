
import { useCallback, useEffect, useState } from "react";

export type HighLevelAuthor = {
  _id?: string;
  id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
};

export type HighLevelCategory =
  | string
  | {
      _id?: string;
      id?: string;
      name?: string;
      label?: string;
      urlSlug?: string;
    };

export type HighLevelTag =
  | string
  | {
      _id?: string;
      id?: string;
      name?: string;
      label?: string;
    };

export type Blog = {
  _id?: string;
  id?: string;
  title: string;
  urlSlug?: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  imageAltText?: string;
  rawHTML?: string;
  content?: string;
  body?: string;
  author?: HighLevelAuthor | string;
  updatedBy?: string;
  categories?: HighLevelCategory[];
  tags?: HighLevelTag[];
  status?: string;
  publishedAt?: string;
  scheduledAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type BlogsResponse = {
  success?: boolean;
  blogs?: Blog[];
  posts?: Blog[];
  blogPosts?: Blog[];
  data?: {
    blogs?: Blog[];
    posts?: Blog[];
    blogPosts?: Blog[];
  };
  message?: string;
  details?: unknown;
  count?: number;
};

const API_URL = "/api/blogs?status=PUBLISHED";

function extractBlogs(data: BlogsResponse): Blog[] | null {
  const candidates = [
    data.blogs,
    data.posts,
    data.blogPosts,
    data.data?.blogs,
    data.data?.posts,
    data.data?.blogPosts,
  ];

  return candidates.find(Array.isArray) ?? null;
}

export default function useFetchBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          `Expected JSON from ${API_URL}. The request may be reaching the frontend instead of the backend.`
        );
      }

      const data: BlogsResponse = await response.json();

      if (!response.ok || data.success === false) {
        console.error("Blog API error:", data);

        throw new Error(
          data.message ||
            `Blog request failed with status ${response.status}.`
        );
      }

      const posts = extractBlogs(data);

      if (!posts) {
        console.error("Unexpected blog API response:", data);

        throw new Error(
          "The API response does not contain a recognized blog array."
        );
      }

      // Only show published posts if the API provides a status field.
      const publishedPosts = posts.filter(
        (post) =>
          !post.status ||
          post.status.toUpperCase() === "PUBLISHED"
      );

      console.log("HighLevel blogs loaded:", publishedPosts);

      setBlogs(publishedPosts);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);

      setBlogs([]);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load blog posts."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogs,
    isLoading,
    error,
    refetch: fetchBlogs,
  };
}