"use client";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddPostDialog from "./AddPostDialog";

export default function AddPostButton() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClick}
        sx={{
          p: 1,
          borderRadius: 2,
          textTransform: "none",
          pr: 2,
          bgcolor: "#000000",
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        New Post
      </Button>
      <AddPostDialog open={openDialog} onClose={handleDialogClose} />
    </>
  );
}
