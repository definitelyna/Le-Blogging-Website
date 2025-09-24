"use client";

import SimpleCard from "@/src/components/SimpleCard";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { auth } from "@/src/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/admin/posts");
    }
  }, [user, router]);

  const handleSubmit = () => {
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Session is automatically saved by Firebase Auth
        router.push("/admin/posts");
      })
      .catch((error) => {
        let errorMessage = "An error occurred during login.";

        // Handle specific Firebase Auth errors
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/user-not-found":
            errorMessage = "No account found with this email.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many failed attempts. Please try again later.";
            break;
          default:
            errorMessage = error.message;
        }

        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SimpleCard
      contentSx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 4,
        minWidth: 300,
      }}
    >
      <Typography variant="h5">Admin login</Typography>
      <Box>
        <Typography variant="body1">Email</Typography>
        <TextField
          fullWidth
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box>
        <Typography variant="body1">Password</Typography>
        <TextField
          fullWidth
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        sx={{ bgcolor: "#000000", color: "#FFFFFF" }}
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </SimpleCard>
  );
}
