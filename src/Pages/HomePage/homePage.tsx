import "./homePage.css";
import Trending from "../../Services/Api/trendingAPI";
import { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner/spinner";
import Ui from "./Ui/ui";
import Loader from "../LoaderPage/loaderPage";
import firstImage from "../../Assets/Images/unnamed (1).jpg"


const Homepage = () => {
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
    <div 
    style={{
      // background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 5%, rgba(0, 0, 0, 1) 100%), url(${firstImage}) no-repeat`,
      // backgroundPosition: "center",
      // backgroundSize: "cover",
      // margin: "0",
      // padding: "0",
      // height: "100vh",
    }}
    >
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
        <div className={`homepage ${delayUIState && "display"}`} >
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
