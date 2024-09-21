import axios from "axios";
const clientId = "d37f9d0ea23f45cea993b243e6a5ca0c";
const clientSecret = "d9194e603b6744629c96cca383d8c68f";
const tokenUrl = "https://accounts.spotify.com/api/token";
const newReleasesUrl = "https://api.spotify.com/v1/browse/new-releases";
interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface NewReleasesResponse {
  albums: {
    items: {
      name: string;
      artists: { name: string }[];
      images: { url: string }[];
      release_date: string;
      album_type: string;
      id: string;
    }[];
  };
}

let accessToken = "";

const getAccessToken = async (): Promise<string> => {
  const response = await axios.post<SpotifyTokenResponse>(
    tokenUrl,
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
    }
  );

  accessToken = response.data.access_token;
  return accessToken;
};

export const getNewReleases = async (): Promise<NewReleasesResponse> => {
  if (!accessToken) {
    await getAccessToken();
  }

  const response = await axios.get<NewReleasesResponse>(newReleasesUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const getAlbumTracklists = async (id: string | undefined, updateTrackLists: any) => {

  await getAccessToken();

  fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.items)
      updateTrackLists(data.items);
    });
};