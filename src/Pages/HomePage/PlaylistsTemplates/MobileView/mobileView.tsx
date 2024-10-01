import React from 'react'
import { mobileView } from '../../../types';
import style from "../../NewReleases/newReleases.module.css"
const MobileView: React.FC<mobileView> = ({albums}) => {
    
  return (
    <div>
      <ul className={style.scrollableList}>
            {albums.map((playlist, index) => (
              <li key={index} className={style.scrollableItem}>
                <div className={style.imageCont}>
                  <img src={playlist.images[0].url} alt={playlist.name} />
                </div>
                <p>{playlist.name}</p>
              </li>
            ))}
          </ul>
    </div>
  )
}

export default MobileView
