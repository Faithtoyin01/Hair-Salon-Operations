import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Fade,
  Button,
  Grid,
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";

const StylistPortfolio = ({ staff, feedback }) => {
  const { stylistId } = useParams();

  if (!stylistId) {
    return (
      <Fade in timeout={1000}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 4,
            mx: { xs: 2, sm: 4 },
          }}
        >
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
            <PersonIcon /> Our Stylists
          </Typography>
          <Grid container spacing={2}>
            {staff
              .filter((s) => s.position === "Stylist")
              .map((stylist) => (
                <Grid item xs={12} sm={6} md={4} key={stylist.id}>
                  <Card
                    sx={{
                      bgcolor: "background.paper",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        stylist.image ||
                        `https://via.placeholder.com/300x200?text=${stylist.name}`
                      }
                      alt={stylist.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{stylist.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stylist.specialty || "N/A"}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to={`/stylist-portfolio/${stylist.id}`}
                        sx={{ mt: 2 }}
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Fade>
    );
  }

  const stylist = staff.find((s) => s.id === parseInt(stylistId));

  if (!stylist) {
    return (
      <Fade in timeout={1000}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
          <Typography variant="h5" color="error.main">
            Stylist not found
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Fade in timeout={1000}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 4,
          maxWidth: "800px",
          mx: "auto",
        }}
      >
        <Card sx={{ bgcolor: "background.paper", boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="400"
            image={
              stylist.image ||
              `https://via.placeholder.com/800x400?text=${stylist.name}`
            }
            alt={stylist.name}
            sx={{ objectFit: "cover" }}
          />
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 500, color: "primary.main" }}
            >
              {stylist.name}
            </Typography>
            <Typography variant="body1">
              <strong>Specialty:</strong> {stylist.specialty || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Experience:</strong> {stylist.experience || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Bio:</strong> {stylist.bio || "No bio available"}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {stylist.email}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {stylist.phone}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Customer Feedback
            </Typography>
            {feedback.filter((f) => f.stylistId === stylist.id).length === 0 ? (
              <Typography color="text.secondary">No feedback yet.</Typography>
            ) : (
              <Grid container spacing={2}>
                {feedback
                  .filter((f) => f.stylistId === stylist.id)
                  .map((f) => (
                    <Grid item xs={12} sm={6} key={f.id}>
                      <Box
                        sx={{
                          bgcolor: "background.default",
                          p: 2,
                          borderRadius: 2,
                          boxShadow: 1,
                        }}
                      >
                        <Typography variant="body2">
                          Rating: {f.rating}/5
                        </Typography>
                        <Typography variant="body2">{f.comments}</Typography>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            )}
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/booking"
              sx={{ mt: 2 }}
            >
              Book with {stylist.name}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default StylistPortfolio;
