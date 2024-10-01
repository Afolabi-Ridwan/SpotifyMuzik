import { useEffect, useState } from "react";
import style from "../NewReleases/newReleases.module.css";
import { getToken } from "../../../Services/Api/getToken";
import { getPlaylistsByGenre } from "../../../Services/Api/r&bAPI";
import PlaylistsTemplates from "../PlaylistsTemplates/playlistsTemplates";

const SoulPlaylists = () => {
  const [soulPlaylists, setSoulPlaylists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const accessToken = await getToken();
        const soul = await getPlaylistsByGenre(accessToken, "Soul");
        setSoulPlaylists(soul);

      } catch (err) {
        setError("Failed to fetch playlists");
      }
    };

    fetchPlaylists();
  }, []);

  const filteredPlaylists = soulPlaylists.filter((playlists) => {
    let newPlaylists;
    if (playlists.images[0]) {
      newPlaylists = playlists;
    }
    return newPlaylists;
  });

  return (
    <div className={`${style.containers} ${style.soulPlaylistsContainer} `}>
      <PlaylistsTemplates title={"Souls Playlists"} albums={filteredPlaylists} error={error}/>
      </div>
  );
};

export default SoulPlaylists;
