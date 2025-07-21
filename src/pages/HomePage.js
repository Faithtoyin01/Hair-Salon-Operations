import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Fade,
} from "@mui/material";
import {
  Event as EventIcon,
  AdminPanelSettings as AdminIcon,
  Person as CustomerIcon,
} from "@mui/icons-material";

const HomePage = ({ handleLogin }) => {
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            maxWidth: "800px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Card sx={{ maxWidth: 250, width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <CustomerIcon sx={{ fontSize: 40, color: "secondary.main" }} />
              <Typography variant="h6">Customer Login</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLogin("customer")}
                sx={{ width: "100%" }}
              >
                Login as Customer
              </Button>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 250, width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <AdminIcon sx={{ fontSize: 40, color: "secondary.main" }} />
              <Typography variant="h6">Admin Login</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLogin("admin")}
                sx={{ width: "100%" }}
              >
                Login as Admin
              </Button>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 250, width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <EventIcon sx={{ fontSize: 40, color: "secondary.main" }} />
              <Typography variant="h6">Book Now</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/booking")}
                sx={{ width: "100%" }}
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Fade>
  );
};

export default HomePage;
