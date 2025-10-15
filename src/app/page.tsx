import { Box, Button, Container, Typography } from "@mui/material";
import { theSeasons } from "../fonts/theSeason";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FeaturedStoriesSection from "./FeaturedStoriesSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          px: 10,
          py: 9,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          bgcolor: "#F9F9FA",
        }}
      >
        <Typography
          variant="h3"
          fontFamily={theSeasons.style.fontFamily}
          textAlign="center"
          color="primary.main"
        >
          Globally Vietnamese
        </Typography>
        <Typography variant="h2" fontWeight={400} textAlign="center">
          Stories That Connect Worlds
        </Typography>
        <Typography
          variant="h5"
          fontWeight={400}
          textAlign="center"
          lineHeight={1.6}
          color="text.secondary"
        >
          Exploring the Vietnamese experience across cultures, continents, and
          generations. Where tradition meets innovation, and heritage bridges
          communities worldwide.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 3 }}>
          <Link href="/blog" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#000000",
                color: "#ffffff",
              }}
            >
              <Typography textTransform="none">Explore Stories</Typography>
              <ArrowForwardIcon sx={{ ml: 1 }} />
            </Button>
          </Link>
        </Box>
      </Box>

      <Box sx={{ py: 9, px: 3, gap: 1, background: "background.default" }}>
        <Typography variant="h4" textAlign="center">
          Featured Stories
        </Typography>

        <Typography
          variant="h6"
          fontWeight={400}
          textAlign="center"
          color="text.secondary"
        >
          Discover the latest perspectives on Vietnamese culture,
          entrepreneurship, and global communities
        </Typography>

        <FeaturedStoriesSection />
      </Box>
    </>
  );
}
