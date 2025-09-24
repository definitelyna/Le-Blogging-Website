import Author from "../constants/authorInterface";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import Blog from "../constants/blogInterface";

// Upload image and return download URL
export async function uploadImage(file: File, folder: string): Promise<string> {
  const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

// Add blog with image upload
export async function setBlogById(blog: Blog, file: File | undefined) {
  const imageUrl = file ? await uploadImage(file, "blogs") : blog.imageUrl;

  const docRef = await setDoc(doc(db, "blogs", blog.id), {
    ...blog,
    author: blog.author.id,
    imageUrl,
  });

  return {
    success: true,
    message: "Blog updated successfully",
    blog: {
      ...blog,
      imageUrl: imageUrl,
    },
  };
}
