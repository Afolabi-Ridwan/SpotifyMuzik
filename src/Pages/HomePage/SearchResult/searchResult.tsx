import "./searchResult.css";
import { searchContext } from "../../../Services/Context/searchResultContext";
import PlaylistsTemplates from "../PlaylistsTemplates/playlistsTemplates";
import style from "../NewReleases/newReleases.module.css";
import "../Ui/ui.css";

const SearchResult = () => {
  const data = searchContext.getState().data;
  console.log(data);
  const albums = data.albums.items.map((item: any) => {
    return item;
  });

  const artists = data.artists.items.map((item: any) => {
    return item;
  });

  const tracks = data.tracks.items.map((item: any) => {
    return item;
  });

  return (
    <div id="homePageUi">
        <div className="navBarAndMenu"></div>

      <div className={`pagesCont ${false && "biggerContainer"}`}>
        <div className={`allPlaylists ${false && "biggerContainer"}`}>
          <div className={`${style.containers} ${style.randbContainer}`}>
            <PlaylistsTemplates title={"Albums"} albums={albums} error={""} />
            <PlaylistsTemplates title={"Artists"} albums={artists} error={""} />
            <PlaylistsTemplates title={"Tracks"} albums={tracks} error={""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
