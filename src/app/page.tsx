import { Box, Button, Container, Typography } from "@mui/material";
import { theSeasons } from "../fonts/theSeason";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BlogCard from "../components/BlogCard";

const blogs = [
  {
    id: "1",
    author: "Collin Camerer",
    title: "The Rise of Vietnamese Entrepreneurs in the Global Market",
    datePublished: new Date("2023-10-01"),
    description:
      "Explore how Vietnamese entrepreneurs are making waves in the global market with innovative startups and business ventures.",
    category: "Entrepreneurship",
    tags: ["Vietnam", "Entrepreneurship", "Global Market"],
    imageUrl:
      "https://caltech-prod.s3.amazonaws.com/main/images/CollinCamerer-ShortSelling-0.2e16d0ba.fill-1600x810-c100.jpg",
    content: "Full content of the blog post goes here...",
  },
  {
    id: "2",
    author: "Linh Tran",
    title: "Cultural Festivals Celebrating Vietnamese Heritage Worldwide",
    datePublished: new Date("2023-09-15"),
    description:
      "A look at various cultural festivals around the world that celebrate Vietnamese heritage and traditions.",
    category: "Culture",
    tags: ["Vietnam", "Culture", "Festivals"],
    imageUrl:
      "https://special.vietnamplus.vn/wp-content/uploads/2025/02/vna_potal_lang_lua_van_phuc_-_net_dep_van_hoa_truyen_thong_viet_nam_140239236_4099112-1620x1080.jpg",
    content: "Full content of the blog post goes here...",
  },
  {
    id: "3",
    author: "Minh Nguyen",
    title: "Vietnamese Cuisine: A Culinary Journey Across Continents",
    datePublished: new Date("2023-08-30"),
    description:
      "An exploration of Vietnamese cuisine and its influence across different continents.",
    category: "Food",
    tags: ["Vietnam", "Cuisine", "Food"],
    imageUrl: "https://www.recipetineats.com/tachyon/2019/04/Beef-Pho_6.jpg",
    content: "Full content of the blog post goes here...",
  },
];

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
          bgcolor: "primary.secondary",
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
          <Button
            variant="outlined"
            sx={{ color: "#000000", borderColor: "text.secondary" }}
          >
            <Typography textTransform="none">About Our Mission</Typography>
          </Button>
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

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            mt: 5,
          }}
        >
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </Box>
      </Box>
    </>
  );
}
