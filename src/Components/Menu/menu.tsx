import "./menu.css";
import { searchArtist, getAlbums } from "../../Services/Api/getArtistesID";
import { getToken } from "../../Services/Api/getToken";
import backwardIcon from "../../Assets/Images/back.JPG";
import { MenuTypes } from "../types";

export const Menu: React.FC<MenuTypes> = ({
  setErrorHandler,
  setAlbumsHandler,
  setArtistName,
  artistName,
  setSearchState,
}) => {
  const handleSearch = async (e: any) => {
    e.preventDefault();
    console.log(artistName);
    try {
      const accessToken = await getToken();
      const artist = await searchArtist(accessToken, artistName);
      if (!artist) {
        setErrorHandler("Artist not found");
        setAlbumsHandler([]);
        return;
      }
      const albums = await getAlbums(accessToken, artist.id);
      setSearchState(true);
      setAlbumsHandler(albums);
      setErrorHandler(null);
    } catch (err) {
      setErrorHandler("Failed to fetch albums");
    }
  };

  const inputHandler = (value: string) => {
    setArtistName(value);
  };

  return (
    <div className="menuCont">
      <div id="menuContainer">
        <div>
          <div> Spotify Muzik</div>
        </div>

        <div className="menu">
          <form onSubmit={handleSearch}>
            <input
              placeholder="Search songs, albums, artists, podcasts"
              onChange={(e) => inputHandler(e.target.value)}
              value={artistName}
            />
            <div className="backwardIcon">
              <img src={backwardIcon} alt="backward" />
            </div>
          </form>

          <p className="user">A</p>
        </div>
      </div>
    </div>
  );
};
