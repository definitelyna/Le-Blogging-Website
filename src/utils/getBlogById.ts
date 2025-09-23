import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import Blog from "../constants/blogInterface";

export async function getBlogById(blogId: string) {
  const docSnap = await getDoc(doc(db, "blogs", blogId));

  const authorSnap = await getDoc(doc(db, "authors", docSnap.data()?.author));

  if (docSnap.exists() && authorSnap.exists()) {
    const blogData = docSnap.data();
    const authorData = authorSnap.data();

    return {
      id: docSnap.id,
      ...blogData,
      datePublished: blogData.datePublished?.toDate() || null,
      author: {
        id: authorSnap.id,
        ...authorData,
      },
    } as Blog;
  } else {
    console.log("No blog with id " + blogId);
    return null; // Blog not found
  }
}
