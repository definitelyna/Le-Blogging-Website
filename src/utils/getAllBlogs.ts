import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Blog from "../constants/blogInterface";

export async function getAllBlogs() {
  try {
    // Implementation to fetch all blogs from the database
    const blogSnapshot = await getDocs(collection(db, "blogs"));

    //Hydrate blogs with authors info
    const authorSnapshot = await getDocs(collection(db, "authors"));

    const blogs = blogSnapshot.docs.map((doc) => {
      const blogData = doc.data();
      const authorDoc = authorSnapshot.docs.find(
        (authorDoc) => authorDoc.id === blogData.author
      );

      const newDoc = {
        ...blogData,
        id: doc.id,
        author: authorDoc?.data() || null,
        // Convert Firestore Timestamp to JavaScript Date
        datePublished: blogData.datePublished?.toDate() || new Date(),
      };

      return newDoc as Blog;
    });

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}
