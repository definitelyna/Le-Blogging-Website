"use client";

import { Box, Button, CardMedia, Chip, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Blog from "@/src/constants/blogInterface";
import { getBlogById } from "@/src/utils/getBlogById";
import { useEffect, useState } from "react";

interface PostSectionProps {
  id: string;
}

export default function PostSection({ id }: PostSectionProps) {
  const [blogPost, setBlogPost] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getBlogById(id);
      setBlogPost(post);
    };

    fetchPost();
  }, [id]);

  if (!blogPost) {
    return <div>Blog Post Not Found</div>;
  }

  return (
    <Box>
      <Box
        sx={{
          position: "sticky",
          display: "flex",
          alignItems: "center",
          top: 60,
          bgcolor: "background.default",
          zIndex: 1,
          boxShadow: 1,
          py: 2,
          px: 5,
        }}
      >
        <Button variant="text" sx={{ textTransform: "none" }}>
          <Link
            href="/blog"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowBackIcon sx={{ color: "#000000", mr: 1 }} />
            <Typography variant="body1" fontWeight={400} color="#000000">
              Back to Blog
            </Typography>
          </Link>
        </Button>
      </Box>

      <Box
        sx={{
          px: { xs: 2, sm: 5, md: 20, lg: 25, xl: 30 },
          py: 5,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Chip
          label={blogPost.category}
          sx={{ width: "fit-content", fontWeight: 500 }}
        />
        <Typography variant="h3">{blogPost.title}</Typography>
        <Typography variant="h6" color="text.secondary" fontWeight={400}>
          {blogPost.description}
        </Typography>
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <PersonOutlinedIcon
              sx={{ color: "text.secondary", fontSize: 20 }}
            />
            <Typography
              variant="body2"
              component="span"
              color="text.secondary"
              fontWeight={400}
            >
              {blogPost.author.name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <CalendarTodayOutlinedIcon
              sx={{ color: "text.secondary", fontSize: 20 }}
            />
            <Typography
              variant="body2"
              component="span"
              color="text.secondary"
              fontWeight={400}
            >
              {blogPost.datePublished.toDateString()}
            </Typography>
          </Box>
        </Box>

        <CardMedia
          component="img"
          sx={{ borderRadius: 2, maxHeight: 600, objectFit: "cover" }}
          image={blogPost.imageUrl}
          alt={blogPost.title}
        />

        <Typography
          variant="body1"
          color="text.primary"
          fontWeight={400}
          textAlign="justify"
          sx={{
            whiteSpace: "pre-line",
            borderBottom: 1,
            borderColor: "#C4C4C4",
            pb: 5,
          }}
        >
          {blogPost.content}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6" fontWeight={400}>
            Tags
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {blogPost.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{
                  border: "1px solid #C4C4C4",
                  borderRadius: 3,
                  bgcolor: "#ffffff",
                }}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
            border: "1px solid #C4C4C4",
            borderRadius: 2,
            p: 3,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
            }}
            image={blogPost.author?.profilePictureUrl}
            alt={blogPost.author?.name}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h6" fontWeight={400}>
              {blogPost.author?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={400}>
              {blogPost.author?.bio}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
