import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  Divider,
} from "@mui/material";

const InventoryChecklistPage = () => {
  const [inventory, setInventory] = useState([
    { item: "Bed", present: false },
    { item: "Mattress", present: false },
    { item: "Chair", present: false },
    { item: "Table", present: false },
    { item: "Fan", present: false },
    { item: "Light bulbs", present: false },
    { item: "Curtains", present: false },
    { item: "Toilet Seat", present: false },
    { item: "Shower", present: false },
  ]);

  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCheck = (index) => {
    const updated = [...inventory];
    updated[index].present = !updated[index].present;
    setInventory(updated);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inventory Checklist
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Move-in / Move-out Inventory
        </Typography>
        {inventory.map((inv, idx) => (
          <FormControlLabel
            key={idx}
            control={
              <Checkbox
                checked={inv.present}
                onChange={() => handleCheck(idx)}
              />
            }
            label={inv.item}
          />
        ))}
        <TextField
          label="Additional Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
          Submit Checklist
        </Button>
      </Paper>

      {submitted && (
        <Paper sx={{ p: 3 }} elevation={3}>
          <Typography variant="h6" gutterBottom>
            Submitted Checklist Summary
          </Typography>
          <ul>
            {inventory.map((inv, idx) => (
              <li key={idx}>
                {inv.item}: {inv.present ? "Present" : "Missing"}
              </li>
            ))}
          </ul>
          <Typography sx={{ mt: 2 }}>
            <strong>Notes:</strong> {notes || "None"}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default InventoryChecklistPage;