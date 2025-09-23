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
        const latestPosts = data
          .sort((a, b) => b.datePublished.getTime() - a.datePublished.getTime())
          .slice(0, 3);
        console.log("Latest posts:", latestPosts);
        if (latestPosts) {
          setBlogs(latestPosts);
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
