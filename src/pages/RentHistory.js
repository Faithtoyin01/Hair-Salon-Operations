import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";

const mockRentHistory = [
  {
    id: 1,
    property: "Room A, Student Hostel",
    oldRent: 50000,
    newRent: 55000,
    date: "2024-06-01",
    reason: "Annual increment",
  },
  {
    id: 2,
    property: "Flat 2B, Peace Estate",
    oldRent: 70000,
    newRent: 77000,
    date: "2024-01-10",
    reason: "Renovated building",
  },
];

const RentHistoryPage = () => {
  const [search, setSearch] = React.useState("");
  const filteredHistory = mockRentHistory.filter((entry) =>
    entry.property.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Rent History Tracker
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <TextField
          label="Search Property"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained">Export</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell>Old Rent (₦)</TableCell>
              <TableCell>New Rent (₦)</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHistory.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.property}</TableCell>
                <TableCell>{row.oldRent}</TableCell>
                <TableCell>{row.newRent}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RentHistoryPage;
