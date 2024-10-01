import React from 'react'
import { desktopView } from '../../../types'
import Slider from 'react-slick';
import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { settings } from '../../../../Providers/sliderSetting';
import { Link } from 'react-router-dom';
import style from "../newReleases.module.css"



const DesktopView: React.FC<desktopView> = ({albums}) => {


  const sliderRef = useRef<Slider>(null);

  return (
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
                          <div className={style.imageCont}>
                            <img
                              src={album.images[0].url}
                              alt={album.name}
                              width={100}
                            />
                          </div>
                          <p className={style.albumName}>{album.name}</p>
                          <p></p>
                          <p id={style.typeAndArtiste}>
                            {album.album_type} ◾{" "}
                            {album.artists
                              .map((artist: any) => artist.name)
                              .join(", ")}
                          </p>
                        </li>
                      </Link>
                    ))}
                  </Slider>
                </ul>
    </div>
  )
}

export default DesktopView
