import { searchContext } from "../Context/searchResultContext";
import { getToken } from "./getToken";

export const search = async (searchInput) => {

   const updateData = searchContext.getState().updateData

  const accessToken = await getToken();

  console.log(accessToken)

  try {

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchInput
      )}&type=album,artist,track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    updateData(data);
  } catch (error) {
    console.error("Error searching Spotify:", error);
  };
};