import {
  FaBars,
  FaChevronUp,
  FaCompass,
  FaFileAudio,
  FaHouseUser,
  FaPlay,
  FaPlus,
} from "react-icons/fa";
import "./navbar.css";
import { Link } from "react-router-dom";
import { NavbarTypes } from "../types";


const Navbar: React.FC<NavbarTypes> = ({ searchStateHandler, setArtistName, barsToggleState, setBarsToggleState }) => {
  const returnHome = () => {
    searchStateHandler(false);
    setArtistName("");
  };

  const barsToggleHandler = () => {
    setBarsToggleState(prev => !prev);    
  };

  return (
    <div className={` navbar ${barsToggleState && "smallerNavbar"}`}>
      <div id="container">
        <div className="header">
          <p>
            {" "}
            <span
              style={{ cursor: "pointer", fontSize: "23px" }}
              onClick={barsToggleHandler}
            >
              <FaBars />
            </span>{" "}
            <span>Spotify Muzik</span>
          </p>
        </div>
        <div id="menu">
          <div id="lists">
            <Link to={"/home"} className="linkTag">
              <p
                onClick={returnHome}
              >
                {" "}
                <span>
                  <FaHouseUser />
                </span>{" "}
                <span>Home</span>
              </p>
            </Link>

            <p>
              {" "}
              <span>
                <FaCompass />
              </span>{" "}
              <span>Explore</span>
            </p>
            <p>
              {" "}
              <span>
                <FaFileAudio />
              </span>{" "}
              <span>Library</span>
            </p>
            <p>
              {" "}
              <span>
                <FaChevronUp />
              </span>{" "}
              <span>Upgrade</span>
            </p>
          </div>
        </div>

        <div id="userInfos">
          <button>
            {" "}
            <span>
              <FaPlus className="plusSign" />
            </span>{" "}
            New Playlist{" "}
          </button>
          <ul>
            <li>
              <div>
                <p> Liked Music</p>
                <p> Auto Playlist </p>
              </div>
              <div className="playIcon">
                <FaPlay />
              </div>
            </li>
            <li>
              <div>
                <p>Episodes for Later </p>
                <p> Auto playlist</p>
              </div>
              <div className="playIcon">
                <FaPlay />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
