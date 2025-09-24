import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function deleteAuthorById(authorId: string | undefined) {
  try {
    if (!authorId) throw new Error("Invalid author ID");
    const result = await deleteDoc(doc(db, "authors", authorId));
    return { success: true, result };
  } catch (error) {
    console.error("Error deleting author:", error);
    return { success: false, error: error };
  }
}
