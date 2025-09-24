import { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "@/src/utils/firebase";
import Blog from "@/src/constants/blogInterface";
import Author from "../constants/authorInterface";

export function useRealtimeAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "authors"),
      async (authorsnapshot) => {
        try {
          // Get authors for hydration
          const authorSnapshot = await getDocs(collection(db, "authors"));

          const authors = authorsnapshot.docs.map((doc) => {
            const author = doc.data();
            const authorDoc = authorSnapshot.docs.find(
              (authorDoc) => authorDoc.id === author.author
            );

            return {
              ...author,
              id: doc.id,
            } as Author;
          });

          setAuthors(authors);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch authors");
          setLoading(false);
        }
      },
      (err) => {
        setError("Error listening to authors");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { authors, loading, error };
}
