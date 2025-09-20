import { Box, Button, CardMedia, Chip, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

interface BlogPostPageProps {
  params: { slug: string };
}

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

const authors = [
  {
    name: "Collin Camerer",
    bio: "Collin Camerer is a seasoned entrepreneur with over 15 years of experience in the tech industry. He has founded multiple successful startups and is passionate about fostering innovation and supporting emerging entrepreneurs.",
    profilePictureUrl:
      "https://caltech-prod.s3.amazonaws.com/main/images/CollinCamerer-ShortSelling-0.2e16d0ba.fill-1600x810-c100.jpg",
  },
  {
    name: "Linh Tran",
    bio: "Linh Tran is a cultural anthropologist and writer who has spent over a decade studying Vietnamese culture and traditions. She has published numerous articles and books on the subject and is dedicated to promoting cultural understanding.",
    profilePictureUrl:
      "https://special.vietnamplus.vn/wp-content/uploads/2025/02/vna_potal_lang_lua_van_phuc_-_net_dep_van_hoa_truyen_thong_viet_nam_140239236_4099112-1620x1080.jpg",
  },
  {
    name: "Minh Nguyen",
    bio: "Minh Nguyen is a food critic and writer with a deep appreciation for Vietnamese cuisine. He has traveled extensively throughout Vietnam, exploring its diverse culinary landscape and sharing his experiences through his writing.",
    profilePictureUrl:
      "https://www.recipetineats.com/tachyon/2019/04/Beef-Pho_6.jpg",
  },
];

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = await params.slug;

  const blogPost = blogs.find((blog) => blog.id === slug);

  const thisAuthor = authors.find((author) => author.name === blogPost?.author);

  if (!blogPost) {
    return <div>Blog Post Not Found</div>;
  }

  return (
    <Box>
      <Box
        sx={{
          position: "sticky",
          display: "flex",
          alignItems: "center",
          top: 60,
          bgcolor: "background.default",
          zIndex: 1,
          boxShadow: 1,
          py: 2,
          px: 5,
        }}
      >
        <Button variant="text" sx={{ textTransform: "none" }}>
          <Link
            href="/blog"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowBackIcon sx={{ color: "#000000", mr: 1 }} />
            <Typography variant="body1" fontWeight={400} color="#000000">
              Back to Blog
            </Typography>
          </Link>
        </Button>
      </Box>

      <Box
        sx={{
          px: { xs: 2, sm: 5, md: 20, lg: 25, xl: 30 },
          py: 5,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Chip
          label={blogPost.category}
          sx={{ width: "fit-content", fontWeight: 500 }}
        />
        <Typography variant="h3">{blogPost.title}</Typography>
        <Typography variant="h6" color="text.secondary" fontWeight={400}>
          {blogPost.description}
        </Typography>
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <PersonOutlinedIcon
              sx={{ color: "text.secondary", fontSize: 20 }}
            />
            <Typography
              variant="body2"
              component="span"
              color="text.secondary"
              fontWeight={400}
            >
              {blogPost.author}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <CalendarTodayOutlinedIcon
              sx={{ color: "text.secondary", fontSize: 20 }}
            />
            <Typography
              variant="body2"
              component="span"
              color="text.secondary"
              fontWeight={400}
            >
              {blogPost.datePublished.toDateString()}
            </Typography>
          </Box>
        </Box>

        <CardMedia
          component="img"
          sx={{ borderRadius: 2, maxHeight: 600, objectFit: "cover" }}
          image={blogPost.imageUrl}
          alt={blogPost.title}
        />

        <Typography
          variant="body1"
          color="text.primary"
          fontWeight={400}
          textAlign="justify"
          sx={{
            whiteSpace: "pre-line",
            borderBottom: 1,
            borderColor: "#C4C4C4",
            pb: 5,
          }}
        >
          {blogPost.content}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6" fontWeight={400}>
            Tags
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {blogPost.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{
                  border: "1px solid #C4C4C4",
                  borderRadius: 3,
                  bgcolor: "#ffffff",
                }}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
            border: "1px solid #C4C4C4",
            borderRadius: 2,
            p: 3,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
            }}
            image={thisAuthor?.profilePictureUrl}
            alt={thisAuthor?.name}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h6" fontWeight={400}>
              {thisAuthor?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={400}>
              {thisAuthor?.bio}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
