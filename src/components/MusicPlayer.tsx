import { useEffect, useState } from "react";
import { fetchMusicVideos, Video } from "../apis/youtube";

const MusicPlayer = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      const musicVideos = await fetchMusicVideos();
      setVideos(musicVideos);
    };

    loadVideos();
  }, []);

  const playAudio = (videoId: string) => {
    setPlayingVideoId(videoId);
  };

  return (
    <div>
      <h2>Fantasy & Isekai Music</h2>
      <ul>
        {videos.map((video) => (
          <li
            key={video.videoId}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              width="100"
              height="60"
              style={{ marginRight: "10px" }}
            />
            <span>{video.title}</span>
            <button
              onClick={() => playAudio(video.videoId)}
              style={{ marginLeft: "10px" }}
            >
              Play
            </button>
          </li>
        ))}
      </ul>

      {playingVideoId && (
        <iframe
          id="youtube-audio"
          title="YouTube Audio"
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${playingVideoId}?autoplay=1&loop=1&playlist=${playingVideoId}&controls=0&modestbranding=1`}
          allow="autoplay"
          style={{ display: "none" }}
        ></iframe>
      )}
    </div>
  );
};

export default MusicPlayer;
