"use client";

import { useState, ReactNode, useEffect } from "react";
import Blog from "@/src/constants/blogInterface";
import { cloneElement } from "react";
import { getAllBlogs } from "@/src/utils/getAllBlogs";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [displayBlogs, setDisplayBlogs] = useState<Blog[] | undefined>([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const newBlogs = await getAllBlogs();
      console.log(newBlogs);
      if (newBlogs) {
        setDisplayBlogs(newBlogs);
      } else {
        setDisplayBlogs([]);
      }
    };

    fetchAllBlogs();
  }, []);

  // Ensure children is always treated as an array
  const childrenArray = Array.isArray(children) ? children : [children];

  // Clone children and inject props
  return (
    <>
      {childrenArray.map((child, i) =>
        cloneElement(child, {
          displayBlogs,
          setDisplayBlogs,
          key: i,
        })
      )}
    </>
  );
}
