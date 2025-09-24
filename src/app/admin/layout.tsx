import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import AlertContextProvider from "./context/AlertContextProvider";
import AddPostButton from "./components/AddPostButton";
import SimpleCard from "@/src/components/SimpleCard";
import Link from "next/link";

interface AdminPageProps {
  children: React.ReactNode;
}

export default function AdminPage({ children }: AdminPageProps) {
  return (
    <AlertContextProvider>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 200,
            background: "linear-gradient(#EEF5FE, #DFE6FF)",
            px: 5,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h4">Admin Dashboard</Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={400}>
              Manage your blog posts and content
            </Typography>
          </Box>

          <AddPostButton />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            flexGrow: 1,
            p: 5,
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            <Link
              href="/admin/posts"
              style={{ textDecoration: "none", minWidth: 275, flexGrow: 1 }}
            >
              <Box
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  borderRadius: 3,
                  boxShadow: "none",
                  "&:hover": {
                    transform: "scale(1.01)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                  },
                }}
              >
                <SimpleCard>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1">Total Posts</Typography>
                    <Chip
                      label="24"
                      sx={{
                        bgcolor: "#EDEEF2",
                        borderRadius: 2,
                        fontWeight: "bold",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography variant="h4" fontWeight={400}>
                      24
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Published articles
                    </Typography>
                  </Box>
                </SimpleCard>
              </Box>
            </Link>

            <SimpleCard cardSx={{ minWidth: 275, flexGrow: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1">Categories</Typography>
                <Chip
                  label="5"
                  sx={{
                    bgcolor: "#EDEEF2",
                    borderRadius: 2,
                    fontWeight: "bold",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h4" fontWeight={400}>
                  5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active categories
                </Typography>
              </Box>
            </SimpleCard>

            <Link
              href="/admin/authors"
              style={{ textDecoration: "none", minWidth: 275, flexGrow: 1 }}
            >
              <Box
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  borderRadius: 3,
                  boxShadow: "none",
                  "&:hover": {
                    transform: "scale(1.01)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                  },
                }}
              >
                <SimpleCard>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1">Authors</Typography>
                    <Chip
                      label="3"
                      sx={{
                        bgcolor: "#EDEEF2",
                        borderRadius: 2,
                        fontWeight: "bold",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography variant="h4" fontWeight={400}>
                      3
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Contributing writers
                    </Typography>
                  </Box>
                </SimpleCard>
              </Box>
            </Link>
          </Box>

          {children}
        </Box>
      </Box>
    </AlertContextProvider>
  );
}
