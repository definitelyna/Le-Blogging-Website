"use client";

import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
