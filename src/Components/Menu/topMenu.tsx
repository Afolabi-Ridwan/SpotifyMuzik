import { useEffect, useState } from "react";
import style from "./topMenu.module.css";
import { FaArrowLeft, FaBars, FaSearch, FaTrash } from "react-icons/fa";
import repeatIcon from "../../Assets/Images/repeat.JPG";
import { BarsToggleContext } from "../../Services/Context/barsToggleContext";
import { useContext } from "react";
import logoImg from "../../Assets/Images/human-face-with-music-note-design-3d-rendered-illustration.png";
import { search } from "../../Services/Api/searchAPI";
import { useNavigate } from "react-router";

interface propType {
  searchStateHandler: React.Dispatch<React.SetStateAction<boolean>>
}

const TopMobileMenu: React.FC<propType> = ({ searchStateHandler}) => {
  const [inputState, setInputState] = useState(false);
  const [input, setInput] = useState("");
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

  const setInputHandler = (e: any) => {
    setInput(e.target.value);
  };

  const navigate = useNavigate();

  const submitHandler = async(e: any) => {
    e.preventDefault();    

    searchStateHandler(true);

    await search(input);

    searchStateHandler(false);
      
    navigate(`/searchResult/${input}`);
  };

  return (
    <div className={`${style.topMobileMenu}  ${scrollState && style.scrolled}`}>
      <div id={style.title}>
        <div style={{ cursor: "pointer" }}>
          <FaBars onClick={barsToggleHandler} />
        </div>
        <img src={logoImg} alt="logo" />
      </div>

      <div className={`${style.inputTab} ${inputState && style.openInput} `}>
        <div
          className={`${style.inputCont} ${
            barsToggleState && style.smallerNavbar
          }`}
        >
          <form className={style.input} onSubmit={(e) => submitHandler(e)}>
            <input
              placeholder="Search songs, albums, artists, podcasts"
              onChange={(e: any) => setInputHandler(e)}
            />

            <div
              className={style.backwardIcon}
              onClick={closeSearchBox}
              style={{ color: "white" }}
            >
              <FaArrowLeft />
            </div>
          </form>

          <div className={style.previousSearches}>
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

          <div className={`${style.menu} ${style.desktopViewMenu}`}>
            <div className={style.searchIcon} onClick={searchBoxHandler}></div>
            <p className={style.user}>A</p>
          </div>
        </div>
      </div>

      <div className={`${style.menu} ${style.mobileViewMenu}`}>
        <div className={style.searchIcon} onClick={searchBoxHandler}>
          <FaSearch />
        </div>
        <p className={style.user}>A</p>
      </div>
    </div>
  );
};

export default TopMobileMenu;
