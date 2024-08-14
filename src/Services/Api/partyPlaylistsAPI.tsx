import axios from "axios";

export const getPlaylists = async (accessToken: string): Promise<any> => {
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
