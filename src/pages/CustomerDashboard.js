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
  Fade,
} from "@mui/material";
import {
  Event as EventIcon,
  TipsAndUpdates as TipsIcon,
} from "@mui/icons-material";

const CustomerDashboard = ({ appointments }) => {
  const navigate = useNavigate();

  return (
    <Fade in timeout={1000}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 500, color: "primary.main" }}
        >
          Customer Dashboard
        </Typography>
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <EventIcon /> Your Appointments
            </Typography>
            {appointments.length === 0 ? (
              <Typography color="text.secondary">
                No appointments booked yet.
              </Typography>
            ) : (
              <List>
                {appointments.map((appointment) => (
                  <ListItem
                    key={appointment.id}
                    sx={{
                      bgcolor: "background.default",
                      borderRadius: 2,
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary={`${appointment.service} with ${appointment.stylist}`}
                      secondary={`Date: ${appointment.date} | Time: ${appointment.time} | Status: ${appointment.status}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/booking")}
              startIcon={<EventIcon />}
            >
              Book Another Appointment
            </Button>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <TipsIcon /> Hair Care Tips
            </Typography>
            <Typography variant="body1" color="text.secondary">
              - Use sulfate-free shampoo to maintain hair health.
              <br />
              - Moisturize regularly to prevent dryness.
              <br />- Avoid excessive heat styling to reduce damage.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default CustomerDashboard;
