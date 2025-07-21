import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Fade,
} from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";

const LoginPage = ({ setUser }) => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role && username && password) {
      setUser(role);
      navigate(role === "admin" ? "/admin-dashboard" : "/customer-dashboard");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <Fade in timeout={1000}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          maxWidth: "400px",
          mx: "auto",
          mt: 4,
        }}
      >
        <Card sx={{ width: "100%", bgcolor: "background.paper" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LoginIcon sx={{ fontSize: 40, color: "primary.main" }} />
              <Typography
                variant="h5"
                sx={{ fontWeight: 500, color: "primary.main" }}
              >
                Login to Glamour Hair Salon
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)}>
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default LoginPage;
