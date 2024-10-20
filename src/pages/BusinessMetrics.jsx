import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Footer, Navbar } from '../components';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { getAllTrans } from '../../api/getalltrancs.js';
// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

function BusinessMetrics() {
  const [transactions, setTransactions] = useState([]);
  // Define environment variables for API keys and customer information
  const APP_KEY = import.meta.env.VITE_APP_KEY;
  const token = import.meta.env.VITE_ACCESS_TOKEN;
  const customerId = import.meta.env.VITE_CUSTOMER_ID;
  // Fetch the transaction data
  useEffect(() => {
    getAllTrans(20, customerId, APP_KEY, token)
      .then((data) => setTransactions(data.transactions))
      .catch((error) => console.error('Error fetching transaction data:', error));
  }, []);

  // Filter transactions into income (positive amounts) and expenses (negative amounts)
  const incomeTransactions = transactions.filter(t => t.amount > 0);
  const expenseTransactions = transactions.filter(t => t.amount < 0);

  // Categorize income and expenses by category
  const incomeByCategory = incomeTransactions.reduce((acc, transaction) => {
    const category = transaction.categorization?.category || 'Unknown';
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {});

  const expenseByCategory = expenseTransactions.reduce((acc, transaction) => {
    const category = transaction.categorization?.category || 'Unknown';
    acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
    return acc;
  }, {});

  // Data for Income Distribution Pie Chart
  const incomeDistributionData = {
    labels: Object.keys(incomeByCategory),
    datasets: [
      {
        label: 'Income Distribution',
        data: Object.values(incomeByCategory),
        backgroundColor: ['#4caf50', '#36a2eb', '#ffce56', '#ab47bc', '#f44336'],
      }
    ]
  };

  // Data for Expenses Distribution Pie Chart
  const expenseDistributionData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        label: 'Expenses Distribution',
        data: Object.values(expenseByCategory),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4caf50', '#ab47bc'],
      }
    ]
  };

  // Summarize Income vs Expenses for a bar chart
  const totalIncome = incomeTransactions.reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = expenseTransactions.reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const incomeVsExpensesData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount',
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#4caf50', '#f44336'], // green for income, red for expenses
      }
    ]
  };

  // Time-based income and expense line chart
  const dates = transactions.map(t => t.transactionDate);
  const lineChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Income',
        data: transactions.map(t => (t.amount > 0 ? t.amount : 0)),
        borderColor: '#4caf50',
        fill: false,
      },
      {
        label: 'Expenses',
        data: transactions.map(t => (t.amount < 0 ? Math.abs(t.amount) : 0)),
        borderColor: '#f44336',
        fill: false,
      }
    ]
  };

  return (
    <Container>
      <Navbar /> {/* Add the navigation bar */}

      <Box
        sx={{ 
          textAlign: 'center', 
          backgroundColor: '#f0f0f0', 
          padding: 2, 
          borderRadius: 2, 
          marginTop: 4, 
          marginBottom: 4 
        }}
      >
        <Typography variant="h4" gutterBottom>
          Business Metrics
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Bar Chart for Income vs Expenses */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" align="center">Total Income vs Expenses</Typography>
          <Bar data={incomeVsExpensesData} />
        </Grid>

        {/* Pie Chart for Income Distribution */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" align="center">Income Distribution</Typography>
          <Pie data={incomeDistributionData} />
        </Grid>

        {/* Pie Chart for Expenses Distribution */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" align="center">Expenses Distribution</Typography>
          <Pie data={expenseDistributionData} />
        </Grid>

        {/* Line Chart for Time-based Income/Expenses */}
        <Grid item xs={12}>
          <Typography variant="h6" align="center">Income and Expenses Over Time</Typography>
          <Line data={lineChartData} />
        </Grid>
      </Grid>

      <Footer /> {/* Add the footer */}
    </Container>
  );
}

export default BusinessMetrics;
