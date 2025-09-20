import type { Metadata } from "next";
import MuiThemeProvider from "../providers/MuiThemeProvider";
import { Box } from "@mui/material";
import Header from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Globally Vietnamese",
  description: "A blogging website about Vietnamese culture and lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MuiThemeProvider>
        <body style={{ padding: 0, margin: 0 }}>
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Header />
            {children}
            <Footer />
          </Box>
        </body>
      </MuiThemeProvider>
    </html>
  );
}
