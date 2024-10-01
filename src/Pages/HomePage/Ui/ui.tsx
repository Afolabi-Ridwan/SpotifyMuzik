import "./ui.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import NewReleases from "../NewReleases/newReleases";
import { settings } from "../../../Providers/sliderSetting";
import Navbar from "../../../Components/Navbar/navbar";
import TopMobileMenu from "../../../Components/Menu/topMenu";
import SearchResult from "../SearchResult/searchResult";

import { UiProps } from "../../types";
import PartyPlaylists from "../PartyPlaylists/partyPlaylists";
import RandB from "../RandBPlaylists/randb";
import SoulPlaylists from "../SoulPlaylists/soulPlaylists";
import { BarsToggleContext } from "../../../Services/Context/barsToggleContext";
import firstImage from "../../../Assets/Images/unnamed (1).jpg";
import BackgroundStyle from "./BackgroundStyle/backgroundStyle";


const Ui: React.FC<UiProps> = ({ resultHandler, errorState, errorHandler }) => {
  const sliderRef = useRef<Slider>(null);

  const topTenResults =
    resultHandler?.length > 1 &&
    resultHandler?.filter((each: any, index: any) => index < 10 && each);

  const [albums, setAlbums] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [artistName, setArtistName] = useState<string>("");
  const [searchState, setSearchState] = useState<boolean | null>(null);
  const [randomNumber, updateRandomNumber] = useState<number | null>(null);

  useEffect(() => {
    const randomNumberHandler = () => {
      updateRandomNumber(Math.floor(Math.random() * 5));
    };
    console.log(randomNumber);
    randomNumberHandler();
  }, [randomNumber]);

  const { barsToggleState } = useContext(BarsToggleContext);
  return (
    <BackgroundStyle>
      <div id="homePageUi">
        <div className="navBarAndMenu">
         
        </div>

        <div className={`pagesCont ${barsToggleState && "biggerContainer"}`}>
          {resultHandler?.length > 1 ? (
            <div>
              <div className="navArrow">
                <button
                  onClick={() => sliderRef.current?.slickPrev()}
                  className="leftArrow"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={() => sliderRef.current?.slickNext()}
                  className="rightArrow"
                >
                  <FaChevronRight />
                </button>
              </div>

              <div className="sliderCont">
                <Slider ref={sliderRef} {...settings}>
                  {topTenResults.map((eachResult: any) => (
                    <div key={eachResult.trackMetadata.displayImageUri}>
                      <img
                        className="images"
                        src={eachResult.trackMetadata.displayImageUri}
                        alt="thumbnail"
                      />
                      <h3 style={{ color: "white", textAlign: "center" }}>
                        {" "}
                        {eachResult.trackMetadata.trackName}
                      </h3>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          ) : (
            <div
              className={`allPlaylists ${barsToggleState && "biggerContainer"}`}
            >
              <NewReleases
                errorState={errorState}
                errorHandler={errorHandler}
              />
              <PartyPlaylists />
              <RandB />
              <SoulPlaylists />
              {!searchState ? (
                <div></div>
              ) : (
                <SearchResult
                  albums={albums}
                  error={error}
                  artistName={artistName}
                />
              )}
            </div>
          )}
        </div>
      </div>
      </BackgroundStyle>
  );
};

export default Ui;
