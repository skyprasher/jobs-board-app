"use client";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSignup = async () => {
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });
      login(res.data.token);
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <Box mt={6}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4" color="primary">
          Sign Up
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: 300 }}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: 300 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: 300 }}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" onClick={handleSignup}>
          Create Account
        </Button>
        <Typography>or</Typography>
        <Button variant="outlined" onClick={handleGoogleSignup}>
          Sign up with Google
        </Button>
        <Button onClick={() => router.push("/login")}>
          Already have an account?
        </Button>
      </Stack>
    </Box>
  );
}
