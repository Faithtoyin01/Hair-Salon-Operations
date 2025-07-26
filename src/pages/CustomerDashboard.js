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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
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
  const navigate = useNavigate();
  const userAppointments = appointments.filter((a) => a.customerId === user.id);
  const [feedbackData, setFeedbackData] = useState({}); // { appointmentId: { rating, comment } }

  const handleFeedbackChange = (id, field, value) => {
    setFeedbackData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleFeedbackSubmit = (appointmentId) => {
    const data = feedbackData[appointmentId];
    if (data?.rating && data?.comment) {
      const newFeedback = {
        id: feedback.length + 1,
        customerId: user.id,
        appointmentId,
        rating: data.rating,
        comments: data.comment,
      };
      setFeedback([...feedback, newFeedback]);
      sendMockNotification(user.email, "Thank you for your feedback!");
      setFeedbackData((prev) => ({ ...prev, [appointmentId]: {} }));
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service</TableCell>
                  <TableCell>Stylist</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>
                      {services.find((s) => s.id === a.serviceId)?.name ||
                        "Unknown Service"}
                    </TableCell>
                    <TableCell>
                      {staff.find((s) => s.id === a.stylistId)?.name ||
                        "Unknown Stylist"}
                    </TableCell>
                    <TableCell>{a.dateTime.split("T")[0]}</TableCell>
                    <TableCell>{a.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
