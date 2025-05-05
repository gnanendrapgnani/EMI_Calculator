
import { Container, Typography, Box } from "@mui/material";

const About = () => {
  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography>
          Welcome to our platform. We provide currency exchange services and more.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
