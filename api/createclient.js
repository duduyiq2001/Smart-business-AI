// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();
import { writeToEnv } from "../io/updatenv.js";

// Credentials
const PARTNER_ID = process.env.PARTNER_ID;
const APP_KEY = process.env.APP_KEY;
const PARTNER_SECRET = process.env.PARTNER_SECRET;

// Token
let token = process.env.ACCESS_TOKEN;
let expiry = null;
// Create the API client
const createClient = function (openAPIClient) {
  // Use a promise to ensure the token has been added before sending the request
  return new Promise((resolve) => {
    let client = openAPIClient.ApiClient.instance;
    let authApi = new AuthenticationApi(client);

    // Add the Finicity-App-Key header for every request
    client.applyAuthToRequest = function (request) {
      const _end = request._end;
      request._end = function () {
        request.req.setHeader("Finicity-App-Key", APP_KEY);
        _end.call(request);
      };
      return request;
    };

    // If the token doesn't exist or has expired, refresh it
    let tokenPromise = function refreshToken() {
      return new Promise((resolve) => {
        if (expiry === null || expiry < new Date()) {
          authApi.createToken(
            new PartnerCredentials(PARTNER_ID, PARTNER_SECRET),
            (error, data, response) => {
              if (!error) {
                expiry = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);
                token = data.token;
                //update token and expiration
                writeToEnv("ACCESS_TOKEN", token);
                writeToEnv("EXPIRY", expiry.toUTCString());
                resolve();
              }
            }
          );
        } else {
          resolve();
        }
      });
    };

    // Apply the token to the request headers
    tokenPromise().then(() => {
      client.applyAuthToRequest = function (request) {
        const _end = request._end;
        request._end = function () {
          request.req.setHeader("Finicity-App-Key", APP_KEY);
          request.req.setHeader("Finicity-App-Token", token);
          _end.call(request);
        };
        return request;
      };
      resolve(client);
    });
  });
};

export default createClient;
