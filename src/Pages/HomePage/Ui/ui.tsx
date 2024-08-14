import "./ui.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Menu } from "../../../Components/Menu/menu";
import { useRef, useState } from "react";
import NewReleases from "../NewReleases/newReleases";
import { settings } from "../../../Providers/sliderSetting";
import Navbar from "../../../Components/Navbar/navbar";
import TopMobileMenu from "../../../Components/Menu/TopMobileMenu/topMobileMenu";
import SearchResult from "../SearchResult/searchResult";

import { UiProps } from "../../types";
import PartyPlaylists from "../PartyPlaylists/partyPlaylists";
import RandB from "../RandBPlaylists/randb";
import SoulPlaylists from "../SoulPlaylists/soulPlaylists";

const Ui: React.FC<UiProps> = ({ resultHandler, errorState, errorHandler }) => {
  const sliderRef = useRef<Slider>(null);

  const topTenResults =
    resultHandler?.length > 1 &&
    resultHandler?.filter((each: any, index: any) => index < 10 && each);
  console.log(topTenResults);

  const [albums, setAlbums] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [artistName, setArtistName] = useState<string>("");
  const [searchState, setSearchState] = useState<boolean | null>(null);
  const [barsToggleState, setBarsToggleState] = useState(false);

  return (
    <div id="homePageUi">
      <div>
        <div>
          <Navbar
            searchStateHandler={setSearchState}
            setArtistName={setArtistName}
            barsToggleState={barsToggleState}
            setBarsToggleState={setBarsToggleState}
          />
          <TopMobileMenu />
        </div>
        <div className={`container ${barsToggleState && "biggerContainer"}`}>
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
            <div className={`pagesCont ${barsToggleState && "biggerContainer"}`}>
              {!searchState ? (
                <div >
                  <Menu
                    setErrorHandler={setError}
                    setAlbumsHandler={setAlbums}
                    setArtistName={setArtistName}
                    artistName={artistName}
                    setSearchState={setSearchState}
                    searchState={searchState}
                  />
                  <NewReleases
                    errorState={errorState}
                    errorHandler={errorHandler}
                    barsToggleState={barsToggleState}
                  />
                  <PartyPlaylists barsToggleState={barsToggleState} />
                  <RandB barsToggleState={barsToggleState} />
                  <SoulPlaylists barsToggleState={barsToggleState} />
                </div>
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
    </div>
  );
};

export default Ui;
