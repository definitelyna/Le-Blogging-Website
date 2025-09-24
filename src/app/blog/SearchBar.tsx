"use client";

import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import DisplayBlogsContext from "./context/DisplayBlogsContext";

interface SearchBarProps {
  sx?: object;
}

export default function SearchBar({ sx }: SearchBarProps) {
  const { allBlogs, setDisplayBlogs } = useContext(DisplayBlogsContext);

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
          blog.category.toLowerCase().includes(query)
      );

      console.log(allBlogs)

      console.log(filteredBlogs);
      setDisplayBlogs(filteredBlogs);
    }
  };

  return (
    <TextField
      placeholder="Search stories, authors, or topics..."
      onChange={handleSearch}
      InputProps={{
        startAdornment: <SearchIcon sx={{ color: "text.secondary", mr: 2 }} />,
      }}
      sx={{
        bgcolor: "#F3F3F5",
        borderRadius: 1,
        ...sx,
        pb: 1.3,
        "& .MuiOutlinedInput-root": {
          border: "none",
          "& fieldset": {
            borderColor: "transparent",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#C4C4C4",
            height: "100%",
            transition: "0.2s",
          },

          "&:hover fieldset": {
            borderColor: "#C4C4C4",
            transition: "0.2s",
          },
        },
      }}
    />
  );
}
