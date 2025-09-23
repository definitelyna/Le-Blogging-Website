import Blog from "../constants/blogInterface";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Upload image and return download URL
export async function uploadImage(file: File, folder: string): Promise<string> {
  const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

// Add blog with image upload
export async function addBlogWithImage(
  blog: Omit<Blog, "id" | "imageUrl">,
  file: File | undefined
) {
  if (!file) {
    return { success: false, message: "No image provided" };
  }

  const imageUrl = await uploadImage(file, "blogs");

  const docRef = await addDoc(collection(db, "blogs"), {
    ...blog,
    imageUrl,
    author: blog.author.id,
    datePublished: Timestamp.fromDate(blog.datePublished),
  });

  return {
    success: true,
    message: "Blog added successfully",
    blog: {
      id: docRef.id,
      ...blog,
      imageUrl,
    },
  };
}
