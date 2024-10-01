import {
  FaChevronUp,
  FaCompass,
  FaFileAudio,
  FaHouseUser,
  FaPlay,
  FaPlus,
  FaTimes
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { NavbarTypes } from "../types";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { BarsToggleContext } from "../../Services/Context/barsToggleContext";
import logoImg from "../../Assets/Images/human-face-with-music-note-design-3d-rendered-illustration.png"
import style from "./navbar.module.css"

const Navbar: React.FC<NavbarTypes> = ({ searchStateHandler, setArtistName}) => {
  const returnHome = () => {
    searchStateHandler && searchStateHandler(false);
    setArtistName && setArtistName("");
  };

  const {setBarsToggleState} = useContext(BarsToggleContext);

  const barsToggleHandler = () => {
    setBarsToggleState(false)
  };

  const [scrollState, setScrollState] = useState(false);

  const {barsToggleState} = useContext(BarsToggleContext);

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
    <div className={` ${style.navbar} ${barsToggleState && style.active}  ${barsToggleState && style.smallerNavbar}  ${scrollState && style.scrolled}`}>
      <div className={`${style.container} ${scrollState && style.scrolled}`}>
        <div className={style.header}>
          <p>
            {" "}
            <span
              style={{ cursor: "pointer", fontSize: "23px", padding: "0", fontWeight: "100"}}
              onClick={barsToggleHandler}
            >
              <FaTimes />
            </span>{" "}
            <span>
              <img src={logoImg} alt="logo" id={style.logo}/>
            </span>
          </p>
        </div>
        <div id={style.menu}>
          <div id={style.lists}>
            <Link to={"/"} className={"linkTag"}>
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

        <div id={style.userInfos}>
          <button>
            {" "}
            <span>
              <FaPlus className={style.plusSign} />
            </span>{" "}
            New Playlist{" "}
          </button>
          <ul>
            <li>
              <div>
                <p> Liked Music</p>
                <p> Auto Playlist </p>
              </div>
              <div className={style.playIcon}>
                <FaPlay />
              </div>
            </li>
            <li>
              <div>
                <p>Episodes for Later </p>
                <p> Auto playlist</p>
              </div>
              <div className={style.playIcon}>
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

