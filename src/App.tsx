import "./App.css";
import Loader from "./Pages/LoaderPage/loaderPage";
import { useState, useEffect } from "react";
import Homepage from "./Pages/HomePage/homePage";
import { Routes, Route } from "react-router-dom";
import Ui from "./Pages/HomePage/Ui/ui";

function App() {
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingState(false);
    }, 3000);
  }, []);

  return (
    <div className="App">
      {loadingState ? <Loader /> : <Homepage />}

      <Routes>
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
