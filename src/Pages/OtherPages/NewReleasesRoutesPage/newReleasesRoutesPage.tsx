import { useParams } from "react-router";
import "./newReleasesRoutesPage.css";
import "../../HomePage/Ui/ui.css";
import { useContext, useEffect, useState } from "react";
import { getAlbumTracklists } from "../../../Services/Api/newReleasesAPI";
import { BarsToggleContext } from "../../../Services/Context/barsToggleContext";
import { GoDotFill } from "react-icons/go";

type objectType = {
  artists: artistsType[];
  name: string;
  duration_ms: string;
};

type artistsType = {
  name: string;
  id: string;
};

const NewReleasesRoutesPage = () => {
  const { album } = useParams<{
    album: any;
  }>();
  const [tracks, updateTrackLists] = useState<objectType[]>([]);
  const [trackMins, updateTrackMins] = useState<any[]>([]);
  const [totalTracksMins, setTotalTracksMins] = useState("");

  const { barsToggleState } = useContext(BarsToggleContext);

  const albumInfo = JSON.parse(decodeURIComponent(album));

  useEffect(() => {
    const fetchTracks = async () => {
      await getAlbumTracklists(albumInfo.id, updateTrackLists);
    };
    console.log(tracks);
    fetchTracks();
  }, [albumInfo.id]);

  const formatMsToTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  };

  const formatMsToMin = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);

    const minutes = Math.floor(totalSeconds / 60);

    return minutes;
  };

  useEffect(() => {
    const trackMinsHandler = () => {
      const trackDurations = tracks.map((track) => track.duration_ms);
      updateTrackMins(trackDurations);
    };

    trackMinsHandler();

    const totalMinutesHandler = () => {
      const total =
        trackMins.length > 0 &&
        trackMins.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        });

      setTotalTracksMins(total);
    };

    totalMinutesHandler();
  }, [tracks]);

  return (
    <div style={{ height: "100%", }}>
      <div
        className="tracksCont"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.86) 5%, rgba(0, 0, 0, 1) 100%), url(${albumInfo.images[0].url}) no-repeat`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          margin: "0",
            height: "100%",
        }}
      >
        <div className="newReleasesRoutesPage">
          <div className="navBarAndMenu"></div>

          <div className="container">
            <div
              className={`albumInfo ${barsToggleState && "biggerContainer"}`}
            >
              <div className="artworkAndName">
                {tracks.map((track, index) => (
                  <p
                    style={{ fontWeight: "normal", fontSize: "20px" }}
                    key={index}
                  >
                    {index === 0 && track.artists[0].name}
                  </p>
                ))}
                <img
                  src={albumInfo.images[0].url && albumInfo.images[0].url}
                  alt="Album Artwork"
                 
                />
                <p className="albumName"> {albumInfo.name}</p>

                <p className="typeAndDate">
                  {albumInfo.album_type}
                  <span style={{ fontSize: "12px", margin: "5px 7px 0 7px" }}>
                    <GoDotFill />
                  </span>
                  {albumInfo.release_date.substring(0, 4)}
                </p>

                <p>
                  {tracks.length} songs{" "}
                  <span style={{ fontSize: "12px", margin: "5px 7px 0 7px" }}>
                    <GoDotFill />
                  </span>
                  {formatMsToMin(Number(totalTracksMins))} minutes
                </p>
              </div>

              <div style={{ width: "100%" }}>
                {tracks.length > 0 && (
                  <ul>
                    {tracks.map((track: any, index: any) => (
                      <li key={index}>
                        <div>
                          <div>
                          <p style={{fontSize: "17px", width: "20px", display: "flex", justifyContent: "center"}}>{index + 1}</p>
                          </div>
                          <div className="tracknameAndArtists">
                            <p className="trackName">{track.name}</p>
                            <div className="artistName">
                            {track.artists.map(
                                (artists: any, index: number) => (
                                  <div key={index}>
                                    {track.artists.length === 1 ? (
                                      <p>
                                        {artists.name}
                                      </p>
                                    ) : track.artists.length > 2 ? (
                                      <p>
                                        {index === 0  && (
                                          <span >{artists.name}</span>
                                        )}{" "}
                                        {track.artists.length - 2 === index && (
                                          <span style={{marginLeft: "5px"}}> {artists.name} </span>
                                        )}
                                        {track.artists.length - 1 !== index &&
                                          track.artists.length - 2 !==
                                            index && <span >, </span>}{" "}
                                        {track.artists.length - 1 === index && (
                                          <span style={{marginLeft: "5px"}}> & {artists.name} </span>
                                        )}{" "}
                                      </p>
                                    ) : track.artists.length  === 2 ? (
                                      <p>
                                         
                                       {index === 0 ? <span>{artists.name} &</span> : <span style={{marginLeft: "5px"}}>{artists.name}</span>}
                                      </p>
                                    ): (<></>)}
                                  </div>)
                                )}
                            </div>
                          </div>
                        </div>
                        <div>
                          <p>{formatMsToTime(track.duration_ms)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReleasesRoutesPage;
