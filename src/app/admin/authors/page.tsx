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
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Author from "@/src/constants/authorInterface";

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

export default function AuthorTableSection() {
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
