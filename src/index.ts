import * as msal from "@azure/msal-node";

import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { MyContext, verifyUser } from "./utils/verifyUser";

dotenv.config();

const config = {
  auth: {
    clientId: process.env.CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET!,
  },
  system: {
    loggerOptions: {
      loggerCallback(message: any) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

const app = express();

app.use(
  session({
    secret: "csy930614",
    name: "access",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// Create msal application object
app.locals.msalClient = new msal.ConfidentialClientApplication(config);

// With client credentials flows permissions need to be granted in the portal by a tenant administrator.
// The scope is always in the format "<resource>/.default"
const clientCredentialRequest = {
  scopes: ["https://graph.microsoft.com/.default"],
  azureRegion: "westus2",
  skipCache: true,
};

app.get("/token", verifyUser, async ({ req, res }: MyContext) => {
  app.locals.msalClient
    .acquireTokenByClientCredential(clientCredentialRequest)
    .then((response: msal.AuthenticationResult) => {
      console.log("Response: ", response);
      req.session.accessToken = response.accessToken;
    })
    .catch((error: any) => {
      console.log(JSON.stringify(error));
    });
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Server started at port 5000.")
);
