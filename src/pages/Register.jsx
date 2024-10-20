import React from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { Footer, Navbar } from '../components'


function Register() {
  return (
    <Container maxWidth="lg">
        <Navbar />
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <TextField 
          fullWidth 
          label="Full Name" 
          variant="outlined" 
          margin="normal" 
        />
        <TextField 
          fullWidth 
          label="Email" 
          variant="outlined" 
          margin="normal" 
        />
        <TextField 
          fullWidth 
          label="Password" 
          type="password" 
          variant="outlined" 
          margin="normal" 
        />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Box>
      </Box>
      <Footer />
    </Container>
  );
}

export default Register;
