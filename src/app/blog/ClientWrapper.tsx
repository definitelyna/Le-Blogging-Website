"use client";

import { useState, ReactNode, useEffect } from "react";
import Blog from "@/src/constants/blogInterface";
import { cloneElement } from "react";
import { useRealtimeBlogs } from "@/src/hooks/useRealtimeBlogs";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [displayBlogs, setDisplayBlogs] = useState<Blog[] | undefined>([]);
  const { blogs } = useRealtimeBlogs();

  useEffect(() => {
    if (blogs) {
      setDisplayBlogs(blogs);
    } else {
      setDisplayBlogs([]);
    }
  }, [blogs]);

  // Ensure children is always treated as an array
  const childrenArray = Array.isArray(children) ? children : [children];

  // Clone children and inject props
  return (
    <>
      {childrenArray.map((child, i) =>
        cloneElement(child, {
          allBlogs: blogs,
          displayBlogs,
          setDisplayBlogs,
          key: i,
        })
      )}
    </>
  );
}
