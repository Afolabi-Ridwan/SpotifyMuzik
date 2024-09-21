import "./App.css";
import Loader from "./Pages/LoaderPage/loaderPage";
import { useState, useEffect } from "react";
import Homepage from "./Pages/HomePage/homePage";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import TopMobileMenu from "./Components/Menu/TopMobileMenu/topMobileMenu";
import Explore from "./Pages/Explore/explore";
import { useLocation } from "react-router-dom";
import Context from "./Services/Context/createContext";
// import MyContext from "./Providers/usecontext";
import { BarsToggleContext } from "./Services/Context/barsToggleContext";
import NewReleasesRoutesPage from "./Pages/OtherPages/newReleasesRoutesPage";
import Navbar from "./Components/Navbar/navbar";

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [barsToggleState, setBarsToggleState] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!hasLoadedOnce) {
      setTimeout(() => {
        setShowLoader(false);
        setHasLoadedOnce(true);
      }, 2000);
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
            <TopMobileMenu />
            <div className="navBarAndMenu">
              <Navbar />
            </div>
          </div>
        )}
        {showLoader ? (
          <Loader />
        ) : (
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/home" element={<Explore />} />
                <Route
                  path="/newReleasesRoutesPage/:album"
                  element={<NewReleasesRoutesPage />}
                />
              </Routes>
        )}
      </div>
    </BarsToggleContext.Provider>
  );
}

export default App;
