import axios from "axios";
import { getToken } from "./getToken";

const newReleasesUrl = "https://api.spotify.com/v1/browse/new-releases";
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

export const getNewReleases = async (): Promise<NewReleasesResponse> => {
  const accessToken = await getToken();

  const response = await axios.get<NewReleasesResponse>(newReleasesUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const getAlbumTracklists = async (id: string | undefined, updateTrackLists: any) => {

  const accessToken = await getToken();


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