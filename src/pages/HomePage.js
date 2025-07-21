import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const HomePage = ({ handleLogin }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h4">Welcome to Our Hair Salon</Typography>
      <Typography
        variant="body1"
        sx={{ textAlign: "center", maxWidth: "600px" }}
      >
        Book your appointments, explore our services, and experience top-notch
        hair care with ease.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => handleLogin("customer")}>
          Login as Customer
        </Button>
        <Button variant="contained" onClick={() => handleLogin("admin")}>
          Login as Admin
        </Button>
        <Button variant="outlined" onClick={() => navigate("/booking")}>
          Book Now
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
