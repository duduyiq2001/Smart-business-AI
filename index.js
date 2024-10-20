
import dotenv from "dotenv";
dotenv.config();
import { getAllTrans } from "./api/getalltrancs.js";
import { response } from "express";


import { initializeChat,sendMessage } from "./api/getlangchain.js";

// Ensure all environment variables are set
const APP_KEY = process.env.APP_KEY?.trim();
const token = process.env.ACCESS_TOKEN?.trim();
const customerId = process.env.CUSTOMER_ID || "7033717872"; // Hard-code for testing
const OpenAI_KEY = process.env.OpenAI_KEY;
// let res = await getAllTrans(20,customerId,APP_KEY,token)
// console.log(res)

let chat = await initializeChat();
let res = await sendMessage(chat, "why is llmchain deprecated in langchain now");
console.log(res)


// axios
//   .get(
//     `${base_url}aggregation/v3/customers/${customerId}/transactions?fromDate=1000000000&includePending=true&toDate=1729374515&limit=20&sort=desc`,
//     {
//       headers: {
//         "Finicity-App-Key": APP_KEY,        // App key header
//         "Accept": "application/json",       // Correct MIME type
//         "Finicity-App-Token": token,        // Token header (your access token)
//         // Omit 'User-Agent' to see if it works without it
//       },
//     }
//   )
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error("Error:", error.response ? error.response.data : error.message);
//   });


