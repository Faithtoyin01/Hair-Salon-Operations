import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Divider,
} from "@mui/material";

const LeaseAgreementPage = () => {
  const [formData, setFormData] = useState({
    landlordName: "",
    studentName: "",
    propertyAddress: "",
    startDate: "",
    endDate: "",
    monthlyRent: "",
    customTerms: "",
  });

  const [generatedAgreement, setGeneratedAgreement] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    const agreement = `LEASE AGREEMENT\n\nThis agreement is made between ${formData.landlordName} (Landlord) and ${formData.studentName} (Tenant).\n\nProperty Address: ${formData.propertyAddress}\nStart Date: ${formData.startDate}\nEnd Date: ${formData.endDate}\nMonthly Rent: ₦${formData.monthlyRent}\n\nAdditional Terms:\n${formData.customTerms}`;
    setGeneratedAgreement(agreement);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Flexible Lease Agreement Generator
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Fill Lease Details
        </Typography>
        <Box component="form" display="grid" gap={2}>
          <TextField
            label="Landlord Name"
            name="landlordName"
            value={formData.landlordName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Student Name"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Property Address"
            name="propertyAddress"
            value={formData.propertyAddress}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Monthly Rent (₦)"
            name="monthlyRent"
            value={formData.monthlyRent}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Custom Terms"
            name="customTerms"
            value={formData.customTerms}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          <Button variant="contained" onClick={handleGenerate}>
            Generate Lease Agreement
          </Button>
        </Box>
      </Paper>

      {generatedAgreement && (
        <Paper sx={{ p: 3 }} elevation={3}>
          <Typography variant="h6" gutterBottom>
            Generated Lease Agreement
          </Typography>
          <pre>{generatedAgreement}</pre>
        </Paper>
      )}
    </Box>
  );
};

export default LeaseAgreementPage;
