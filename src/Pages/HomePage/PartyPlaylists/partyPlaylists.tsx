import React, { useEffect, useState, useRef } from "react";
import "../NewReleases/newReleases.css";
import { getPlaylists } from "../../../Services/Api/partyPlaylistsAPI";
import { getToken } from "../../../Services/Api/getToken";
import { settings } from "../../../Providers/sliderSetting";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { playlistsProps } from "../../types";

const PartyPlaylists: React.FC<playlistsProps> = ({ barsToggleState }) => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  return (

    
    <div
      className={`container partyPlaylistsContainer`}
    >
      <h1>Party Playlists</h1>
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

      {error && <p>{error}</p>}

      <ul>
        <Slider ref={sliderRef} {...settings}>
          {playlists.map((playlist, index) => (
            <li key={index}>
              <div className="imageCont">
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  width={100}
                />
              </div>
              <p>{playlist.name}</p>
            </li>
          ))}
        </Slider>
      </ul>
    </div>
  );
};

export default PartyPlaylists;
