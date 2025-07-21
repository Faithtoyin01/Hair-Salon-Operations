import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const CustomerDashboard = ({ appointments }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h5">Customer Dashboard</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6">Your Appointments</Typography>
        {appointments.length === 0 ? (
          <Typography>No appointments booked yet.</Typography>
        ) : (
          <List>
            {appointments.map((appointment) => (
              <ListItem key={appointment.id}>
                <ListItemText
                  primary={`${appointment.service} with ${appointment.stylist}`}
                  secondary={`Date: ${appointment.date} | Time: ${appointment.time} | Status: ${appointment.status}`}
                />
              </ListItem>
            ))}
          </List>
        )}
        <Button variant="contained" onClick={() => navigate("/booking")}>
          Book Another Appointment
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6">Hair Care Tips</Typography>
        <Card>
          <CardContent>
            <Typography variant="body1">
              - Use sulfate-free shampoo to maintain hair health.
              <br />
              - Moisturize regularly to prevent dryness.
              <br />- Avoid excessive heat styling to reduce damage.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CustomerDashboard;
