import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";
import Author from "../constants/authorInterface";

export async function getAllAuthors() {
  // Implementation to fetch all authors from the database
  const authorSnapshot = await getDocs(collection(db, "authors"));

  const authors = authorSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return authors as Author[];
}
