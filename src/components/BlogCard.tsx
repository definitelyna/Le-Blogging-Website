import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import Blog from "../constants/blogInterface";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      key={blog.id}
      href={`/blog/${blog.id}`}
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          transition: "transform 0.2s, box-shadow 0.2s",
          borderRadius: 3,
          boxShadow: "none",
          "&:hover": {
            transform: "scale(1.01)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
          },
        }}
      >
        <Card sx={{ maxWidth: 370, minHeight: 550, position: "relative" }}>
          <CardMedia
            component="img"
            src={blog.imageUrl}
            alt="Blog Card Image"
            sx={{ width: "100%", height: 250, objectFit: "cover" }}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              px: 2,
              py: 3,
              gap: 2,
            }}
          >
            <Chip
              label={blog.category}
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                zIndex: 1,
                bgcolor: "background.default",
                fontWeight: 500,
                opacity: 0.9,
              }}
            />
            <Box>
              <Typography variant="body2" color="text.secondary">
                {blog.author?.name} &bull;{" "}
                {blog.datePublished.toLocaleDateString([], {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight={400}>
              {blog.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" flexGrow={1}>
              {blog.description}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {blog.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  sx={{
                    border: "1px solid",
                    borderColor: "text.secondary",
                    bgcolor: "background.default",
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
}
