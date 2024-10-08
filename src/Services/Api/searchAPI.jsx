import { useContext } from "react";
import { searchContext } from "../Context/searchResult";


// export const search = async (searchInput) => {
//   const updateSearchResult = searchContext.getState().updateData;

//   const url = `https://spotify81.p.rapidapi.com/search?q=${searchInput}%20&type=multi&offset=0&limit=10&numberOfTopResults=5`;
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "b61dba098f1f48549e6df0e7bb9f9162e",
//       "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);

//     if (response.status === 429) {
//       const retryAfter = response.headers.get('Retry-After');
//       const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : 3000; // fallback delay
//       console.log(`Rate limit exceeded. Retrying in ${delay}ms.`);
//       setTimeout(() => search(searchInput), delay);
//       return;
//     }

//     const result = await response.json();
//     updateSearchResult(result);
//   } catch (error) {
//     console.error(error);
//   }
// };


export const search = async (searchInput) => {

  const updateSearchResult = searchContext.getState().updateData;

  const url = `https://spotify23.p.rapidapi.com/${searchInput}/?type=multi&offset=0&limit=10&numberOfTopResults=5`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5a2c72a23fmsh088a214a72b0468p10025djsn747b68f13e75",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      updateSearchResult(result);
    } 
    catch (error) {
      console.error(error);
    }
};

