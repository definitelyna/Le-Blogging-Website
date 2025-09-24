"use client";
import { Box, Button, ToggleButton, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface StyledToggleButtonProps {
  value: string;
  children: React.ReactNode;
  selected?: boolean;
}

const StyledButton = ({ children, ...props }: StyledToggleButtonProps) => {
  return (
    <Button
      {...props}
      disableRipple
      sx={{
        color: "#ffffff",
        borderRadius: 0,
        ...(props.selected
          ? { borderBottom: "1px solid #ffffff" }
          : { opacity: 0.7, "&:hover": { opacity: 1 } }),
      }}
    >
      {children}
    </Button>
  );
};

export default function Navigator() {
  const currentRoute = usePathname();
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <StyledButton value="/" selected={currentRoute === "/"}>
          <Typography variant="h6" textTransform="none">
            Home
          </Typography>
        </StyledButton>
      </Link>
      <Link href="/blog" style={{ textDecoration: "none", color: "inherit" }}>
        <StyledButton value="/blog" selected={currentRoute === "/blog"}>
          <Typography variant="h6" textTransform="none">
            Blog
          </Typography>
        </StyledButton>
      </Link>

      <Link href="/admin" style={{ textDecoration: "none", color: "inherit" }}>
        <StyledButton value="/admin" selected={currentRoute.includes("/admin")}>
          <Typography variant="h6" textTransform="none">
            Admin
          </Typography>
        </StyledButton>
      </Link>
    </Box>
  );
}
