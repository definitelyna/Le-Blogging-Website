import Author from "../constants/authorInterface";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "./firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

// Upload image and return download URL
export async function uploadImage(file: File, folder: string): Promise<string> {
  const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

// Add author with image upload
export async function addAuthorWithImage(
  author: Omit<Author, "profilePictureUrl" | "id">,
  file: File | undefined
) {
  if (!file) {
    return { success: false, message: "No image provided" };
  }
  const profilePictureUrl = await uploadImage(file, "authors");

  const docRef = await addDoc(collection(db, "authors"), {
    ...author,
    profilePictureUrl,
  });

  return {
    success: true,
    message: "Author added successfully",
    blog: {
      id: docRef.id,
      ...author,
      profilePictureUrl,
    },
  };
}
