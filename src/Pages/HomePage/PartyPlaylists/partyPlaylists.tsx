import React, { useEffect, useState, useRef } from "react";
import style from "../NewReleases/newReleases.module.css";
import { getPlaylists } from "../../../Services/Api/partyPlaylistsAPI";
import PlaylistsTemplates from "../PlaylistsTemplates/playlistsTemplates";

const PartyPlaylists = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlists = await getPlaylists();
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
