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
          Stories of Small Businesses Weathering Policy Change
        </Typography>
        <Typography
          variant="h5"
          fontWeight={400}
          textAlign="center"
          lineHeight={1.6}
          color="text.secondary"
        >
          Exploring how Vietnam’s small businesses, families, and youth adapt to
          economic reforms, tax shifts, and global trade tensions — one real
          story at a time
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
          Featured Articles
        </Typography>

        <Typography
          variant="h6"
          fontWeight={400}
          textAlign="center"
          color="text.secondary"
        >
          Explore the latest insights on Vietnam’s changing economy — from local
          importers and tax reforms to trade wars and youth-led financial
          education
        </Typography>

        <FeaturedStoriesSection />
      </Box>
    </>
  );
}
