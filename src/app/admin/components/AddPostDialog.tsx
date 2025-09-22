"use client";

import {
  Box,
  Button,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface AddPostDialogProps {
  open: boolean;
  onClose: () => void;
}
import blogInterface from "@/src/constants/blogInterface";

export default function AddPostDialog({ open, onClose }: AddPostDialogProps) {
  const [postContent, setPostContent] = useState<blogInterface>(
    {} as blogInterface
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  //tagsInput to display tags as comma separated in textfield
  //and convert to array of strings in postContent
  //Without this, editing tags is very clunky since the space between tags will be removed
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
    setPostContent({ ...postContent, tags: tagsArray } as blogInterface);
  }, [tagsInput]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = () => {
    //Last adjustment to data

    console.log(postContent);
    setIsSubmitting(true);
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
            Title
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter post title"
            value={postContent?.title}
            onChange={(e) =>
              setPostContent({ ...postContent, title: e.target.value })
            }
          />
        </Box>

        <Box>
          <Typography variant="body1" fontWeight={500}>
            Author
          </Typography>
          <Select
            variant="outlined"
            fullWidth
            value={postContent?.author}
            onChange={(e) =>
              setPostContent({ ...postContent, author: e.target.value })
            }
          >
            <MenuItem value="Author 1">Author 1</MenuItem>
            <MenuItem value="Author 2">Author 2</MenuItem>
            <MenuItem value="Author 3">Author 3</MenuItem>
          </Select>
        </Box>

        <Box>
          <Typography variant="body1" fontWeight={500}>
            Category
          </Typography>
          <Select
            variant="outlined"
            fullWidth
            value={postContent?.category}
            onChange={(e) =>
              setPostContent({ ...postContent, category: e.target.value })
            }
          >
            <MenuItem value="Category 1">Category 1</MenuItem>
            <MenuItem value="Category 2">Category 2</MenuItem>
            <MenuItem value="Category 3">Category 3</MenuItem>
          </Select>
        </Box>

        <Box>
          <Typography variant="body1" fontWeight={500}>
            Description
          </Typography>
          <TextareaAutosize
            style={{
              width: "100%",
              height: 100,
              fontFamily:
                "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              fontSize: 16,
            }}
            placeholder="Write your blog description here..."
            value={postContent?.description}
            onChange={(e) =>
              setPostContent({ ...postContent, description: e.target.value })
            }
          />
        </Box>

        <Box>
          <Typography variant="body1" fontWeight={500}>
            Content
          </Typography>
          <TextareaAutosize
            style={{
              width: "100%",
              height: 200,
              fontFamily:
                "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              fontSize: 16,
            }}
            placeholder="Write your post content here..."
            value={postContent?.content}
            onChange={(e) =>
              setPostContent({ ...postContent, content: e.target.value })
            }
          />
        </Box>

        <Box>
          <Typography variant="body1" fontWeight={500}>
            Tags (separate with commas)
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
          {postContent.tags && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {postContent.tags.map((tag) => {
                return tag != "" ? <Chip key={tag} label={tag} /> : null;
              })}
            </Box>
          )}
        </Box>

        <Box>
          <Typography variant="body1" fontWeight={500}>
            Image
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
                  setPostContent({
                    ...postContent,
                    imageUrl: reader.result as string,
                  });
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
                  maxWidth: "100%",
                  maxHeight: 200,
                  borderRadius: 8,
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
