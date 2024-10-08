import "./App.css";
import Loader from "./Pages/LoaderPage/loaderPage";
import { useState, useEffect } from "react";
import Homepage from "./Pages/HomePage/homePage";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import TopMobileMenu from "./Components/Menu/topMenu";
import Explore from "./Pages/Explore/explore";
import { useLocation } from "react-router-dom";
import Context from "./Services/Context/createContext";
// import MyContext from "./Providers/usecontext";
import { BarsToggleContext } from "./Services/Context/barsToggleContext";
import NewReleasesRoutesPage from "./Pages/OtherPages/NewReleasesRoutesPage/newReleasesRoutesPage";
import Navbar from "./Components/Navbar/navbar";
import SearchResult from "./Pages/HomePage/SearchResult/searchResult";

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [barsToggleState, setBarsToggleState] = useState(false);
  const [searchState, setSearchState] = useState(false)

  const location = useLocation();

  useEffect(() => {
    if (!hasLoadedOnce) {
      setTimeout(() => {
        setShowLoader(false);
        setHasLoadedOnce(true);
      }, 3000);
    } else {
      setShowLoader(false);
    }
  }, [hasLoadedOnce]);

  useEffect(() => {
    if (location.pathname === "/") {
      if (hasLoadedOnce) {
        setShowLoader(false);
      }
    }
  }, [location, hasLoadedOnce]);



  return (
    <BarsToggleContext.Provider value={{ barsToggleState, setBarsToggleState }}>
      <div className="App">
        {!showLoader && (
          <div>
            <TopMobileMenu  searchStateHandler={setSearchState} />
            <div className="navBarAndMenu">
              <Navbar />
            </div>
          </div>
        )}
        {showLoader ? (
          <Loader />
        ) : (
              <Routes>
                <Route path="/" element={<Homepage searchState={searchState}/>} />
                <Route path="/home" element={<Explore />} />
                <Route
                  path="/newReleasesRoutesPage/:album"
                  element={<NewReleasesRoutesPage />}
                />
                <Route path="/searchResult/:input" element={<SearchResult />} />
              </Routes>
        )}
      </div>
    </BarsToggleContext.Provider>
  );
}

export default App;
