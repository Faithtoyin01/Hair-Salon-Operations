import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  return (
    <Container sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Property #{id} Details</Typography>
        <Typography>Description and photos would be shown here.</Typography>
      </Paper>
    </Container>
  );
};

export default PropertyDetails;
