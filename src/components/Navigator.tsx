"use client";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigator() {
  const currentRoute = usePathname();
  return (
    <ToggleButtonGroup exclusive value={currentRoute}>
      <ToggleButton value="/">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography color="#ffffff" p={2} variant="h6">
            Home
          </Typography>
        </Link>
      </ToggleButton>
      <ToggleButton value="/blog">
        <Link href="/blog" style={{ textDecoration: "none" }}>
          <Typography color="#ffffff" p={2} variant="h6">
            Blog
          </Typography>
        </Link>
      </ToggleButton>
      <ToggleButton value="/admin">
        <Link href="/admin" style={{ textDecoration: "none" }}>
          <Typography color="#ffffff" p={2} variant="h6">
            Admin
          </Typography>
        </Link>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
