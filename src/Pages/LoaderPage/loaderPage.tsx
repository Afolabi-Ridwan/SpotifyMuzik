
import "./loaderPage.css";
import logoImg from "../../Assets/Images/human-face-with-music-note-design-3d-rendered-illustration.png"
import { useEffect, useState } from "react";
import UserLocation from "../HomePage/UserLocation/userLocation";
import Context from "../../Services/Context/createContext";


const context = {
  usercountry: "",
  tracks: ""
}

const Loader = () => {
  const [userCountry, setUserCountry] = useState("");
  console.log(userCountry)

  useEffect(() => {
    
    UserLocation(setUserCountry);
  }, [userCountry])

  return (
    <div>
      <Context.Provider value={{...context, userCountry: userCountry}}>      
        <div className="loaderPage">
          <img src={logoImg} alt="logoImage" />
        </div>
        </Context.Provider>
    </div>
  );
};

export default Loader;
