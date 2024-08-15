import React, { useEffect, useState, useRef } from "react";
import "../NewReleases/newReleases.css";
import { getToken } from "../../../Services/Api/getToken";
import { getPlaylistsByGenre } from "../../../Services/Api/r&bAPI";
import Slider from "react-slick";
import { settings } from "../../../Providers/sliderSetting";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { playlistsProps } from "../../types";

const RandB: React.FC<playlistsProps> = ({ barsToggleState }) => {
  const [rbPlaylists, setRbPlaylists] = useState<any[]>([]);
  const [soulPlaylists, setSoulPlaylists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [noImageFilter, setNoImageFilter] = useState<any[]>([]);

    useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const accessToken = await getToken();
        const rb = await getPlaylistsByGenre(accessToken, "R&B");
        const soul = await getPlaylistsByGenre(accessToken, "Soul");
        setRbPlaylists(rb);
        setSoulPlaylists(soul);

        // console.log(rb, soul);
      } catch (err) {
        setError("Failed to fetch playlists");
      }
    };

    fetchPlaylists();
    
  }, []);




  const randbSliderRef = useRef<Slider>(null);

  
    const a = rbPlaylists.filter((playlists) => {
      let newPlaylists
      if (playlists.images[0]) {
  
        newPlaylists = playlists
      }
      return newPlaylists
    });

console.log(a)

  return (
    <div
      className={`container randbContainer`}
    >
      <h1>R&B Playlists</h1>

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

      {error && <p>{error}</p>}
      <ul>
        <Slider ref={randbSliderRef} {...settings}>
          {a.map((playlist) => (
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
  );
};

export default RandB;
