import React from "react";
import { Box, Typography, Grid, Paper, Button, Card, CardContent, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DescriptionIcon from '@mui/icons-material/Description';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PolicyIcon from '@mui/icons-material/Policy';
import HistoryIcon from '@mui/icons-material/History';

const DashboardPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Manage Properties",
      description: "Add, update, and monitor your listed properties.",
      icon: <HomeIcon fontSize="large" color="primary" />,
      action: () => navigate("/properties"),
    },
    {
      title: "Maintenance Requests",
      description: "Track and respond to tenant maintenance requests.",
      icon: <BuildIcon fontSize="large" color="primary" />,
      action: () => navigate("/maintenance"),
    },
    {
      title: "View Reviews",
      description: "Check feedback and ratings left by students.",
      icon: <RateReviewIcon fontSize="large" color="primary" />,
      action: () => navigate("/review"),
    },
    {
      title: "Lease Agreements",
      description: "Generate and manage flexible lease agreements.",
      icon: <DescriptionIcon fontSize="large" color="primary" />,
      action: () => navigate("/agreements"),
    },
    {
      title: "Subletting & Terminations",
      description: "List, transfer, or terminate rental agreements easily.",
      icon: <TransferWithinAStationIcon fontSize="large" color="primary" />,
      action: () => navigate("/subletting"),
    },
    {
      title: "Inventory Checklist",
      description: "Document conditions during move-in and move-out.",
      icon: <ChecklistIcon fontSize="large" color="primary" />,
      action: () => navigate("/inventory"),
    },
    {
      title: "Rent Cap & Policies",
      description: "Set and justify rental caps and increment policies.",
      icon: <PolicyIcon fontSize="large" color="primary" />,
      action: () => navigate("/rent-policy"),
    },
    {
      title: "Rent History Tracker",
      description: "Track and view the rental history of properties.",
      icon: <HistoryIcon fontSize="large" color="primary" />,
      action: () => navigate("/rent-history"),
    }
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card elevation={3} sx={{ p: 2, height: "100%" }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {feature.description}
                </Typography>
                <Button variant="outlined" fullWidth onClick={feature.action}>Go to {feature.title}</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardPage;
