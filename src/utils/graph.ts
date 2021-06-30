import { Client } from "@microsoft/microsoft-graph-client";
import { User } from "@microsoft/microsoft-graph-types";
import "isomorphic-fetch";

const getAuthenticatedClient = (accessToken: string) => {
  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
  return client;
};

export const getUserDetails = async (accessToken: string, userId: string) => {
  const client = getAuthenticatedClient(accessToken);
  try {
    const user: User = await client.api(`/users/${userId}`).get();
    return user;
  } catch (error) {
    throw error;
  }
};
