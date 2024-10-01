import React, { useEffect, useState, useRef } from "react";
import style from "../NewReleases/newReleases.module.css";
import { getPlaylists } from "../../../Services/Api/partyPlaylistsAPI";
import { getToken } from "../../../Services/Api/getToken";
import PlaylistsTemplates from "../PlaylistsTemplates/playlistsTemplates";

const PartyPlaylists = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const accessToken = await getToken();
        const playlists = await getPlaylists(accessToken);
        setPlaylists(playlists);
      } catch (err) {
        setError("Failed to fetch playlists");
      }
    };

    fetchPlaylists();
  }, []);


  return (
    <div className={`${style.containers} ${style.partyPlaylistsContainer}`}>
      <PlaylistsTemplates
        title={"Party Playlists"}
        albums={playlists}
        error={error}
      />
    </div>
  );
};

export default PartyPlaylists;
