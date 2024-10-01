import { mobileView } from "../../../types";
import { Link } from "react-router-dom";
import style from "../../NewReleases/newReleases.module.css"

const MobileView: React.FC<mobileView> = ({albums}) => {
  return (
    <div>
      <ul className={style.scrollableList}>
                {albums.map((album, index) => (
                  <Link
                  className="linkTag"
                  key={album.id}
                  to={`/newReleasesRoutesPage/${encodeURIComponent(JSON.stringify(album))}`}
                >
                  <li
                    key={index}
                    className={style.scrollableItem}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={style.imageCont}>
                      <img src={album.images[0].url} alt={album.name} />
                    </div>
                    <p>{album.name}</p>
                    <p></p>
                    <p id={style.typeAndArtiste}>
                      {album.album_type} ◾{" "}
                      {album.artists.map((artist: any) => artist.name).join(", ")}
                    </p>
                  </li>
                  </Link>
                ))}
              </ul>
    </div>
  )
}

export default MobileView
