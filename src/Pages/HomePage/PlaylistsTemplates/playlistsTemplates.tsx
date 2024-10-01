import React, { useEffect, useState } from "react";
import { playlistsProps } from "../../types";
import MobileView from "./MobileView/mobileView";
import DesktopView from "./DesktopView/desktopView";

const PlaylistsTemplates: React.FC<playlistsProps> = ({
  title,
  error,
  albums,
}) => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);


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
    <div>
      {error && <p>{error}</p>}

      <h1>{title}</h1>

      <div>
        {isMobileView ? (
          <MobileView albums={albums} />
        ) : (
          <DesktopView albums={albums} />
        )}
      </div>
    </div>
  );
};

export default PlaylistsTemplates;
