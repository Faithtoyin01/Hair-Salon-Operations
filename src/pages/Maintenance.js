import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  Chip,
} from "@mui/material";

const mockRequests = [
  {
    id: 1,
    title: "Leaking Roof",
    description: "Water drips during heavy rain.",
    status: "Pending",
    submittedBy: "John Doe",
    submittedAt: "2025-03-10",
  },
  {
    id: 2,
    title: "Broken Light Switch",
    description: "The switch in the hallway doesn't work.",
    status: "In Progress",
    submittedBy: "Jane Smith",
    submittedAt: "2025-03-12",
  },
];

const statusColors = {
  Pending: "warning",
  "In Progress": "info",
  Resolved: "success",
};

const MaintenancePage = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [newRequest, setNewRequest] = useState({ title: "", description: "" });

  const handleInputChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!newRequest.title || !newRequest.description) return;
    const newEntry = {
      id: requests.length + 1,
      title: newRequest.title,
      description: newRequest.description,
      status: "Pending",
      submittedBy: "Current User",
      submittedAt: new Date().toISOString().split("T")[0],
    };
    setRequests([newEntry, ...requests]);
    setNewRequest({ title: "", description: "" });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Maintenance Requests
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Submit a New Request
        </Typography>
        <TextField
          fullWidth
          name="title"
          label="Issue Title"
          value={newRequest.title}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          name="description"
          label="Issue Description"
          value={newRequest.description}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit Request
        </Button>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Existing Requests
      </Typography>
      <Grid container spacing={3}>
        {requests.map((req) => (
          <Grid item xs={12} md={6} key={req.id}>
            <Paper sx={{ p: 2 }} elevation={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                {req.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {req.description}
              </Typography>
              <Chip
                label={req.status}
                color={statusColors[req.status]}
                sx={{ mb: 1 }}
              />
              <Typography variant="caption" display="block">
                Submitted by: {req.submittedBy}
              </Typography>
              <Typography variant="caption" display="block">
                Submitted on: {req.submittedAt}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MaintenancePage;