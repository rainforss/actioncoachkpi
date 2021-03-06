import * as msal from "@azure/msal-node";
import dotenv from "dotenv";
import express from "express";
import usersRoute from "./routes/api/users";
import kpisRoute from "./routes/api/kpiEntries";
import { verifyUser } from "./utils/verifyUser";
import { getToken } from "./utils/tokenRequest";
import cors from "cors";

//Initialize environment variables and MSAL instance before running the main thread
dotenv.config();

const msalConfig: msal.Configuration = {
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

export const cca = new msal.ConfidentialClientApplication(msalConfig);

//Main thread
const main = async () => {
  //Start the express app and use json middleware
  const app = express();
  app.use(express.json());
  app.use(cors());

  //Get access tokens upon server start and periodically get tokens before previous ones expire.
  getToken(app);
  setInterval(() => getToken(app), 1000 * 60 * 60);

  //Use this middleware to ensure that user logged into front end is a user under Action Coach
  app.use(verifyUser);

  app.use("/api/users", usersRoute);

  app.use("/api/kpientries", kpisRoute);

  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server started at port ${process.env.PORT || 5000}.`)
  );
};

main().catch((error) => console.log(error));
