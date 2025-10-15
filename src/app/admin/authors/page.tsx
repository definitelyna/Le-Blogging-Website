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
import SearchBar from "./components/SearchBar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Author from "@/src/constants/authorInterface";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddAuthorDialog from "./components/AddAuthorDialog";
import DeleteAuthorDialog from "./components/DeleteAuthorDialog";
import EditAuthorDialog from "./components/EditAuthorDialog";
import { useRealtimeAuthors } from "@/src/hooks/useRealtimeAuthors";
import { auth } from "@/src/utils/firebase";
import { useRouter } from "next/navigation";

export default function AuthorTableSection() {
  const router = useRouter();

  useEffect(() => {
    console.log("Current user:", auth.currentUser);
    if (!auth.currentUser) {
      router.push("/admin");
    }
  }, []);

  const [displayAuthors, setDisplayAuthors] = useState<Author[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { authors } = useRealtimeAuthors();

  useEffect(() => {
    setDisplayAuthors(authors);
  }, [authors]);

  const handleAddAuthorClick = () => {
    setOpenDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDeleteAuthorClick = (author: Author) => {
    setSelectedAuthor(author);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleEditAuthorClick = (author: Author) => {
    setSelectedAuthor(author);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

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
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body1">Manage Authors</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: { xs: "100%", md: 400 },
          }}
        >
          <Button
            variant="text"
            size="large"
            onClick={handleAddAuthorClick}
            sx={{
              color: "#000000",
            }}
          >
            <AddIcon />
          </Button>
          <AddAuthorDialog open={openDialog} onClose={handleAddDialogClose} />
          <SearchBar
            allAuthors={authors}
            setDisplayAuthors={setDisplayAuthors}
            sx={{ minWidth: 200, flexGrow: 1 }}
          />
        </Box>
      </Box>

      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Table
          sx={{
            border: "1px solid #EDEEF2",
            borderRadius: 10,
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
            {displayAuthors.map((author) => (
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
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={author.profilePictureUrl}
                    sx={{
                      height: 50,
                      width: 50,
                      objectFit: "cover",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  />
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
                  <Button
                    variant="text"
                    sx={{ color: "#000000" }}
                    onClick={() => handleEditAuthorClick(author)}
                  >
                    <EditOutlinedIcon />
                  </Button>
                  <Button
                    variant="text"
                    sx={{ color: "#FF0000" }}
                    onClick={() => handleDeleteAuthorClick(author)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <DeleteAuthorDialog
        open={deleteDialogOpen}
        author={selectedAuthor}
        onClose={handleDeleteDialogClose}
      />
      <EditAuthorDialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        author={selectedAuthor}
      />
    </SimpleCard>
  );
}
