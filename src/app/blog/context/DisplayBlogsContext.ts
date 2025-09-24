import Blog from "@/src/constants/blogInterface";
import { createContext } from "react";

const DisplayBlogsContext = createContext({
  displayBlogs: [] as Blog[] | undefined,
  setDisplayBlogs: (displayBlogs: Blog[] | undefined) => {},
  allBlogs: [] as Blog[] | undefined,
});

export default DisplayBlogsContext;
