'use client";';

import { TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

interface TableSearchBarProps {
  sx?: object;
}

export default function TableSearchBar({ sx }: TableSearchBarProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <TextField
      onChange={handleSearch}
      placeholder="Search posts..."
      InputProps={{
        startAdornment: <SearchIcon sx={{ color: "text.secondary", mr: 2 }} />,
      }}
      sx={{
        bgcolor: "#F3F3F5",
        borderRadius: 1,
        ...sx,
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
