"use client";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      login(res.data.token);
      // localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box mt={6}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4" color="primary">
          Login
        </Typography>
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
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Button onClick={() => router.push("/signup")}>
          Don&apos;t have an account?
        </Button>
      </Stack>
    </Box>
  );
}
