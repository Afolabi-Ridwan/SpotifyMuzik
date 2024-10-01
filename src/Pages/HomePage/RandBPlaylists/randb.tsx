import { useEffect, useState } from "react";
import style from "../NewReleases/newReleases.module.css";
import { getToken } from "../../../Services/Api/getToken";
import { getPlaylistsByGenre } from "../../../Services/Api/r&bAPI";
import PlaylistsTemplates from "../PlaylistsTemplates/playlistsTemplates";

const RandB = () => {
  const [rbPlaylists, setRbPlaylists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const accessToken = await getToken();
        const rb = await getPlaylistsByGenre(accessToken, "R&B");
        setRbPlaylists(rb);
      } catch (err) {
        setError("Failed to fetch playlists");
      }
    };

    fetchPlaylists();
  }, []);

  const filteredPlaylists = rbPlaylists.filter((playlists) => {
    let newPlaylists;
    if (playlists.images[0]) {
      newPlaylists = playlists;
    }
    return newPlaylists;
  });

  return (
    <div className={`${style.containers} ${style.randbContainer}`}>
      <PlaylistsTemplates
        title={"R&B Playlists"}
        albums={filteredPlaylists}
        error={error}
      />
    </div>
  );
};

export default RandB;
