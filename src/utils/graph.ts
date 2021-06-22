import graph from "@microsoft/microsoft-graph-client";
import { User } from "@microsoft/microsoft-graph-types";

const getAuthenticatedClient = (accessToken: string) => {
  const client = graph.Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
  return client;
};

export const getUserDetails = async (accessToken: string) => {
  const client = getAuthenticatedClient(accessToken);
  const user: User = await client.api("/me").get();
  return user;
};
