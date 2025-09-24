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
import AlertContext from "../../context/AlertContext";
import { addAuthorWithImage } from "@/src/utils/addAuthor";

interface AddAuthorDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AddAuthorDialog({
  open,
  onClose,
}: AddAuthorDialogProps) {
  const { setAlert } = useContext(AlertContext);
  const [authorInput, setAuthorInput] = useState<Author>({} as Author);
  const [imageFile, setImageFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  //tagsInput to display tags as comma separated in textfield
  //and convert to array of strings in postContent
  //Without this, editing tags is very clunky since the space between tags will be removed

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const result = await addAuthorWithImage(authorInput, imageFile);
      console.log(result);
      setAlert(
        result.success
          ? ["success", "Blog added successfully!"]
          : ["error", "Failed to add blog."]
      );
    } catch (error) {
      console.error("Error adding blog:", error);
      setAlert(["error", "Failed to add blog."]);
    }

    setIsSubmitting(false);
    setAuthorInput({} as Author);
    setImageFile(undefined);
    setImagePreview(null);
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
        <Box>
          <Typography variant="body1" fontWeight={500}>
            Name
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter author name"
            value={authorInput?.name || ""}
            onChange={(e) =>
              setAuthorInput({ ...authorInput, name: e.target.value })
            }
          />
        </Box>

        <Box>
          <Typography variant="body1" fontWeight={500}>
            Bio
          </Typography>
          <TextareaAutosize
            style={{
              width: "100%",
              height: 100,
              fontFamily:
                "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              fontSize: 16,
            }}
            placeholder="Write your author bio here..."
            value={authorInput?.bio || ""}
            onChange={(e) =>
              setAuthorInput({ ...authorInput, bio: e.target.value })
            }
          />
        </Box>

        <Box>
          <Typography variant="body1" fontWeight={500}>
            Profile picture
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImagePreview(reader.result as string);
                  setImageFile(file);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          {imagePreview && (
            <Box sx={{ display: "flex", mt: 2, justifyContent: "center" }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}
        </Box>
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
