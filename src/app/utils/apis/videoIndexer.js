import axios from "axios";
import { v4 } from "uuid";
var apiUrl = "https://api.videoindexer.ai";
var apiKey = process.env.AZURE_INDEXER_API_KEY;
var accountId = process.env.AZURE_INDEXER_ACCOUNTID;
var accountLocation = "trial";

export function createQueryString(parameters) {
  const searchParams = new URLSearchParams(parameters);
  return searchParams.toString();
}

export async function getAccessToken() {
  const queryParams = createQueryString({
    allowEdit: "true",
  });

  const getAccountsRequest = await axios.get(
    `${apiUrl}/auth/${accountLocation}/Accounts/${accountId}/AccessToken?${queryParams}`,
    {
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
        "x-ms-client-request-id": v4(),
      },
    }
  );

  const accessToken = getAccountsRequest.data.trim('"');
  return accessToken;
}

export const uploadVideo = async (accessToken, videoUrl, name) => {
  const queryParams = createQueryString({
    name,
    videoUrl: videoUrl,
  });

  const { data } = await axios.post(
    `${apiUrl}/${accountLocation}/Accounts/${accountId}/Videos?${queryParams}`,
    null,
    {
      headers: {
        "x-ms-client-request-id": v4(),
        Authorization: `Bearer ${accessToken}`,
        "Ocp-Apim-Subscription-Key": apiKey,
      },
    }
  );

  return data;
};

export const analyzeVideo = async (accessToken, videoId) => {
  const queryParams = createQueryString({
    language: "English",
  });

  const { data } = await axios.get(
    `${apiUrl}/${accountLocation}/Accounts/${accountId}/Videos/${videoId}/Index?${queryParams}`,
    {
      headers: {
        "x-ms-client-request-id": v4(),
        Authorization: `Bearer ${accessToken}`,
        "Ocp-Apim-Subscription-Key": apiKey,
      },
    }
  );

  return data;
};
