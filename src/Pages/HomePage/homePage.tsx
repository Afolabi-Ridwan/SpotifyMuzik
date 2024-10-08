import "./homePage.css";
import Trending from "../../Services/Api/trendingAPI";
import {  useContext, useState } from "react";
import Spinner from "../../Components/Spinner/spinner";
import Ui from "./Ui/ui";


interface propType {
  searchState: boolean,
}

const Homepage: React.FC<propType> = ({searchState}) => {
  const [result, updateResult] = useState<any>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [delayUIState, setDelayUIState] = useState<boolean>(true);



  if (typeof errorMessage === "string") {
    <div id="homepage">
      return <h1>Please check your internet connection and reload! </h1>
    </div>;
  }



  return (
    <div>
      <Trending
        loadingState={loadingState}
        errorMessageHandler={setErrorMessage}
        setLoadingHandler={setLoadingState}
        updateResultHandler={updateResult}
      />

      {!loadingState ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className={`homepage ${delayUIState && "display"}`}>
          <Ui
            resultHandler={result}
            errorState={error}
            errorHandler={setError}
            searchState={searchState}
          />
        </div>
      )}
    </div>
  );
};

export default Homepage;
