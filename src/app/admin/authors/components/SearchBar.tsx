"use client";

import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, SetStateAction } from "react";
import Author from "@/src/constants/authorInterface";

interface SearchBarProps {
  sx?: object;
  allAuthors?: Author[] | undefined;
  setDisplayAuthors: Dispatch<SetStateAction<Author[]>>;
}

export default function SearchBar({
  sx,
  allAuthors,
  setDisplayAuthors,
}: SearchBarProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();

    if (!query) {
      setDisplayAuthors
        ? setDisplayAuthors(allAuthors ? allAuthors : [])
        : null;
      return;
    }
    if (allAuthors) {
      console.log("Searching for:", query);
      const filteredAuthors = allAuthors.filter(
        (author) =>
          author.name.toLowerCase().includes(query) ||
          author.bio.toLowerCase().includes(query)
      );

      console.log(filteredAuthors);
      setDisplayAuthors(filteredAuthors);
    }
  };

  return (
    <TextField
      placeholder="Search author by name or bio..."
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
