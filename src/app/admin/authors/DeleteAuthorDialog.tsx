"use client";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Author from "@/src/constants/authorInterface";
import AlertContext from "../context/AlertContext";
import { deleteAuthorById } from "@/src/utils/deleteAuthorById";

interface DeleteAuthorDialogProps {
  open: boolean;
  onClose: () => void;
  author: Author | null;
}

export default function DeleteAuthorDialog({
  open,
  onClose,
  author,
}: DeleteAuthorDialogProps) {
  const { setAlert } = useContext(AlertContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const result = await deleteAuthorById(author?.id);
      console.log(result);
      setAlert(
        result.success
          ? ["success", "Author deleted successfully!"]
          : ["error", "Failed to delete author."]
      );
    } catch (error) {
      console.error("Error deleting author:", error);
      setAlert(["error", "Failed to delete author."]);
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
          minWidth: 500,
        }}
      >
        <Typography variant="h6" fontWeight={500}>
          Are you sure you want to delete author "{author?.name}"?
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          Bio: {author?.bio}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          This action cannot be undone.
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: "#000000", color: "#ffffff", textTransform: "none" }}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
