"use client";

import SimpleCard from "@/src/components/SimpleCard";
import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SearchBar from "./components/SearchBar";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useEffect, useState } from "react";
import Blog from "@/src/constants/blogInterface";
import EditPostDialog from "./components/EditPostDialog";
import DeletePostDialog from "./components/DeletePostDialog";
import Link from "next/link";
import { useRealtimeBlogs } from "@/src/hooks/useRealtimeBlogs";

export default function PostTableSection() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setDeleteDialogOpen] = useState(false);
  const { blogs } = useRealtimeBlogs();
  const [displayBlogs, setDisplayBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setDisplayBlogs(blogs);
  }, [blogs]);

  const handleEditBlogClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setSelectedBlog(null);
  };

  const handleDeleteBlogClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedBlog(null);
  };

  return (
    <Box sx={{ p: { xs: 0, md: 3 } }}>
      <SimpleCard
        contentSx={{ p: 2, display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body1">Manage Posts</Typography>
          <SearchBar
            allBlogs={blogs}
            setDisplayBlogs={setDisplayBlogs}
            sx={{
              minWidth: 200,
              maxWidth: 400,
            }}
          />
        </Box>

        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Table
            sx={{
              border: "1px solid #EDEEF2",
              borderRadius: 10,
            }}
          >
            <TableHead
              sx={{
                border: "1px solid #EDEEF2",
                borderRadius: "50%",
              }}
            >
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Published</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayBlogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell sx={{ fontWeight: 500 }}>{blog.title}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PersonOutlineOutlinedIcon />
                      {blog.author?.name}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={blog.category}
                      sx={{
                        cursor: "pointer",
                        bgcolor: "background.default",
                        border: "1px solid",
                        borderColor: "#C4C4C4",
                        fontWeight: 500,
                        borderRadius: 2,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarTodayOutlinedIcon fontSize="medium" />
                      {blog.datePublished.toLocaleDateString()}
                    </Box>
                  </TableCell>

                  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    <Link
                      href={`/blog/${blog.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="text" sx={{ color: "#000000" }}>
                        <VisibilityOutlinedIcon />
                      </Button>
                    </Link>
                    <Button
                      variant="text"
                      sx={{ color: "#000000" }}
                      onClick={() => handleEditBlogClick(blog)}
                    >
                      <EditOutlinedIcon />
                    </Button>
                    <Button
                      variant="text"
                      sx={{ color: "#FF0000" }}
                      onClick={() => handleDeleteBlogClick(blog)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <EditPostDialog
          open={openEditDialog}
          onClose={handleEditDialogClose}
          blog={selectedBlog}
          allBlogs={blogs}
        />
        <DeletePostDialog
          open={openDeleteDialog}
          onClose={handleDeleteDialogClose}
          post={selectedBlog}
        />
      </SimpleCard>
    </Box>
  );
}
