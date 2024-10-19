import ApiClient from "./clientapi/src/index.js";
import { createClient } from "./api/createclient.js";

let OpenAPIClient = ApiClient();

createClient(OpenAPIClient);
