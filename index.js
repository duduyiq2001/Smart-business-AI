import OpenBanking from "open_banking";
import { createClient } from "./api/createclient";

let OpenAPIClient = OpenBanking.ApiClient.instance;

createClient(OpenAPIClient);
