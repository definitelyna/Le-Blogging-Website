"use client";

import { useState, ReactNode } from "react";
import Blog from "@/src/constants/blogInterface";
import { cloneElement } from "react";

const blogs: Blog[] = [
  {
    id: "1",
    author: "Collin Camerer",
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
    author: "Linh Tran",
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
    author: "Minh Nguyen",
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

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [displayBlogs, setDisplayBlogs] = useState<Blog[] | undefined>(blogs);

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
