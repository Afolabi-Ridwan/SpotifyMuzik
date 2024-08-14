import axios from 'axios';
import { getToken } from './getToken';


export const getAlbums = async (accessToken: string, artistId: string): Promise<any> => {
  const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    params: {
      include_groups: 'album',
      limit: 10,
    },
  });

  return response.data.items;
};

export const searchArtist = async (accessToken: string, artistName: string): Promise<any> => {
  const response = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    params: {
      q: artistName,
      type: 'artist',
      limit: 1,
    },
  });

  return response.data.artists.items[0];
};
