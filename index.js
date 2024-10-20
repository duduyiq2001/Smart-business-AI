import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Credentials (you can retrieve these from environment variables or any other source)
const PARTNER_ID = process.env.PARTNER_ID;
const PARTNER_SECRET = process.env.PARTNER_SECRET;
const customerId = process.env.CUSTOMER_ID;
const APP_KEY = process.env.APP_KEY?.trim();  // Trim leading and trailing whitespace

// Token (this would be set by your authorization process)
let token = process.env.ACCESS_TOKEN;
let base_url = "https://api.finicity.com/";
let appwd = "application/json";

console.log("api key is", APP_KEY);
console.log("customer is", customerId);
console.log(APP_KEY.startsWith(" "))

// // Axios GET request with headers
// axios
//   .get(
//     `${base_url}aggregation/v3/customers/${customerId}/transactions?fromDate=1000000000&includePending=true&toDate=1729374515`,
//     {
//       headers: {
//         "Finicity-App-Key": APP_KEY, // App key header
//         "Accept": appwd, // Accept JSON responses
//         "Finicity-App-Token": token, // Token header (your access token)
//       },
//     }
//   )
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
