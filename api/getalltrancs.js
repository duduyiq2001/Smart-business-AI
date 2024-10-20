import axios from "axios";
const base_url = "https://api.finicity.com/";
const params = {
  fromDate: 1000000000,
  includePending: true,
  toDate: 1729374515,
  limit: 1,
  sort: "desc",
};


export async function getAllTrans(num, customerId, APP_KEY, token) {

  try {
    // Make an asynchronous request and await the response
    const response = await axios.get(
      `${base_url}aggregation/v3/customers/${customerId}/transactions`,
      {
        headers: {
          "Finicity-App-Key": APP_KEY,  // App key header
          "Accept": "application/json", // Correct MIME type
          "Finicity-App-Token": token,  // Token header (your access token)
        },
        params: params,
      }
    );
    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    throw new Error("Can't get API response");
  }
}