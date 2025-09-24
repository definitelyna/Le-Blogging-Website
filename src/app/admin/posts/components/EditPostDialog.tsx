"use client";

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Author from "@/src/constants/authorInterface";
import AlertContext from "../../context/AlertContext";
import { setAuthorById } from "@/src/utils/setAuthorById";
import Blog from "@/src/constants/blogInterface";
import { setBlogById } from "@/src/utils/setBlogById";
import { getAllAuthors } from "@/src/utils/getAllAuthor";
import { getAllBlogs } from "@/src/utils/getAllBlogs";

interface EditPostDialogProps {
  open: boolean;
  onClose: () => void;
  blog: Blog | null;
  allBlogs: Blog[];
}

export default function EditPostDialog({
  open,
  onClose,
  blog,
  allBlogs,
}: EditPostDialogProps) {
  const { setAlert } = useContext(AlertContext);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [blogInput, setBlogInput] = useState<Blog>({
    ...blog,
  } as Blog);
  const [tagsInput, setTagsInput] = useState<string>(
    blog?.tags ? blog.tags.join(", ") : ""
  );
  const [imageFile, setImageFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setCategories(new Set(allBlogs.map((blog) => blog.category)));

    const fetchAuthors = async () => {
      const authorsData = await getAllAuthors();
      setAuthors(authorsData);
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
    setBlogInput({ ...blogInput, tags: tagsArray } as Blog);
  }, [tagsInput]);

  useEffect(() => {
    if (blog) {
      setBlogInput({ ...blog });
      setImagePreview(blog.imageUrl);
    }
  }, [blog]);

  //tagsInput to display tags as comma separated in textfield
  //and convert to array of strings in blogInput
  //Without this, editing tags is very clunky since the space between tags will be removed

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const result = await setBlogById(blogInput, imageFile);
      console.log(result);
      setAlert(
        result.success
          ? ["success", "Blog updated successfully!"]
          : ["error", "Failed to update blog."]
      );
    } catch (error) {
      console.error("Error updating blog:", error);
      setAlert(["error", "Failed to update blog."]);
    }

    setIsSubmitting(false);
    setBlogInput({} as Blog);
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
            Title
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter post title"
            value={blogInput?.title}
            onChange={(e) =>
              setBlogInput({ ...blogInput, title: e.target.value })
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
            value={blogInput.author?.id || ""}
            onChange={(e) => {
              const author = authors.find(
                (author) => author.id === e.target.value
              );
              if (author) {
                setBlogInput({ ...blogInput, author });
              }
            }}
          >
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
          <Typography variant="body1" fontWeight={500}>
            Category
          </Typography>
          <Autocomplete
            freeSolo
            options={Array.from(categories)}
            value={blogInput?.category || ""}
            onInputChange={(event, newValue) => {
              setBlogInput({ ...blogInput, category: newValue });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                fullWidth
                placeholder="Enter or select category"
              />
            )}
          />
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
            value={blogInput?.description}
            onChange={(e) =>
              setBlogInput({ ...blogInput, description: e.target.value })
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
            value={blogInput?.content}
            onChange={(e) =>
              setBlogInput({ ...blogInput, content: e.target.value })
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
          {blogInput.tags && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {blogInput.tags.map((tag) => {
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
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
