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
import AlertContext from "../../context/AlertContext";
import { deleteBlogById } from "@/src/utils/deleteBlogById";
import Blog from "@/src/constants/blogInterface";

interface DeletePostDialogProps {
  open: boolean;
  onClose: () => void;
  post: Blog | null;
}

export default function DeletePostDialog({
  open,
  onClose,
  post,
}: DeletePostDialogProps) {
  const { setAlert } = useContext(AlertContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const result = await deleteBlogById(post?.id);
      console.log(result);
      setAlert(
        result.success
          ? ["success", "post deleted successfully!"]
          : ["error", "Failed to delete post."]
      );
    } catch (error) {
      console.error("Error deleting post:", error);
      setAlert(["error", "Failed to delete post."]);
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ minWidth: { xs: "90vw", sm: 600 } }}
      fullWidth
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
        }}
      >
        <Typography variant="h6" fontWeight={500}>
          Are you sure you want to delete post "{post?.title}"?
        </Typography>
        <Typography variant="body1" fontWeight={400} color="text.secondary">
          Description: {post?.description}
        </Typography>
        <Typography variant="body1" fontWeight={500} color="error">
          This action cannot be undone.
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: "red", color: "#ffffff", textTransform: "none" }}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Deleting..." : "Delete"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
