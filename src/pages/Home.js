import React from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight="bold" gutterBottom align="center">
          Property Rental & Management System
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" paragraph>
          Easily find student accommodation, manage rentals, and stay connected with landlords.
        </Typography>
        <Grid container spacing={4} justifyContent="center" mt={4}>
          <Grid item>
            <Button variant="contained" size="large" onClick={() => navigate("/properties")}>View Properties</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" size="large" onClick={() => navigate("/login")}>Login</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" size="large" onClick={() => navigate("/register")}>Register</Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={6}>
          {["Secure Rentals", "Easy Maintenance Requests", "Student Reviews"].map((title, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {title === "Secure Rentals" && "Browse verified listings and contact trusted landlords."}
                    {title === "Easy Maintenance Requests" && "Submit repair requests and track their progress easily."}
                    {title === "Student Reviews" && "Check reviews and ratings from other students before renting."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;