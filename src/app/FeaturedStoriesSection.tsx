"use client";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Blog from "../constants/blogInterface";
import { getAllBlogs } from "../utils/getAllBlogs";
import BlogCard from "../components/BlogCard";

export default function FeaturedStoriesSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        if (data) {
          setBlogs(data);
        } else {
          console.error("No data found");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        justifyContent: "center",
        mt: 5,
      }}
    >
      {blogs.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
    </Box>
  );
}
