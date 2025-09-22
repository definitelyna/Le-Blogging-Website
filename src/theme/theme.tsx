import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f4d92",
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
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#C4C4C4",
              height: "100%",
              transition: "0.2s",
            },

            "&:hover fieldset": {
              borderColor: "#C4C4C4",
              transition: "0.2s",
            },
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#C4C4C4",
              height: "100%",
              transition: "0.2s",
            },
            "&:hover fieldset": {
              borderColor: "#C4C4C4",
              transition: "0.2s",
            },
          },
        },
      },
    },
  },
});

export default theme;
