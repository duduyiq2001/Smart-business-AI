import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { Navbar, Footer } from '../components';

function Dashboard() {
  return (
    <Container>
    <Navbar />
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Transaction Insights</Typography>
                <Typography variant="body2">
                  View your financial transactions and get actionable insights.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Business Metrics</Typography>
                <Typography variant="body2">
                  Track key performance metrics for your business.
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
