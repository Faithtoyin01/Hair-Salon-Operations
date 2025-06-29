import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Divider,
  Alert,
} from "@mui/material";

const RentPolicyPage = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    proposedRent: "",
    justification: "",
    incrementPercent: "",
    incrementNotice: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Cap validation logic (10% cap)
    const percent = parseFloat(formData.incrementPercent);
    if (percent > 10) {
      alert("Rent increment exceeds 10% cap. Please revise.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Rent Cap & Increment Policy Manager
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Set Rent Details
        </Typography>
        <Box display="grid" gap={2}>
          <TextField
            label="Property Name"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Proposed Rent (₦)"
            name="proposedRent"
            value={formData.proposedRent}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Increment % (Max 10%)"
            name="incrementPercent"
            type="number"
            value={formData.incrementPercent}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Notice Before Increment (Months)"
            name="incrementNotice"
            type="number"
            value={formData.incrementNotice}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Justification for Increase"
            name="justification"
            value={formData.justification}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />

          <Button variant="contained" onClick={handleSubmit}>
            Submit Rent Policy
          </Button>
        </Box>
      </Paper>

      {submitted && (
        <Alert sx={{ mt: 3 }} severity="success">
          Rent policy submitted successfully and is within allowed limits.
        </Alert>
      )}
    </Box>
  );
};

export default RentPolicyPage;
