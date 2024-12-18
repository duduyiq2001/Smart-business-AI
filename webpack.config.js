//webpack.config.js

//1. Read environment variables from our .env file
import dotenv from "dotenv";
dotenv.config();

//2. List environment variables you'll use
// The keys listed here are the ones that will
// be replaced by their actual value in the code.
// Also, their presence will be validated, so that
// if they're undefined webpack will complain and
// refuse to proceed with compilation
const environmentVariables = [
    "PARTNER_ID",
    "APP_KEY",
    "PARTNER_SECRET",
    "ACCESS_TOKEN",
    "CUSTOMER_ID",
    "OPENAI_API_KEY"
];

//...
//3. Use Webpack's EnvironmentPlugin
plugins: [
//...
  new webpack.EnvironmentPlugin(environmentVariables)
//...
]//...