import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { Footer, Navbar } from '../components';
import { getAllTrans } from '../../api/getalltrancs.js';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
   // Define environment variables for API keys and customer information
   const APP_KEY = import.meta.env.VITE_APP_KEY;
   const token = import.meta.env.VITE_ACCESS_TOKEN;
   const customerId = import.meta.env.VITE_CUSTOMER_ID;

  // Fetch the transaction data from the public directory
  useEffect(() => {
    getAllTrans(20, customerId, APP_KEY, token)  // Fetch from the public folder
      .then((data) => {
        // Process the transaction data like in the parser.js file
        let processedData = [];

        for (let i = 0; i < data.transactions.length; i++) {
          const transaction = data.transactions[i];
          const categorization = transaction['categorization'] || {};

          let row_df = {
            id: transaction['id'] || null,
            amount: transaction['amount'] || null,
            accountId: transaction['accountId'] || null,
            customerId: transaction['customerId'] || null,
            status: transaction['status'] || null,
            description: transaction['description'] || null,
            memo: transaction['memo'] || null,
            postedDate: transaction['postedDate'] || null,
            transactionDate: transaction['transactionDate'] || null,
            createdDate: transaction['createdDate'] || null,
            categorization_normalizedPayeeName: categorization['normalizedPayeeName'] || null,
            categorization_category: categorization['category'] || null,
            categorization_bestRepresentation: categorization['bestRepresentation'] || null,
            categorization_country: categorization['country'] || null
          };

          processedData.push(row_df);
        }

        setTransactions(processedData); // Update state with processed data
      })
      .catch((error) => console.error('Error fetching transaction data:', error));
  }, []);

  return (
    <Container>
      <Navbar /> {/* Reuse Navbar component */}

      {/* Centered and styled "Transaction Table" heading */}
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
          Transaction Table
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Account ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Customer ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Memo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Posted Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Transaction Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Created Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Normalized Payee Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Best Representation</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.accountId}</TableCell>
                <TableCell>{transaction.customerId}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.memo}</TableCell>
                <TableCell>{transaction.postedDate}</TableCell>
                <TableCell>{transaction.transactionDate}</TableCell>
                <TableCell>{transaction.createdDate}</TableCell>
                <TableCell>{transaction.categorization_normalizedPayeeName}</TableCell>
                <TableCell>{transaction.categorization_category}</TableCell>
                <TableCell>{transaction.categorization_bestRepresentation}</TableCell>
                <TableCell>{transaction.categorization_country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Footer /> {/* Reuse Footer component */}
    </Container>
  );
}

export default Transactions;


/*
import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Footer, Navbar } from '../components';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  // Fetch the transaction data from the public directory
  useEffect(() => {
    fetch('/transactions.json')  // Fetch from the public folder
      .then((response) => response.json())
      .then((data) => {
        // Process the transaction data like in the parser.js file
        let processedData = [];

        for (let i = 0; i < data.transactions.length; i++) {
          const transaction = data.transactions[i];
          const categorization = transaction['categorization'] || {};

          let row_df = {
            id: transaction['id'] || null,
            amount: transaction['amount'] || null,
            accountId: transaction['accountId'] || null,
            customerId: transaction['customerId'] || null,
            status: transaction['status'] || null,
            description: transaction['description'] || null,
            memo: transaction['memo'] || null,
            postedDate: transaction['postedDate'] || null,
            transactionDate: transaction['transactionDate'] || null,
            createdDate: transaction['createdDate'] || null,
            categorization_normalizedPayeeName: categorization['normalizedPayeeName'] || null,
            categorization_category: categorization['category'] || null,
            categorization_bestRepresentation: categorization['bestRepresentation'] || null,
            categorization_country: categorization['country'] || null
          };

          processedData.push(row_df);
        }

        setTransactions(processedData); // Update state with processed data
      })
      .catch((error) => console.error('Error fetching transaction data:', error));
  }, []);

  return (
    <Container>
      <Navbar /> {}

      <Typography variant="h4" gutterBottom>
        Transaction Table
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Account ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Customer ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Memo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Posted Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Transaction Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Created Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Normalized Payee Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Best Representation</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.accountId}</TableCell>
                <TableCell>{transaction.customerId}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.memo}</TableCell>
                <TableCell>{transaction.postedDate}</TableCell>
                <TableCell>{transaction.transactionDate}</TableCell>
                <TableCell>{transaction.createdDate}</TableCell>
                <TableCell>{transaction.categorization_normalizedPayeeName}</TableCell>
                <TableCell>{transaction.categorization_category}</TableCell>
                <TableCell>{transaction.categorization_bestRepresentation}</TableCell>
                <TableCell>{transaction.categorization_country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Footer /> {}
    </Container>
  );
}

export default Transactions;
*/