import { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "@/src/utils/firebase";
import Blog from "@/src/constants/blogInterface";

export function useRealtimeBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "blogs"),
      async (blogSnapshot) => {
        try {
          // Get authors for hydration
          const authorSnapshot = await getDocs(collection(db, "authors"));

          const blogs = blogSnapshot.docs.map((doc) => {
            const blogData = doc.data();
            const authorDoc = authorSnapshot.docs.find(
              (authorDoc) => authorDoc.id === blogData.author
            );

            return {
              ...blogData,
              id: doc.id,
              author: authorDoc?.data() || null,
              datePublished: blogData.datePublished?.toDate() || new Date(),
            } as Blog;
          });

          setBlogs(blogs);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch blogs");
          setLoading(false);
        }
      },
      (err) => {
        setError("Error listening to blogs");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { blogs, loading, error };
}
