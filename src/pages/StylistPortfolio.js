import React from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Person as PersonIcon } from "@mui/icons-material";

const StylistPortfolio = ({ staff, feedback }) => {
  const { stylistId } = useParams();
  const navigate = useNavigate();
  const stylist = staff.find((s) => s.id === parseInt(stylistId));

  if (!stylist) {
    return <Typography>Stylist not found</Typography>;
  }

  const mockPortfolio = [
    {
      id: 1,
      before: "Before hair styling",
      after: "After hair styling",
      description: "Transformed curly hair into sleek straight look",
    },
    {
      id: 2,
      before: "Before coloring",
      after: "After coloring",
      description: "Vibrant red color with highlights",
    },
  ];

  return (
    <Fade in timeout={1000}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <PersonIcon /> {stylist.name}'s Portfolio
        </Typography>
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="h6">Profile</Typography>
            <Typography>
              Name: {stylist.firstName} {stylist.lastName}
            </Typography>
            <Typography>Specialty: {stylist.specialty}</Typography>
            <Typography>Email: {stylist.email}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/booking")}
            >
              Book with {stylist.firstName}
            </Button>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="h6">Portfolio</Typography>
            <List>
              {mockPortfolio.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{ bgcolor: "background.default", borderRadius: 2, mb: 1 }}
                >
                  <ListItemText
                    primary={item.description}
                    secondary={`Before: ${item.before} | After: ${item.after}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="h6">Customer Reviews</Typography>
            <List>
              {feedback
                .filter(
                  (f) =>
                    staff.find((s) => s.id === f.customerId)?.id === stylist.id
                )
                .map((f) => (
                  <ListItem
                    key={f.id}
                    sx={{
                      bgcolor: "background.default",
                      borderRadius: 2,
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary={`Rating: ${f.rating}/5`}
                      secondary={f.comments}
                    />
                  </ListItem>
                ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default StylistPortfolio;
