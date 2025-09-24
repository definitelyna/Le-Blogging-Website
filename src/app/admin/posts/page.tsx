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
import TableSearchBar from "../components/TableSearchBar";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useEffect, useState } from "react";
import { getAllBlogs } from "@/src/utils/getAllBlogs";
import Blog from "@/src/constants/blogInterface";

// const blogs = [
//   {
//     id: "1",
//     author: "Collin Camerer",
//     title: "The Rise of Vietnamese Entrepreneurs in the Global Market",
//     datePublished: new Date("2023-10-01"),
//     description:
//       "Explore how Vietnamese entrepreneurs are making waves in the global market with innovative startups and business ventures.",
//     category: "Entrepreneurship",
//     tags: ["Vietnam", "Entrepreneurship", "Global Market"],
//     imageUrl:
//       "https://caltech-prod.s3.amazonaws.com/main/images/CollinCamerer-ShortSelling-0.2e16d0ba.fill-1600x810-c100.jpg",
//     content: "Full content of the blog post goes here...",
//   },
//   {
//     id: "2",
//     author: "Linh Tran",
//     title: "Cultural Festivals Celebrating Vietnamese Heritage Worldwide",
//     datePublished: new Date("2023-09-15"),
//     description:
//       "A look at various cultural festivals around the world that celebrate Vietnamese heritage and traditions.",
//     category: "Culture",
//     tags: ["Vietnam", "Culture", "Festivals"],
//     imageUrl:
//       "https://special.vietnamplus.vn/wp-content/uploads/2025/02/vna_potal_lang_lua_van_phuc_-_net_dep_van_hoa_truyen_thong_viet_nam_140239236_4099112-1620x1080.jpg",
//     content: "Full content of the blog post goes here...",
//   },
//   {
//     id: "3",
//     author: "Minh Nguyen",
//     title: "Vietnamese Cuisine: A Culinary Journey Across Continents",
//     datePublished: new Date("2023-08-30"),
//     description:
//       "An exploration of Vietnamese cuisine and its influence across different continents.",
//     category: "Food",
//     tags: ["Vietnam", "Cuisine", "Food"],
//     imageUrl: "https://www.recipetineats.com/tachyon/2019/04/Beef-Pho_6.jpg",
//     content: "Full content of the blog post goes here...",
//   },
// ];

export default function PostTableSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    async function fetchBlogs() {
      const allBlogs = await getAllBlogs();
      console.log(allBlogs);
      setBlogs(allBlogs);
    }

    fetchBlogs();
  }, []);

  return (
    <SimpleCard
      contentSx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">Manage Posts</Typography>
        <TableSearchBar />
      </Box>

      <Table sx={{ border: "1px solid #EDEEF2", borderRadius: 10 }}>
        <TableHead sx={{ border: "1px solid #EDEEF2", borderRadius: "50%" }}>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Published</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => (
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
              <TableCell>
                <Button variant="text" sx={{ color: "#000000" }}>
                  <VisibilityOutlinedIcon />
                </Button>
                <Button variant="text" sx={{ color: "#000000" }}>
                  <EditOutlinedIcon />
                </Button>
                <Button variant="text" sx={{ color: "#FF0000" }}>
                  <DeleteOutlineOutlinedIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SimpleCard>
  );
}
