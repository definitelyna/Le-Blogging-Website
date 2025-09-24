import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getAuthorById(authorId: string) {
  const docRef = doc(db, "authors", authorId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No author with id " + authorId);
    return null; // Author not found
  }
}
