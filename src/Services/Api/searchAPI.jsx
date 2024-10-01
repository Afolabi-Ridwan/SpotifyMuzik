export const search = async (searchInput) => {
  // const title = "runtown";

  

  const url = `https://spotify81.p.rapidapi.com/search?q=${searchInput}%20&type=multi&offset=0&limit=10&numberOfTopResults=5`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "dee71d3e21msh8230662239558b1p141942jsn143f3e60756f",
      "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
    },
  };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error(error);
    }
};
