
import { getAllTrans } from "./api/getalltrancs.js";
// Ensure all environment variables are set
const APP_KEY = process.env.APP_KEY?.trim();
const token = process.env.ACCESS_TOKEN?.trim();
const customerId = process.env.CUSTOMER_ID || "7033717872"; // Hard-code for testing
const OpenAI_KEY = process.env.OpenAI_KEY;

let result = await getAllTrans(20,customerId,APP_KEY,token);
console.log(result);