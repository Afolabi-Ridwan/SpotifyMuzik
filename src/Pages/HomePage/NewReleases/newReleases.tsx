import React, { useEffect, useRef, useState } from "react";
import {
  getAlbumTracklists,
  getNewReleases,
} from "../../../Services/Api/newReleasesAPI";
import "./newReleases.css";
import { settings } from "../../../Providers/sliderSetting";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Album, errorProps } from "../../types";
import { Link } from "react-router-dom";

const NewReleases: React.FC<errorProps> = ({ errorState, errorHandler }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const data = await getNewReleases();

        setAlbums(data.albums.items);

        console.log(data);

        setLoadingState(true);
      } catch (err) {
        errorHandler(
          "Failed to fetch new releases. Check your internet connection"
        );
      }
    };

    fetchNewReleases();
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

  console.log(albums);
  if (typeof errorState === "string") {
    return <p style={{ color: "white", textAlign: "center" }}>{errorState}</p>;
  }

  return (
    <div className={`container newReleases `}>
      <h1 style={{ color: "white" }}>New Releases</h1>
      {loadingState ? (
        <div>
          <div>
            {isMobileView ? (
              <ul className="scrollableList">
                {albums.map((album, index) => (
                  <li
                    key={index}
                    className="scrollableItem"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="imageCont">
                      <img src={album.images[0].url} alt={album.name} />
                    </div>
                    <p>{album.name}</p>
                    <p></p>
                    <p id="typeAndArtiste">
                      {album.album_type} ◾{" "}
                      {album.artists.map((artist) => artist.name).join(", ")}
                    </p>
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
                    {albums.map((album, index) => (
                      <Link
                        className="linkTag"
                        key={album.id}
                        to={`/newReleasesRoutesPage/${encodeURIComponent(JSON.stringify(album))}`}
                        style={{ cursor: "pointer" }}
                      >
                        <li key={index}>
                          <div className="imageCont">
                            <img
                              src={album.images[0].url}
                              alt={album.name}
                              width={100}
                            />
                          </div>
                          <p className="albumName">{album.name}</p>
                          <p></p>
                          <p id="typeAndArtiste">
                            {album.album_type} ◾{" "}
                            {album.artists
                              .map((artist) => artist.name)
                              .join(", ")}
                          </p>
                        </li>
                      </Link>
                    ))}
                  </Slider>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="spinnerCont"></div>
      )}
    </div>
  );
};

export default NewReleases;
