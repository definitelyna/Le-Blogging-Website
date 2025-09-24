import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import LoginCard from "./LoginCard";

export default function AdminPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <LoginCard />
    </Box>
  );
}
