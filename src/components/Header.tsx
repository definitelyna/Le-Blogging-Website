import { Box, Typography } from "@mui/material";
import { theSeasons } from "../fonts/theSeason";
import Navigator from "./Navigator";

export default function Header() {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        bgcolor: "primary.main",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
        px: 3,
      }}
    >
      <Typography
        color="#ffffff"
        fontFamily={theSeasons.style.fontFamily}
        p={2}
        variant="h4"
      >
        GV
      </Typography>
      <Navigator />
    </Box>
  );
}
