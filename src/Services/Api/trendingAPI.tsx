import { useContext, useEffect } from "react";
import { countries } from "../CountryCodes/country";
import Context from "../Context/createContext";
interface TrendingComponent {
  updateResultHandler: (result: object) => void;
  setLoadingHandler: (isLoading: boolean) => void;
  updateErrorState?: (errorState: boolean) => void
  loadingState: boolean;
  errorMessageHandler: React.Dispatch<React.SetStateAction<string | null>>
}

const Trending: React.FC<TrendingComponent> = ({
  updateResultHandler,
  setLoadingHandler,
  errorMessageHandler,
}) => {
  const {userCountry} = useContext(Context)

  const filterCountry = countries?.filter(
    (eachCountry) =>
      userCountry !== null && eachCountry.name.includes(userCountry)
  );

  useEffect(() => {
      const pageLoader = async () => {
        try {
          const filteredCountry = filterCountry.find((eachItem) => eachItem);

          const url =
            await `https://spotify81.p.rapidapi.com/top_200_tracks?country=${
              filteredCountry && "filteredCountry.code"
            }`;

          const options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "dee71d3e21msh8230662239558b1p141942jsn143f3e60756f",
              "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
            },
          };

          const response = await fetch(url, options);
          const result = await response.json();
          setLoadingHandler(true)
          updateResultHandler(result);


          if (!response.ok) {
            throw new Error("Network response was not ok" + response.statusText)

          } 
        } 
        catch (error: any) {
          if(error.message === "Failed to fetch"){
            console.error("No internet connection");
            errorMessageHandler(error.message)
          } else{
            console.log("An Error occurred")
          }
        }
      };

      pageLoader();
  }, []);

  return null;
};

export default Trending;
