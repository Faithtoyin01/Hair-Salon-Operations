import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    // Simulate successful registration
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>Register</Button>
      </Paper>
    </Container>
  );
};

export default RegisterPage;