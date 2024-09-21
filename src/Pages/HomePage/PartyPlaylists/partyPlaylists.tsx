import React, { useEffect, useState, useRef } from "react";
import "../NewReleases/newReleases.css";
import { getPlaylists } from "../../../Services/Api/partyPlaylistsAPI";
import { getToken } from "../../../Services/Api/getToken";
import { settings } from "../../../Providers/sliderSetting";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PartyPlaylists= () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const accessToken = await getToken();
        const playlists = await getPlaylists(accessToken);
        setPlaylists(playlists);
      } catch (err) {
        setError("Failed to fetch playlists");
      }
    };

    fetchPlaylists();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`container partyPlaylistsContainer`}>
      <h1>Party Playlists</h1>

      {error && <p>{error}</p>}

      <div>
        {isMobileView ? (
          <ul className="scrollableList">
            {playlists.map((playlist, index) => (
              <li key={index} className="scrollableItem">
                <div className="imageCont">
                  <img src={playlist.images[0].url} alt={playlist.name} />
                </div>
                <p>{playlist.name}</p>
              </li>
            ))}
          </ul>
        ) : (
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

            <ul>
              <Slider ref={sliderRef} {...settings}>
                {playlists.map((playlist, index) => (
                  <li key={index}>
                    <div className="imageCont">
                      <img src={playlist.images[0].url} alt={playlist.name} />
                    </div>
                    <p>{playlist.name}</p>
                  </li>
                ))}
              </Slider>
            </ul>
          </div>
        )}
      </div>

      <ul>
        <Slider ref={sliderRef} {...settings}></Slider>
      </ul>
    </div>
  );
};

export default PartyPlaylists;
