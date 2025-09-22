"use client";

import { useEffect, useState } from "react";
import Blog from "@/src/constants/blogInterface";
import { Box, Chip } from "@mui/material";
import BlogCard from "@/src/components/BlogCard";
import Link from "next/link";

const blogs: Blog[] = [
  {
    id: "1",
    author: {
      id: "1",
      name: "Collin Camerer",
      bio: "Collin Camerer is a seasoned entrepreneur with over 15 years of experience in the tech industry. He has founded multiple successful startups and is passionate about fostering innovation and supporting emerging entrepreneurs.",
      profilePictureUrl:
        "https://caltech-prod.s3.amazonaws.com/main/images/CollinCamerer-ShortSelling-0.2e16d0ba.fill-1600x810-c100.jpg",
    },
    title: "The Rise of Vietnamese Entrepreneurs in the Global Market",
    datePublished: new Date("2023-10-01"),
    description:
      "Explore how Vietnamese entrepreneurs are making waves in the global market with innovative startups and business ventures.",
    category: "Entrepreneurship",
    tags: ["Vietnam", "Entrepreneurship", "Global Market"],
    imageUrl:
      "https://caltech-prod.s3.amazonaws.com/main/images/CollinCamerer-ShortSelling-0.2e16d0ba.fill-1600x810-c100.jpg",
    content: "Full content of the blog post goes here...",
  },
  {
    id: "2",
    author: {
      id: "2",
      name: "Linh Tran",
      bio: "Linh Tran is a cultural anthropologist and writer who has spent over a decade studying Vietnamese culture and traditions. She has published numerous articles and books on the subject and is dedicated to promoting cultural understanding.",
      profilePictureUrl:
        "https://special.vietnamplus.vn/wp-content/uploads/2025/02/vna_potal_lang_lua_van_phuc_-_net_dep_van_hoa_truyen_thong_viet_nam_140239236_4099112-1620x1080.jpg",
    },
    title: "Cultural Festivals Celebrating Vietnamese Heritage Worldwide",
    datePublished: new Date("2023-09-15"),
    description:
      "A look at various cultural festivals around the world that celebrate Vietnamese heritage and traditions.",
    category: "Culture",
    tags: ["Vietnam", "Culture", "Festivals"],
    imageUrl:
      "https://special.vietnamplus.vn/wp-content/uploads/2025/02/vna_potal_lang_lua_van_phuc_-_net_dep_van_hoa_truyen_thong_viet_nam_140239236_4099112-1620x1080.jpg",
    content: "Full content of the blog post goes here...",
  },
  {
    id: "3",
    author: {
      id: "3",
      name: "Minh Nguyen",
      bio: "Minh Nguyen is a food critic and writer with a deep appreciation for Vietnamese cuisine. He has traveled extensively throughout Vietnam, exploring its diverse culinary landscape and sharing his experiences through his writing.",
      profilePictureUrl:
        "https://www.recipetineats.com/tachyon/2019/04/Beef-Pho_6.jpg",
    },
    title: "Vietnamese Cuisine: A Culinary Journey Across Continents",
    datePublished: new Date("2023-08-30"),
    description:
      "An exploration of Vietnamese cuisine and its influence across different continents.",
    category: "Food",
    tags: ["Vietnam", "Cuisine", "Food"],
    imageUrl: "https://www.recipetineats.com/tachyon/2019/04/Beef-Pho_6.jpg",
    content: "Full content of the blog post goes here...",
  },
];

interface BlogSectionProps {
  displayBlogs?: Blog[];
  setDisplayBlogs?: (blogs: Blog[]) => void;
}

export default function BlogSection({
  displayBlogs,
  setDisplayBlogs,
}: BlogSectionProps) {
  const [categories, setCategories] = useState<string[] | undefined>(undefined);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const newCategories: string[] = Array.from(
      new Set(blogs.map((blog) => blog.category))
    );

    newCategories.unshift("All");

    setCategories(newCategories);
  }, [displayBlogs]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setDisplayBlogs
      ? setDisplayBlogs(
          category === "All"
            ? blogs
            : blogs.filter((blog) => blog.category === category)
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
