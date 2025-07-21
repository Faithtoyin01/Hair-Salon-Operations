import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Fade } from "@mui/material";
import { Event as EventIcon } from "@mui/icons-material";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Fade in timeout={1000}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          py: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          background: "linear-gradient(180deg, #F9F4F3 0%, #FFFFFF 100%)",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: "primary.main", textAlign: "center" }}
        >
          Welcome to Glamour Hair Salon
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            maxWidth: "600px",
            color: "text.secondary",
          }}
        >
          Discover premium hair care services, book appointments with ease, and
          let our expert stylists transform your look.
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "accent.main" }}
        >
          Please{" "}
          <Typography
            component="span"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/login")}
          >
            log in
          </Typography>{" "}
          to continue.
        </Typography>
      </Box>
    </Fade>
  );
};

export default HomePage;
