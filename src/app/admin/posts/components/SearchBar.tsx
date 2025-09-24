"use client";

import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Blog from "@/src/constants/blogInterface";
import { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  sx?: object;
  allBlogs?: Blog[] | undefined;
  setDisplayBlogs: Dispatch<SetStateAction<Blog[]>>;
}

export default function SearchBar({
  sx,
  allBlogs,
  setDisplayBlogs,
}: SearchBarProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();

    if (!query) {
      setDisplayBlogs ? setDisplayBlogs(allBlogs ? allBlogs : []) : null;
      return;
    }
    if (allBlogs) {
      console.log("Searching for:", query);
      const filteredBlogs = allBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.author.name.toLowerCase().includes(query) ||
          blog.category.toLowerCase().includes(query) ||
          blog.datePublished.toLocaleDateString().toLowerCase().includes(query)
      );

      console.log(filteredBlogs);
      setDisplayBlogs(filteredBlogs);
    }
  };

  return (
    <TextField
      placeholder="Search post by title, author, category, or date..."
      onChange={handleSearch}
      InputProps={{
        startAdornment: <SearchIcon sx={{ color: "text.secondary", mr: 2 }} />,
      }}
      sx={{
        bgcolor: "#F3F3F5",
        ...sx,
        
      }}
    />
  );
}
