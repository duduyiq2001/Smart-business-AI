import createClient from "./createclient.js";
import { OpenAPIClient } from "@openapitools/openapi-generator-cli";
let client = await createClient(OpenAPIClient);

// Generate a Connect URL
let connectApi = new ConnectApi(client);
let connectParameters = new ConnectParameters(CUSTOMER_ID, PARTNER_ID);

let connectResponse;

api
  .generateConnectUrl(connectParameters, (error, data, response) => {
    connectResponse = response;
  })
  .then(console.log(connectResponse));
