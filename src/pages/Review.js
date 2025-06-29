import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Rating,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@mui/material";
import RateReviewIcon from '@mui/icons-material/RateReview';

const landlords = ["Mr. Ade", "Mrs. Okoro", "Landlord John"];
const properties = ["12 Uyo Street", "Flat B, University Road", "Block 3, Lagos Quarters"];

const ReviewPage = () => {
  const [selectedLandlord, setSelectedLandlord] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = () => {
    if (!selectedLandlord || !selectedProperty || !rating || !review) {
      alert("Please fill in all fields.");
      return;
    }

    const newReview = {
      landlord: selectedLandlord,
      property: selectedProperty,
      rating,
      review,
      date: new Date().toLocaleDateString(),
    };

    setReviews([newReview, ...reviews]);
    setSelectedLandlord("");
    setSelectedProperty("");
    setRating(0);
    setReview("");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Accommodation Rating & Review System
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Box
        component="form"
        sx={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 2 }}
        noValidate
        autoComplete="off"
      >
        <TextField
          select
          label="Select Landlord"
          value={selectedLandlord}
          onChange={(e) => setSelectedLandlord(e.target.value)}
        >
          {landlords.map((landlord) => (
            <MenuItem key={landlord} value={landlord}>
              {landlord}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Select Property"
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
        >
          {properties.map((property) => (
            <MenuItem key={property} value={property}>
              {property}
            </MenuItem>
          ))}
        </TextField>

        <Box display="flex" alignItems="center">
          <Typography variant="body1" mr={2}>Security Rating:</Typography>
          <Rating
            name="security-rating"
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
        </Box>

        <TextField
          label="Write your review"
          multiline
          minRows={3}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Submit Review
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Recent Reviews
      </Typography>

      <List>
        {reviews.map((item, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>
                <RateReviewIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${item.landlord} – ${item.property}`}
              secondary={
                <>
                  <Rating name={`rating-${index}`} value={item.rating} readOnly size="small" />
                  <Typography variant="body2">{item.review}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.date}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ReviewPage;