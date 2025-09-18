import type { Metadata } from "next";
import MuiThemeProvider from "../providers/MuiThemeProvider";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";

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
          <Container maxWidth="lg" disableGutters>
            <Header />
            {children}
          </Container>
        </body>
      </MuiThemeProvider>
    </html>
  );
}
