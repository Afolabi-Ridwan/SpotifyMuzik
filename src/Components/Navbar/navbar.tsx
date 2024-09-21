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
import { useEffect, useState } from "react";
import { useContext } from "react";
import { BarsToggleContext } from "../../Services/Context/barsToggleContext";

const Navbar: React.FC<NavbarTypes> = ({ mobileMenuState, searchStateHandler, setArtistName }) => {
  const returnHome = () => {
    searchStateHandler && searchStateHandler(false);
    setArtistName && setArtistName("");
  };

  const {setBarsToggleState} = useContext(BarsToggleContext)
  const barsToggleHandler = () => {
    setBarsToggleState(prev => !prev);    
  };

  const [scrollState, setScrollState] = useState(false);

  const {barsToggleState} = useContext(BarsToggleContext)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrollState(true);
      } else {
        setScrollState(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={` navbar  ${barsToggleState && "smallerNavbar"} ${mobileMenuState && "openMenu"} ${scrollState && "scrolled"}`}>
      <div className={`container ${scrollState && "scrolled"}`}>
        <div className="header">
          <p>
            {" "}
            <span
              style={{ cursor: "pointer", fontSize: "23px", padding: "0",}}
              onClick={barsToggleHandler}
            >
              <FaBars />
            </span>{" "}
            <span>Spotify Muzik</span>
          </p>
        </div>
        <div id="menu">
          <div id="lists">
            <Link to={"/"} className="linkTag">
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

