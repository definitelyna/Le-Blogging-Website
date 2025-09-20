import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import BlogSection from "./BlogSection";
import Blog from "@/src/constants/blogInterface";
import ClientWrapper from "./ClientWrapper";

export default function BlogPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          py: 10,
          background: "linear-gradient(90deg, #EFF5FF 0%, #E0E6FF 100%)",
        }}
      >
        <Typography variant="h3" textAlign="center" fontWeight={400}>
          Our Stories
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          fontWeight={400}
          color="text.secondary"
        >
          Explore diverse perspectives from the global Vietnamese community
        </Typography>
        <ClientWrapper>
          <SearchBar sx={{ width: 500, height: 45, bgcolor: "#F3F3F5" }} />
        </ClientWrapper>
      </Box>

      <ClientWrapper>
        <BlogSection />
      </ClientWrapper>
    </>
  );
}
