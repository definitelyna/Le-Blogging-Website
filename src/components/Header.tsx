import { Box, Typography } from "@mui/material";
import { theSeasons } from "../fonts/theSeason";
import Navigator from "./Navigator";

export default function Header() {
  return (
    <Box
      sx={{
        bgcolor: "#0f4d92",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
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
