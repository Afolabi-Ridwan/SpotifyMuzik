import React, { useEffect, useState, useRef } from "react";
import "../NewReleases/newReleases.css";
import { getToken } from "../../../Services/Api/getToken";
import { getPlaylistsByGenre } from "../../../Services/Api/r&bAPI";
import Slider from "react-slick";
import { settings } from "../../../Providers/sliderSetting";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RandB = () => {
  const [rbPlaylists, setRbPlaylists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [noImageFilter, setNoImageFilter] = useState<any[]>([]);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const accessToken = await getToken();
        const rb = await getPlaylistsByGenre(accessToken, "R&B");
        setRbPlaylists(rb);
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

  const randbSliderRef = useRef<Slider>(null);

  const filteredPlaylists = rbPlaylists.filter((playlists) => {
    let newPlaylists;
    if (playlists.images[0]) {
      newPlaylists = playlists;
    }
    return newPlaylists;
  });

  return (
    <div className={`container randbContainer`}>
      <h1>R&B Playlists</h1>

      {error && <p>{error}</p>}

      <div>
        {isMobileView ? (
          <ul className="scrollableList">
            {filteredPlaylists.map((playlist, index) => (
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
                onClick={() => randbSliderRef.current?.slickPrev()}
                className="leftArrow"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => randbSliderRef.current?.slickNext()}
                className="rightArrow"
              >
                <FaChevronRight />
              </button>
            </div>

            <ul>
              <Slider ref={randbSliderRef} {...settings}>
                {filteredPlaylists.map((playlist) => (
                  <li key={playlist.id}>
                    <div className="imageCont">
                      <img src={playlist.images[0]?.url} alt={playlist.name} />
                    </div>
                    <p>{playlist.name}</p>
                  </li>
                ))}
              </Slider>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandB;
