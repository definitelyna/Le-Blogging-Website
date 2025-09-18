import { createTheme } from "@mui/material/styles";
import { theSeasons } from "../fonts/theSeason";

const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          flexDirection: "column",
        },
      },
    },
  },
});

export default theme;
