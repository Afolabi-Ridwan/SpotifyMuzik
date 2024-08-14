import { useEffect, useRef, useState } from "react";
import "./topMobileMenu.css";
import {
  FaBars,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import repeatIcon from "../../../Assets/Images/repeat.JPG";
import backwardIcon from "../../../Assets/Images/back.JPG";

const TopMobileMenu = () => {
  const [inputState, setInputState] = useState(false);

  const searchBoxHandler = () => {
    setInputState(true);
  };
 
  // i was on my way to the club last nigh when i saw that she wasnt going through anything 
  const closeSearchBox = () => {
    setInputState(false);
  };


  return (
    <div id="topMobileMenu">
      <div id="title">
        <FaBars />
        <p> Spotify Muzik</p>
      </div>

      <div className={`inputTab ${inputState && "openInput"}`}>
        <div className="input">
          <input placeholder="Search songs, albums, artists, podcasts" />

          <div className="backwardIcon" onClick={closeSearchBox}>
            <img src={backwardIcon} alt="backward" />
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
      </div>

      <div className="menu">
        <div className="searchIcon" onClick={searchBoxHandler}>
          <FaSearch />
        </div>

        <p className="user">A</p>
      </div>
    </div>
  );
};

export default TopMobileMenu;
