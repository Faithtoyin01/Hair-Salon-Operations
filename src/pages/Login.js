import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    // Simulate successful login
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;