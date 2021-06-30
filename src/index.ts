import * as msal from "@azure/msal-node";
import dotenv from "dotenv";
import express from "express";
import tokenRoute from "./routes/api/token";
import regionsRoute from "./routes/api/regions";
import { verifyUser } from "./utils/verifyUser";

//Load environment variables
dotenv.config();

const app = express();

app.use(express.json());

const msalConfig: msal.Configuration = {
  auth: {
    clientId: process.env.CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET!,
  },
  system: {
    loggerOptions: {
      loggerCallback(message) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

//Instantiate MSAL instance for client credential OAuth flow.
export const cca = new msal.ConfidentialClientApplication(msalConfig);

//Graph access token configuration
const clientCredentialGraphRequest: msal.ClientCredentialRequest = {
  scopes: ["https://graph.microsoft.com/.default"],
  azureRegion: "westus2",
  skipCache: true,
};

//Dynamics CRM access token configuration
const clientCredentialCrmRequest: msal.ClientCredentialRequest = {
  scopes: ["https://actioncoachsystems.crm.dynamics.com/.default"],
  azureRegion: "westus2",
  skipCache: true,
};

//Function used to obtain both the CRM and Graph access token
const getToken = async () => {
  Promise.all([
    cca.acquireTokenByClientCredential(clientCredentialGraphRequest),
    cca.acquireTokenByClientCredential(clientCredentialCrmRequest),
  ])
    .then((responses) => {
      console.log(responses);
      const [graph, dynamics] = responses;
      app.locals.graphAccessToken = graph?.accessToken;
      app.locals.accessToken = dynamics?.accessToken;
    })
    .catch((err) => console.log(err));
};

//Get access tokens upon server start and periodically get tokens before previous ones expire.
getToken();
setInterval(() => getToken(), 1000 * 60 * 60);

//Use this middleware to ensure that user logged into front end is a user under Action Coach
app.use(verifyUser);

app.use("/api/token", tokenRoute);

app.use("/api/regions", regionsRoute);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server started at port 5000.")
);
