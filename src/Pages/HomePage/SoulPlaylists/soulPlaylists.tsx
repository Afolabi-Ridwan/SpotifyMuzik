import React, { useEffect, useState, useRef } from "react";
import "../NewReleases/newReleases.css";
import { getToken } from "../../../Services/Api/getToken";
import { getPlaylistsByGenre } from "../../../Services/Api/r&bAPI";
import Slider from "react-slick";
import { settings } from "../../../Providers/sliderSetting";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { playlistsProps } from "../../types";

const SoulPlaylists: React.FC<playlistsProps> = ({ barsToggleState }) => {
  const [soulPlaylists, setSoulPlaylists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const accessToken = await getToken();
        const soul = await getPlaylistsByGenre(accessToken, "Soul");
        setSoulPlaylists(soul);

        // console.log(soul);
      } catch (err) {
        setError("Failed to fetch playlists");
      }
    };

    fetchPlaylists();
  }, []);

  const soulSliderRef = useRef<Slider>(null);

  const filteredPlaylists = soulPlaylists.filter((playlists) => {
    let newPlaylists;
    if (playlists.images[0]) {
      newPlaylists = playlists;
    }
    return newPlaylists;
  });

  console.log(filteredPlaylists);

  return (
    <div
      className={`container soulPlaylistsContainer`}
    >
      {error && <p>{error}</p>}

      <h1>Soul Playlists</h1>

      <div className="navArrow">
        <button
          onClick={() => soulSliderRef.current?.slickPrev()}
          className="leftArrow"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => soulSliderRef.current?.slickNext()}
          className="rightArrow"
        >
          <FaChevronRight />
        </button>
      </div>

      <ul>
        <Slider ref={soulSliderRef} {...settings}>
          {filteredPlaylists.map((playlist: any) => (
            <li key={playlist.id}>
              <img src={playlist.images[0]?.url} alt={playlist.name} />
              <p>{playlist.name}</p>
            </li>
          ))}
        </Slider>
      </ul>
    </div>
  );
};

export default SoulPlaylists;
