"use client";

import { useEffect, useState } from "react";
import Blog from "@/src/constants/blogInterface";
import { Box, Chip } from "@mui/material";
import BlogCard from "@/src/components/BlogCard";
import Link from "next/link";

interface BlogSectionProps {
  displayBlogs?: Blog[] | undefined;
  setDisplayBlogs?: (blogs: Blog[] | undefined) => void;
}

export default function BlogSection({
  displayBlogs,
  setDisplayBlogs,
}: BlogSectionProps) {
  const [categories, setCategories] = useState<string[] | undefined>(undefined);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const newCategories: string[] = Array.from(
      new Set(displayBlogs?.map((blog) => blog.category))
    );

    newCategories.unshift("All");

    setCategories(newCategories);
  }, [displayBlogs]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setDisplayBlogs
      ? setDisplayBlogs(
          category === "All"
            ? displayBlogs
            : displayBlogs?.filter((blog) => blog.category === category)
        )
      : null;
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 4, py: 4, px: 5 }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        {categories?.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={handleCategoryClick.bind(null, category)}
            sx={{
              cursor: "pointer",
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "#C4C4C4",
              fontWeight: 500,
              borderRadius: 2,
              ...(selectedCategory === category && {
                bgcolor: "#000000",
                color: "#ffffff",
              }),
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {displayBlogs?.length === 0
          ? "No blogs found"
          : displayBlogs?.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.id}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    transition: "transform 0.2s, box-shadow 0.2s",
                    borderRadius: 3,
                    boxShadow: "none",
                    "&:hover": {
                      transform: "scale(1.01)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                    },
                  }}
                >
                  <BlogCard blog={blog} />
                </Box>
              </Link>
            ))}
      </Box>
    </Box>
  );
}
