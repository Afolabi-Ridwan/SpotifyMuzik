import React, { useEffect, useState } from "react";
import {
  getNewReleases,
} from "../../../Services/Api/newReleasesAPI";
import style from "./newReleases.module.css";
import { Album, errorProps } from "../../types";
import MobileView from "./MobileView/mobileView";
import DesktopView from "./DesktopView/desktopView";

const NewReleases: React.FC<errorProps> = ({ errorState, errorHandler }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState(false);


  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const data = await getNewReleases();

        setAlbums(data.albums.items);

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

  if (typeof errorState === "string") {
    return <p style={{ color: "white", textAlign: "center" }}>{errorState}</p>;
  }

  return (
    <div className={`${style.containers} ${style.newReleases} `}>
      <h1 style={{ color: "white" }}>New Releases</h1>
      {loadingState ? (
        <div>
          <div>
            {isMobileView ? (
              <MobileView albums={albums}/>
            ) : (
              <div>
                <DesktopView albums={albums}/>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={style.spinnerCont}></div>
      )}
    </div>
  );
};

export default NewReleases;
