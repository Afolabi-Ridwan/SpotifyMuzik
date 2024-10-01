import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import style from "../../NewReleases/newReleases.module.css";
import { useRef } from "react";
import Slider from "react-slick";
import { settings } from "../../../../Providers/sliderSetting";
import { desktopView } from "../../../types";

const DesktopView: React.FC<desktopView> = ({ albums }) => {
  const sliderRef = useRef<Slider>(null);

  return (
    <div>
      <div className={"navArrow"}>
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className={"leftArrow"}
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className={"rightArrow"}
        >
          <FaChevronRight />
        </button>
      </div>

      <ul>
        <Slider ref={sliderRef} {...settings}>
          {albums.map((playlist) => (
            <li key={playlist.id}>
              <div className={style.imageCont}>
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

export default DesktopView;
