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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  Event as EventIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { sendMockNotification, getCurrentUser } from "../utils";

const QueueManagement = ({
  appointments,
  setAppointments,
  services,
  staff,
}) => {
  const stylist = getCurrentUser(); // get logged in stylist
  const [viewToday, setViewToday] = useState(true);

  const todayDate = new Date().toISOString().split("T")[0];

  const stylistAppointments = appointments
    .filter(
      (a) =>
        a.stylistId &&
        stylist.name === staff.find((s) => s.id === a.stylistId)?.name
    )
    .filter((a) =>
      viewToday
        ? a.dateTime.split("T")[0] === todayDate && a.status !== "Done"
        : a.status !== "Done"
    )
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  const handleMarkDone = (appointmentId) => {
    const updated = appointments.map((a) =>
      a.id === appointmentId ? { ...a, status: "Done" } : a
    );
    setAppointments(updated);

    const appointment = appointments.find((a) => a.id === appointmentId);
    sendMockNotification(
      "customer@example.com",
      `✅ Your appointment with ${stylist.name} is marked as done!`
    );
  };

  return (
    <Fade in timeout={1000}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 500, color: "primary.main" }}
        >
          Queue for {stylist.name}
        </Typography>

        <ToggleButtonGroup
          value={viewToday ? "today" : "all"}
          exclusive
          onChange={(e, val) => setViewToday(val === "today")}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="today" aria-label="Today's Appointments">
            Today’s Appointments
          </ToggleButton>
          <ToggleButton value="all" aria-label="All Appointments">
            All Upcoming
          </ToggleButton>
        </ToggleButtonGroup>

        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <EventIcon /> Appointments
            </Typography>

            {stylistAppointments.length === 0 ? (
              <Typography>No appointments found.</Typography>
            ) : (
              <List>
                {stylistAppointments.map((a) => (
                  <ListItem
                    key={a.id}
                    sx={{
                      bgcolor: "background.default",
                      borderRadius: 2,
                      mb: 1,
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <ListItemText
                      primary={`Service: ${
                        services.find((s) => s.id === a.serviceId)?.name ||
                        "Unknown"
                      }`}
                      secondary={`Customer: ${a.customerId} | Time: ${
                        a.dateTime.split("T")[1]
                      } | Status: ${a.status}`}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<CheckIcon />}
                      onClick={() => handleMarkDone(a.id)}
                      sx={{ mt: 1, alignSelf: "flex-end" }}
                    >
                      Mark as Done
                    </Button>
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default QueueManagement;
