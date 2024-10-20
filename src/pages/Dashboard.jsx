import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { Navbar, Footer } from '../components';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const navigate = useNavigate();

  const handleTransactionHistoryClick = () => {
    navigate('/transaction-history'); 
  };
  const handleAiClick = () => {
    navigate('/ai'); 
  };
  const handlemClick = () => {
    navigate('/business-metrics')
  }
  return (
    <Container>
    <Navbar />
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card onClick={handleAiClick}>
              <CardContent >
                <Typography variant="h5">Smart Business Solutions</Typography>
                <Typography variant="body2">
                  Obtain smart AI business solutions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card onClick ={handlemClick}>
              <CardContent>
                <Typography variant="h5">Business Metrics</Typography>
                <Typography variant="body2">
                  Track key performance metrics for your business.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <Card onClick={handleTransactionHistoryClick} sx={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h5">Transaction History</Typography>
                <Typography variant="body2">
                  View your transaction history.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
}

export default Dashboard;