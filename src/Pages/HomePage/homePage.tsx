import "./homePage.css";
import Trending from "../../Services/Api/trendingAPI";
import { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner/spinner";
import Ui from "./Ui/ui";

const Homepage = () => {
  const [result, updateResult] = useState<any>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [delayUIState, setDelayUIState] = useState<boolean>(false);

  if (typeof errorMessage === "string") {
    <div id="homepage">
      return <h1>Please check your internet connection and reload! </h1>
    </div>;
  }

  useEffect(() => {
    setTimeout(() => {
      setDelayUIState(true);
    }, 3000);
  }, []);

  return (
    <div >
      <Trending
        loadingState={loadingState}
        errorMessageHandler={setErrorMessage}
        setLoadingHandler={setLoadingState}
        updateResultHandler={updateResult}
      />

      {!loadingState ? (
        <Spinner />
      ) : (
        <div className={`homepage ${delayUIState && "display"}`}>
          <Ui
            resultHandler={result}
            errorState={error}
            errorHandler={setError}
          />
        </div>
      )}
    </div>
  );
};

export default Homepage;
