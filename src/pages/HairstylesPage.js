import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Fade,
  Grid,
} from "@mui/material";
import { Style as StyleIcon } from "@mui/icons-material";

const hairstyles = [
  {
    name: "Cornrows",
    description:
      "Neat, tight braids close to the scalp, perfect for a sleek look.",
    image: "https://via.placeholder.com/300x200?text=Cornrows",
  },
  {
    name: "Box Braids",
    description: "Individual braids for a versatile, low-maintenance style.",
    image: "https://via.placeholder.com/300x200?text=Box+Braids",
  },
  {
    name: "Weave-On",
    description: "Sew-in extensions for added length and volume.",
    image: "https://via.placeholder.com/300x200?text=Weave-On",
  },
  {
    name: "Fulani Braids",
    description: "Intricate braids with beads, inspired by Fulani culture.",
    image: "https://via.placeholder.com/300x200?text=Fulani+Braids",
  },
];

const HairstylesPage = () => {
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
          <StyleIcon /> Popular Nigerian Hairstyles
        </Typography>
        <Grid container spacing={2}>
          {hairstyles.map((style) => (
            <Grid item xs={12} sm={6} md={4} key={style.id}>
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
                    style.image ||
                    `https://via.placeholder.com/300x200?text=${style.name}`
                  }
                  alt={style.name}
                />
                <CardContent>
                  <Typography variant="h6">{style.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {style.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );
};

export default HairstylesPage;
