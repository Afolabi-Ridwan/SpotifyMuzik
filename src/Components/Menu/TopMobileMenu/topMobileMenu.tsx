import { useEffect, useRef, useState } from "react";
import "./topMobileMenu.css";
import { FaBars, FaSearch, FaTrash } from "react-icons/fa";
import repeatIcon from "../../../Assets/Images/repeat.JPG";
import backwardIcon from "../../../Assets/Images/back.JPG";
import { BarsToggleContext } from "../../../Services/Context/barsToggleContext";
import { useContext } from "react";
import { topMobileMenuProps } from "../../types";

const TopMobileMenu = () => {
  const [inputState, setInputState] = useState(false);
  const [scrollState, setScrollState] = useState(false);

  const searchBoxHandler = () => {
    setInputState(true);
  };

  const closeSearchBox = () => {
    setInputState(false);
  };

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

  const { setBarsToggleState, barsToggleState } = useContext(BarsToggleContext);

  const barsToggleHandler = () => {
    setBarsToggleState((prev) => !prev);
  };

  return (
    <div className={`topMobileMenu  ${scrollState && "scrolled"}`}>
      <div id="title">
        <div style={{cursor: "pointer"}}>
          <FaBars onClick={barsToggleHandler} />
        </div>
        <p> Spotify Muzik</p>
      </div>

      <div className={`inputTab `}>
        <div className={`in ${barsToggleState && "smallerNavbar"}`}>
          <div className="input">
            <input placeholder="Search songs, albums, artists, podcasts" />

            <div
              className="backwardIcon"
              onClick={closeSearchBox}
              style={{ color: "white" }}
            >
              <FaSearch />
            </div>
          </div>

          <div className="previousSearches">
            <ul>
              <li>
                <div>
                  <img src={repeatIcon} alt="repeatIcon" />
                  <p>Trap Playlists</p>
                </div>
                <div>
                  <FaTrash />
                </div>
              </li>
              <li>
                <div>
                  <img src={repeatIcon} alt="repeatIcon" />
                  <p>Wizkid</p>
                </div>
                <div>
                  <FaTrash />
                </div>
              </li>
              <li>
                <div>
                  <img src={repeatIcon} alt="repeatIcon" />
                  <p>Olamide</p>
                </div>
                <div>
                  <FaTrash />
                </div>
              </li>
            </ul>
          </div>
          <div className="menu">
            <div className="searchIcon" onClick={searchBoxHandler}>
              <FaSearch />
            </div>
            <p className="user">A</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMobileMenu;
