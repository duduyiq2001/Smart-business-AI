import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Ensure all environment variables are set
const APP_KEY = process.env.APP_KEY?.trim();
const token = process.env.ACCESS_TOKEN?.trim();
const customerId = process.env.CUSTOMER_ID || "7033717872"; // Hard-code for testing
const base_url = "https://api.finicity.com/";


axios
  .get(
    `${base_url}aggregation/v3/customers/${customerId}/transactions?fromDate=1000000000&includePending=true&toDate=1729374515`,
    {
      headers: {
        "Finicity-App-Key": APP_KEY,        // App key header
        "Accept": "application/json",       // Correct MIME type
        "Finicity-App-Token": token,        // Token header (your access token)
        // Omit 'User-Agent' to see if it works without it
      },
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error:", error.response ? error.response.data : error.message);
  });
