import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Grid,
} from "@mui/material";

const SublettingTerminationPage = () => {
  const [formData, setFormData] = useState({
    property: "",
    currentTenant: "",
    reason: "",
    subletTo: "",
    terminationDate: "",
    notes: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmittedData(formData);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lease Termination & Subletting
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Fill Lease Transfer or Termination Details
        </Typography>
        <Box component="form" display="grid" gap={2}>
          <TextField
            label="Property Address"
            name="property"
            value={formData.property}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Current Tenant Name"
            name="currentTenant"
            value={formData.currentTenant}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Reason for Subletting/Termination"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Subletting To (Leave blank if terminating)"
            name="subletTo"
            value={formData.subletTo}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Effective Termination/Subletting Date"
            name="terminationDate"
            type="date"
            value={formData.terminationDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Additional Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            multiline
            rows={2}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit Termination/Sublet
          </Button>
        </Box>
      </Paper>

      {submittedData && (
        <Paper sx={{ p: 3 }} elevation={3}>
          <Typography variant="h6" gutterBottom>
            Submitted Details
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(submittedData).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography variant="body2" color="text.secondary">
                  <strong>{key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:</strong> {value || "N/A"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default SublettingTerminationPage;