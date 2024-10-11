import axios from "axios";
import { getToken } from "./getToken";
export const getPlaylists = async (): Promise<any> => {

  const accessToken = await getToken();

  const response = await axios.get(
    `https://api.spotify.com/v1/browse/categories/party/playlists`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 15,
      },
    }
  );

  return response.data.playlists.items;
};
