"use client";

import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Blog from "@/src/constants/blogInterface";

interface SearchBarProps {
  sx?: object;
  displayBlogs?: Blog[];
  setDisplayBlogs?: (blogs: Blog[]) => void;
}

export default function SearchBar({
  sx,
  displayBlogs,
  setDisplayBlogs,
}: SearchBarProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <TextField
      placeholder="Search stories, authors, or topics..."
      onChange={handleSearch}
      InputProps={{
        startAdornment: <SearchIcon sx={{ color: "text.secondary", mr: 2 }} />,
      }}
      sx={{ bgcolor: "#F3F3F5", borderRadius: 1, ...sx, pb: 1.3 }}
    />
  );
}
