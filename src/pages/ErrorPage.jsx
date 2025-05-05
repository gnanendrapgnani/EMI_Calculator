import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap="10px"
    >
      <Typography variant="h4">
        Something went wrong in the application.
      </Typography>
      <Button variant="outlined" onClick={() => navigate("/")}>
        Go To Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
