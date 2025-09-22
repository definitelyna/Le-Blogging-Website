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
import Blog from "@/src/constants/blogInterface";
import Author from "@/src/constants/authorInterface";

const blogs: Blog[] = [
  {
    id: "1",
    author: {
      id: "1",
      name: "Collin Camerer",
      bio: "Collin Camerer is a seasoned entrepreneur with over 15 years of experience in the tech industry. He has founded multiple successful startups and is passionate about fostering innovation and supporting emerging entrepreneurs.",
      profilePictureUrl:
        "https://caltech-prod.s3.amazonaws.com/main/images/CollinCamerer-ShortSelling-0.2e16d0ba.fill-1600x810-c100.jpg",
    },
    title: "The Rise of Vietnamese Entrepreneurs in the Global Market",
    datePublished: new Date("2023-10-01"),
    description:
      "Explore how Vietnamese entrepreneurs are making waves in the global market with innovative startups and business ventures.",
    category: "Entrepreneurship",
    tags: ["Vietnam", "Entrepreneurship", "Global Market"],
    imageUrl:
      "https://caltech-prod.s3.amazonaws.com/main/images/CollinCamerer-ShortSelling-0.2e16d0ba.fill-1600x810-c100.jpg",
    content: "Full content of the blog post goes here...",
  },
  {
    id: "2",
    author: {
      id: "2",
      name: "Linh Tran",
      bio: "Linh Tran is a cultural anthropologist and writer who has spent over a decade studying Vietnamese culture and traditions. She has published numerous articles and books on the subject and is dedicated to promoting cultural understanding.",
      profilePictureUrl:
        "https://special.vietnamplus.vn/wp-content/uploads/2025/02/vna_potal_lang_lua_van_phuc_-_net_dep_van_hoa_truyen_thong_viet_nam_140239236_4099112-1620x1080.jpg",
    },
    title: "Cultural Festivals Celebrating Vietnamese Heritage Worldwide",
    datePublished: new Date("2023-09-15"),
    description:
      "A look at various cultural festivals around the world that celebrate Vietnamese heritage and traditions.",
    category: "Culture",
    tags: ["Vietnam", "Culture", "Festivals"],
    imageUrl:
      "https://special.vietnamplus.vn/wp-content/uploads/2025/02/vna_potal_lang_lua_van_phuc_-_net_dep_van_hoa_truyen_thong_viet_nam_140239236_4099112-1620x1080.jpg",
    content: "Full content of the blog post goes here...",
  },
  {
    id: "3",
    author: {
      id: "3",
      name: "Minh Nguyen",
      bio: "Minh Nguyen is a food critic and writer with a deep appreciation for Vietnamese cuisine. He has traveled extensively throughout Vietnam, exploring its diverse culinary landscape and sharing his experiences through his writing.",
      profilePictureUrl:
        "https://www.recipetineats.com/tachyon/2019/04/Beef-Pho_6.jpg",
    },
    title: "Vietnamese Cuisine: A Culinary Journey Across Continents",
    datePublished: new Date("2023-08-30"),
    description:
      "An exploration of Vietnamese cuisine and its influence across different continents.",
    category: "Food",
    tags: ["Vietnam", "Cuisine", "Food"],
    imageUrl: "https://www.recipetineats.com/tachyon/2019/04/Beef-Pho_6.jpg",
    content: "Full content of the blog post goes here...",
  },
];

const authors: Author[] = [
  {
    id: "1",
    name: "Collin Camerer",
    bio: "Collin Camerer is a seasoned entrepreneur with over 15 years of experience in the tech industry. He has founded multiple successful startups and is passionate about fostering innovation and supporting emerging entrepreneurs.",
    profilePictureUrl:
      "https://caltech-prod.s3.amazonaws.com/main/images/CollinCamerer-ShortSelling-0.2e16d0ba.fill-1600x810-c100.jpg",
  },
  {
    id: "2",
    name: "Linh Tran",
    bio: "Linh Tran is a cultural anthropologist and writer who has spent over a decade studying Vietnamese culture and traditions. She has published numerous articles and books on the subject and is dedicated to promoting cultural understanding.",
    profilePictureUrl:
      "https://special.vietnamplus.vn/wp-content/uploads/2025/02/vna_potal_lang_lua_van_phuc_-_net_dep_van_hoa_truyen_thong_viet_nam_140239236_4099112-1620x1080.jpg",
  },
  {
    id: "3",
    name: "Minh Nguyen",
    bio: "Minh Nguyen is a food critic and writer with a deep appreciation for Vietnamese cuisine. He has traveled extensively throughout Vietnam, exploring its diverse culinary landscape and sharing his experiences through his writing.",
    profilePictureUrl:
      "https://www.recipetineats.com/tachyon/2019/04/Beef-Pho_6.jpg",
  },
];

const categories = new Set(blogs.map((blog) => blog.category));

interface AddPostDialogProps {
  open: boolean;
  onClose: () => void;
}
import blogInterface from "@/src/constants/blogInterface";

export default function AddPostDialog({ open, onClose }: AddPostDialogProps) {
  const [postContent, setPostContent] = useState<Blog>({} as Blog);
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
          <Select
            variant="outlined"
            fullWidth
            value={postContent?.category}
            onChange={(e) =>
              setPostContent({ ...postContent, category: e.target.value })
            }
          >
            {Array.from(categories).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
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
