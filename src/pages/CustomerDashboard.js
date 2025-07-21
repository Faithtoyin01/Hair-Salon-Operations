import React, { useState } from "react";
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
  TextField,
  Rating,
} from "@mui/material";
import {
  Event as EventIcon,
  TipsAndUpdates as TipsIcon,
  Feedback as FeedbackIcon,
} from "@mui/icons-material";
import { sendMockNotification } from "../utils";

const hairCareTips = [
  {
    title: "Cleansing",
    content: "Use sulfate-free shampoo to maintain hair health.",
  },
  {
    title: "Moisturizing",
    content: "Moisturize regularly to prevent dryness.",
  },
  {
    title: "Styling",
    content: "Avoid excessive heat styling to reduce damage.",
  },
];

const CustomerDashboard = ({
  user,
  appointments,
  feedback,
  setFeedback,
  services,
  staff,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleFeedbackSubmit = (appointmentId) => {
    if (rating && comment) {
      const newFeedback = {
        id: feedback.length + 1,
        customerId: user.id,
        appointmentId,
        rating,
        comments: comment,
      };
      setFeedback([...feedback, newFeedback]);
      sendMockNotification(user.email, "Thank you for your feedback!");
      setRating(0);
      setComment("");
    } else {
      alert("Please provide rating and comment");
    }
  };

  return (
    <Fade in timeout={1000}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 500, color: "primary.main" }}
        >
          Welcome, {user.firstName}!
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
            {appointments.filter((a) => a.customerId === user.id).length ===
            0 ? (
              <Typography color="text.secondary">
                No appointments booked yet.
              </Typography>
            ) : (
              <List>
                {appointments
                  .filter((a) => a.customerId === user.id)
                  .map((appointment) => (
                    <ListItem
                      key={appointment.id}
                      sx={{
                        bgcolor: "background.default",
                        borderRadius: 2,
                        mb: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <ListItemText
                        primary={`${
                          services.find((s) => s.id === appointment.serviceId)
                            ?.name || "Unknown Service"
                        } with ${
                          staff.find((s) => s.id === appointment.stylistId)
                            ?.name || "Unknown Stylist"
                        }`}
                        secondary={`Date: ${
                          appointment.dateTime.split("T")[0]
                        } | Time: ${
                          appointment.dateTime.split("T")[1]
                        } | Status: ${appointment.status}`}
                      />
                      <Box sx={{ mt: 1 }}>
                        <Rating
                          value={rating}
                          onChange={(e, v) => setRating(v)}
                        />
                        <TextField
                          label="Feedback"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          multiline
                          rows={2}
                          sx={{ mt: 1, width: "100%" }}
                        />
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleFeedbackSubmit(appointment.id)}
                          startIcon={<FeedbackIcon />}
                          sx={{ mt: 1 }}
                        >
                          Submit Feedback
                        </Button>
                      </Box>
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
              <TipsIcon /> Hair Care Tips for {user.hairType || "Your Hair"}
            </Typography>
            {hairCareTips.map((tip) => (
              <Box key={tip.title}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {tip.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tip.content}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default CustomerDashboard;
