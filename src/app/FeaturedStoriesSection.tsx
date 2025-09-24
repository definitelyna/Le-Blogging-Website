"use client";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Blog from "../constants/blogInterface";
import BlogCard from "../components/BlogCard";
import { useRealtimeBlogs } from "../hooks/useRealtimeBlogs";

export default function FeaturedStoriesSection() {
  const { blogs } = useRealtimeBlogs();
  const [displayedBlogs, setDisplayedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const latestPosts = blogs
      .sort((a, b) => b.datePublished.getTime() - a.datePublished.getTime())
      .slice(0, 3);

    if (latestPosts) {
      setDisplayedBlogs(latestPosts);
    } else {
      console.error("No data found");
    }
  }, [blogs]);

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
      {displayedBlogs.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
    </Box>
  );
}
