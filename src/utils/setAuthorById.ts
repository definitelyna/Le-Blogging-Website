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
export async function setAuthorById(author: Author, file: File | undefined) {
  const profilePictureUrl = file
    ? await uploadImage(file, "authors")
    : author.profilePictureUrl;

  const docRef = await setDoc(doc(db, "authors", author.id), {
    ...author,
    profilePictureUrl,
  });

  return {
    success: true,
    message: "Author updated successfully",
    author: {
      ...author,
      profilePictureUrl: profilePictureUrl,
    },
  };
}
