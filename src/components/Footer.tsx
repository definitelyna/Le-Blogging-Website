"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        bgcolor: "#000000",
        mt: "auto",
        p: 5,
        color: "#ffffff",
        textAlign: "left",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
          borderBottom: "1px solid",
          borderColor: "text.secondary",
          pb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            gap: 2,
            maxWidth: 500,
          }}
        >
          <Typography variant="h6">Globally Vietnamese</Typography>
          <Typography variant="body1" fontWeight={400}>
            Connecting Vietnamese voices and stories from around the world.
            Celebrating culture, heritage, and the diverse experiences of the
            global Vietnamese community.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "fit-content",
          }}
        >
          <Typography variant="h6">Quick Links</Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "flex-start",
            }}
          >
            <Button
              variant="text"
              sx={{
                color: "#ffffff",
                textTransform: "none",
                p: 0,
                width: "fit-content",
                ":hover": { color: "text.secondary", transition: "0.2s" },
              }}
              onClick={() => handleNavigate("/")}
            >
              <Typography variant="body1" fontWeight={400}>
                Home
              </Typography>

              {/* Without this box, the home is slightly indented for some reason */}
              <Box width={50}></Box>
            </Button>

            <Button
              variant="text"
              sx={{
                color: "#ffffff",
                textTransform: "none",
                p: 0,
                ":hover": { color: "text.secondary", transition: "0.2s" },
              }}
              onClick={() => handleNavigate("/blog")}
            >
              <Typography variant="body1" fontWeight={400}>
                All Stories
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            minWidth: 200,
          }}
        ></Box>
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary" textAlign={"center"}>
          &copy; {new Date().getFullYear()} Globally Vietnamese. All rights
          reserved.
        </Typography>
      </Box>
    </Box>
  );
}
