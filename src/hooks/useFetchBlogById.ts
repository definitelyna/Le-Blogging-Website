import Blog from "../constants/blogInterface";
import { useState, useEffect } from "react";
import { getBlogById } from "../utils/getBlogById";

export function useFetchBlogById(blogId: string) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fetchedBlog = await getBlogById(blogId);
        setBlog(fetchedBlog);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to fetch blog");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  return { blog, loading, error };
}
