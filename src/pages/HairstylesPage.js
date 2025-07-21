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
import { getHairstyles } from "../utils";

const HairstylesPage = () => {
  const hairstyles = getHairstyles();

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
                    style.image && style.image.startsWith("data:image/")
                      ? style.image
                      : style.imageUrl ||
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
