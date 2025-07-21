import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Fade,
  Button,
} from "@mui/material";
import {
  Event as EventIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import { sendMockNotification } from "../utils";

const QueueManagement = ({
  appointments,
  setAppointments,
  staff,
  services,
}) => {
  const [waitTime, setWaitTime] = useState(0);

  const handleMarkReady = (appointmentId) => {
    const updatedAppointments = appointments.map((a) =>
      a.id === appointmentId ? { ...a, status: "Ready" } : a
    );
    setAppointments(updatedAppointments);
    const appointment = appointments.find((a) => a.id === appointmentId);
    sendMockNotification(
      "customer@example.com",
      `Your appointment with ${
        staff.find((s) => s.id === appointment.stylistId)?.name ||
        "Unknown Stylist"
      } is ready!`
    );
  };

  const calculateWaitTime = () => {
    const now = new Date();
    const pending = appointments.filter((a) => a.status === "Booked").length;
    setWaitTime(pending * 15); // Assume 15 minutes per appointment
  };

  return (
    <Fade in timeout={1000}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 500, color: "primary.main" }}
        >
          Queue Management
        </Typography>
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <EventIcon /> Current Queue
            </Typography>
            <Typography>Estimated Wait Time: {waitTime} minutes</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={calculateWaitTime}
            >
              Refresh Wait Time
            </Button>
            <List>
              {appointments
                .filter((a) => a.status === "Booked")
                .map((appointment) => (
                  <ListItem
                    key={appointment.id}
                    sx={{
                      bgcolor: "background.default",
                      borderRadius: 2,
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary={`Customer ID: ${
                        appointment.customerId
                      } | Service: ${
                        services.find((s) => s.id === appointment.serviceId)
                          ?.name || "Unknown Service"
                      }`}
                      secondary={`Stylist: ${
                        staff.find((s) => s.id === appointment.stylistId)
                          ?.name || "Unknown Stylist"
                      } | Time: ${appointment.dateTime.split("T")[1]}`}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleMarkReady(appointment.id)}
                      startIcon={<CheckIcon />}
                    >
                      Mark as Ready
                    </Button>
                  </ListItem>
                ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default QueueManagement;
