import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="90vh"
      flexDirection="column"
    >
      <Typography variant="h1" component="div" gutterBottom color="primary">
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! You're lost
      </Typography>
      <Typography variant="h5" gutterBottom>
        The Page you are looking for was not found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
