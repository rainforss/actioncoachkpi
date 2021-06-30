import fetch, { RequestInfo, RequestInit } from "node-fetch";

interface NodeError extends Error {
  response: object;
  data: object;
}

export default async function fetcher(
  url: RequestInfo,
  init?: RequestInit | undefined
) {
  try {
    const response = await fetch(url, init);
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(response.statusText) as NodeError;
    error.response = response;
    error.data = data;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}
