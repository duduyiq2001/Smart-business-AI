import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import smallBusinessImage from '../assets/images/small_business.jpeg'
import { Footer, Navbar } from '../components'

function LandingPage() {
  return (
    <Container>
        <Navbar />
      <Box 
        sx={{ 
          textAlign: 'center', 
          marginTop: 8, 
          padding: 4,
          backgroundColor: '#f0f0f0', 
          borderRadius: 2 
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Small Business Solutions
        </Typography>
        <Typography variant="h6" paragraph>
          We provide personalized insights and solutions to help your small business thrive.
        </Typography>
        <Button variant="contained" color="primary" href="/register">
          Get Started
        </Button>
      </Box>
      <Box
          component="img"
          src={smallBusinessImage}
          alt="Small Business Theme"
          sx={{
            width: '100%',
            height: 'auto',
            margin: '20px auto',
            borderRadius: 2,
          }}
        />
        <Footer />
    </Container>
  );
}

export default LandingPage;
