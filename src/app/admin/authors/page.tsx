"use client";

import SimpleCard from "@/src/components/SimpleCard";
import {
  Box,
  Button,
  CardMedia,
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
import Author from "@/src/constants/authorInterface";
import { useEffect, useState } from "react";
import { getAllAuthors } from "@/src/utils/getAllAuthor";

export default function AuthorTableSection() {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const authors = await getAllAuthors();
      setAuthors(authors);
      console.log("Fetched authors:", authors);
    };

    fetchAuthors();
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
        <Typography variant="body1">Manage Authors</Typography>
        <TableSearchBar />
      </Box>

      <Table
        sx={{
          border: "1px solid #EDEEF2",
          borderRadius: 10,
          overflow: "scroll",
        }}
      >
        <TableHead sx={{ border: "1px solid #EDEEF2", borderRadius: "50%" }}>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell>Bio</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Profile</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell sx={{ fontWeight: 500 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PersonOutlineOutlinedIcon />
                  {author.name}
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  maxWidth: 250,
                  whiteSpace: "nowrap",
                  overflowX: "auto",
                  scrollbarWidth: 0,
                }}
              >
                {author.bio}
              </TableCell>
              <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                <CardMedia
                  component="img"
                  image={author.profilePictureUrl}
                  sx={{
                    height: 50,
                    width: 50,
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
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
