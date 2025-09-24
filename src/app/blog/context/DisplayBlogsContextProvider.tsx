"use client";

import { useState, useEffect } from "react";
import SearchContext from "./DisplayBlogsContext";
import Blog from "@/src/constants/blogInterface";
import { useRealtimeBlogs } from "@/src/hooks/useRealtimeBlogs";
import DisplayBlogsContext from "./DisplayBlogsContext";

export default function DisplayBlogsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [displayBlogs, setDisplayBlogs] = useState<Blog[] | undefined>([]);
  const { blogs } = useRealtimeBlogs();

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const sortedBlogs = blogs.sort(
        (a, b) => b.datePublished.getTime() - a.datePublished.getTime()
      );
      setDisplayBlogs(sortedBlogs);
    } else {
      setDisplayBlogs([]);
    }
  }, [blogs]);

  return (
    <DisplayBlogsContext.Provider
      value={{ displayBlogs, setDisplayBlogs, allBlogs: blogs }}
    >
      {children}
    </DisplayBlogsContext.Provider>
  );
}
