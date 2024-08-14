import axios from 'axios';


export const getPlaylistsByGenre = async (accessToken: string, genre: string): Promise<any> => {
  const response = await axios.get(`https://api.spotify.com/v1/search`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    params: {
      q: genre,
      type: 'playlist',
      limit: 10,
    },
  });

  return response.data.playlists.items;
};
