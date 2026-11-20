
import { useCallback, useEffect, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || ""
).replace(/\/$/, "");

const getCourseLevel = (course:any) => {
  // Use a level only if your HighLevel data actually provides one.
  return (
    course.level ||
    course.customFields?.level ||
    course.customizations?.level ||
    "Not specified"
  );
};

const normalizeCourse = (course:any) => ({
  ...course,
  id: course.id,
  title: course.title || "Untitled course",
  description: course.description || "",
  image: course.posterImage || "",
  level: getCourseLevel(course),
});

export default function useFetchCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/courses`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch courses (${response.status}).`
        );
      }

      const data = await response.json();

      const fetchedCourses = Array.isArray(data.courses)
        ? data.courses
        : [];

      setCourses(fetchedCourses.map(normalizeCourse));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load courses."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    isLoading,
    error,
    refetch: fetchCourses,
  };
}