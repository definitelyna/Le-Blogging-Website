import { createTheme } from "@mui/material/styles";
import { theSeasons } from "../fonts/theSeason";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f4d92",
      secondary: "#F9F9FA",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#717182",
    },
  },
  typography: {
    //Set default font family as ui-sans-serif
    fontFamily:
      "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
  },
});

export default theme;
