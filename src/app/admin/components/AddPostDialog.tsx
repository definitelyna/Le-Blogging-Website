"use client";

import {
  Autocomplete,
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
import { useContext, useEffect, useState } from "react";
import Blog from "@/src/constants/blogInterface";
import Author from "@/src/constants/authorInterface";
import blogInterface from "@/src/constants/blogInterface";
import { addBlogWithImage } from "@/src/utils/addBlog";
import AlertContext from "../context/AlertContext";
import { getAllAuthors } from "@/src/utils/getAllAuthor";
import { useRealtimeBlogs } from "@/src/hooks/useRealtimeBlogs";

interface AddPostDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AddPostDialog({ open, onClose }: AddPostDialogProps) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const { blogs } = useRealtimeBlogs();

  useEffect(() => {
    setCategories(new Set(blogs.map((blog) => blog.category)));

    const fetchAuthors = async () => {
      const authorsData = await getAllAuthors();
      setAuthors(authorsData);
    };

    fetchAuthors();
  }, [blogs]);

  const { setAlert } = useContext(AlertContext);
  const [postContent, setPostContent] = useState<Blog>({} as Blog);
  const [imageFile, setImageFile] = useState<File>();
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const newPostContent = { ...postContent, datePublished: new Date() };
    setPostContent(newPostContent);

    try {
      const result = await addBlogWithImage(newPostContent, imageFile);
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
    setPostContent({} as Blog);
    setImageFile(undefined);
    setImagePreview(null);
    setTagsInput("");
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
            value={postContent.author}
            defaultValue={
              { id: "", name: "", bio: "", profilePictureUrl: "" } as Author
            }
            onChange={(e) => {
              const author = authors.find(
                (author) => author.id === e.target.value
              );
              if (author) {
                setPostContent({ ...postContent, author });
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
            value={postContent?.category || ""}
            onInputChange={(event, newValue) => {
              setPostContent({ ...postContent, category: newValue });
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
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
