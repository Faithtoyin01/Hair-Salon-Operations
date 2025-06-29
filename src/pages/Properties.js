import React from "react";
import { Box, Grid, Card, CardContent, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const navigate = useNavigate();
  const properties = [
    { id: 1, title: "2 Bedroom Flat", location: "Campus Road", price: "₦250,000/year" },
    { id: 2, title: "Self-Contained", location: "Main Gate", price: "₦150,000/year" },
  ];
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Available Properties</Typography>
      <Grid container spacing={3}>
        {properties.map((prop) => (
          <Grid item xs={12} md={6} key={prop.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{prop.title}</Typography>
                <Typography variant="body2" color="text.secondary">{prop.location}</Typography>
                <Typography variant="body1" fontWeight="bold">{prop.price}</Typography>
                <Button sx={{ mt: 1 }} onClick={() => navigate(`/property/${prop.id}`)} variant="contained" size="small">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PropertyList;