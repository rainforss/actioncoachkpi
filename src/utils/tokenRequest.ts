import * as msal from "@azure/msal-node";
import { cca } from "../index";
import { Express } from "express";

//Graph access token configuration
export const clientCredentialGraphRequest: msal.ClientCredentialRequest = {
  scopes: ["https://graph.microsoft.com/.default"],
  azureRegion: "westus2",
  skipCache: true,
};

//Dynamics CRM access token configuration
export const clientCredentialCrmRequest: msal.ClientCredentialRequest = {
  scopes: ["https://actioncoachsystems.crm.dynamics.com/.default"],
  azureRegion: "westus2",
  skipCache: true,
};

//Function used to obtain both the CRM and Graph access token
export const getToken = async (app: Express) => {
  Promise.all([
    cca.acquireTokenByClientCredential(clientCredentialGraphRequest),
    cca.acquireTokenByClientCredential(clientCredentialCrmRequest),
  ])
    .then((responses) => {
      const [graph, dynamics] = responses;
      app.locals.graphAccessToken = graph?.accessToken;
      app.locals.accessToken = dynamics?.accessToken;
    })
    .catch((err) => console.log(err));
};
