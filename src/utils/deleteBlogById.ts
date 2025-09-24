import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function deleteBlogById(blogId: string | undefined) {
  try {
    if (!blogId) throw new Error("Invalid blog ID");
    const result = await deleteDoc(doc(db, "blogs", blogId));
    return { success: true, result };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, error: error };
  }
}
