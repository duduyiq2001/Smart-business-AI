import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box 
          component="footer"
          sx={{ 
            backgroundColor: '#333', 
            color: '#fff', 
            textAlign: 'center', 
            padding: 2, 
            marginTop: 8,
            position: 'relative',
            bottom: 0,
            width: '100%'
          }}
        >
          <Typography variant="body1">
            &copy; {new Date().getFullYear()} Small Business Solutions. All rights reserved.
          </Typography>
          <Typography variant="body2">
            Follow us on:
          </Typography>
          <Box sx={{ mt: 1 }}>
            <a href="https://www.facebook.com" style={{ color: '#fff', margin: '0 10px' }}>Facebook</a>
            <a href="https://www.twitter.com" style={{ color: '#fff', margin: '0 10px' }}>Twitter</a>
            <a href="https://www.instagram.com" style={{ color: '#fff', margin: '0 10px' }}>Instagram</a>
          </Box>
        </Box>
      );
}

export default Footer;