//* v1 ######################################################################
// import React, { useState, useEffect, useRef } from "react";
// import { fetchMusicVideos, Video } from "../apis/youtube";
// import Controls from "./Controls";

// const MusicPlayer: React.FC = () => {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);

//   useEffect(() => {
//     const loadMusic = async () => {
//       const musicVideos = await fetchMusicVideos();
//       setVideos(musicVideos);
//     };

//     loadMusic();
//   }, []);

//   const playAudio = () => {
//     if (iframeRef.current) {
//       iframeRef.current.src = `https://www.youtube.com/embed/${videos[currentIndex].videoId}?autoplay=1&loop=1&playlist=${videos[currentIndex].videoId}&controls=0&modestbranding=1`;
//     }
//   };

//   const pauseAudio = () => {
//     if (iframeRef.current) {
//       iframeRef.current.src = ""; // Pause by resetting iframe
//     }
//   };

//   const nextAudio = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
//     playAudio();
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>🎶 Fantasy & Isekai Music 🎶</h2>
//       <p>{videos[currentIndex]?.title || "Loading..."}</p>

//       <Controls onPlay={playAudio} onPause={pauseAudio} onNext={nextAudio} />

//       <iframe
//         ref={iframeRef}
//         title="YouTube Audio"
//         width="0"
//         height="0"
//         allow="autoplay"
//         style={{ display: "none" }}
//       ></iframe>
//     </div>
//   );
// };

// export default MusicPlayer;

//* v2 ######################################################################
// import { useState, useEffect, useRef } from "react";
// import { Pause, PlayCircle, SkipForward } from "lucide-react";

// import loop from "../assets/loop.mp4";

// declare global {
//   interface Window {
//     YT: any;
//     onYouTubeIframeAPIReady: () => void;
//   }
// }

// interface Video {
//   title: string;
//   videoId: string;
//   thumbnail: string;
// }

// const MusicPlayer = () => {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const playerRef = useRef<any>(null);

//   // Your existing YouTube API and fetch logic remains the same
//   useEffect(() => {
//     const loadMusic = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/music");
//         const data = await response.json();
//         setVideos(data.videos);
//       } catch (error) {
//         console.error("Error fetching music:", error);
//       }
//     };

//     loadMusic();
//   }, []);

//   useEffect(() => {
//     if (!window.YT) {
//       const tag = document.createElement("script");
//       tag.src = "https://www.youtube.com/iframe_api";
//       const firstScriptTag = document.getElementsByTagName("script")[0];
//       firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
//     } else {
//       loadPlayer();
//     }

//     window.onYouTubeIframeAPIReady = loadPlayer;
//   }, [videos, currentIndex]);

//   const loadPlayer = () => {
//     if (!videos[currentIndex]) return;

//     if (playerRef.current) {
//       playerRef.current.loadVideoById(videos[currentIndex].videoId);
//     } else {
//       playerRef.current = new window.YT.Player("youtube-player", {
//         height: "0",
//         width: "0",
//         videoId: videos[currentIndex].videoId,
//         playerVars: {
//           autoplay: 1,
//           controls: 0,
//           modestbranding: 1,
//         },
//         events: {
//           onReady: () => {
//             playerRef.current.playVideo();
//             setIsPlaying(true);
//           },
//           onStateChange: (event: any) => {
//             if (event.data === window.YT.PlayerState.ENDED) {
//               nextAudio();
//             }
//           },
//         },
//       });
//     }
//   };

//   const playAudio = () => {
//     if (playerRef.current) {
//       playerRef.current.playVideo();
//       setIsPlaying(true);
//     }
//   };

//   const pauseAudio = () => {
//     if (playerRef.current) {
//       playerRef.current.pauseVideo();
//       setIsPlaying(false);
//     }
//   };

//   const nextAudio = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
//       {/* Video Background */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover"
//       >
//         <source src={loop} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Overlay */}
//       <div className="absolute inset-0 backdrop-blur-sm"></div>

//       {/* Minimalistic Player */}
//       <div className="relative z-10 flex flex-col items-center">
//         {/* Small Info Bar */}
//         <div className="mb-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full">
//           <p className="text-sm font-medium text-white/90 truncate max-w-[200px]">
//             {videos[currentIndex]?.title || "Loading..."}
//           </p>
//         </div>

//         {/* Minimal Controls */}
//         <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-full px-6 py-3">
//           <button
//             onClick={isPlaying ? pauseAudio : playAudio}
//             className="p-2 rounded-full hover:bg-white/10 transition-colors"
//           >
//             {isPlaying ? (
//               <Pause className="w-6 h-6" />
//             ) : (
//               <PlayCircle className="w-6 h-6" />
//             )}
//           </button>

//           <button
//             onClick={nextAudio}
//             className="p-2 rounded-full hover:bg-white/10 transition-colors"
//           >
//             <SkipForward className="w-6 h-6" />
//           </button>
//         </div>
//       </div>

//       {/* YouTube Player */}
//       <div id="youtube-player" className="hidden"></div>
//     </div>
//   );
// };

// export default MusicPlayer;

//* v3 ######################################################################
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Pause, PlayCircle, SkipForward } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchMusicVideos, Video } from "../apis/youtube";
import { images } from "../constants/images";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const desktopBackgrounds = [
  images.desktopBackground1,
  images.desktopBackground2,
  images.desktopBackground3,
  images.desktopBackground4,
  images.desktopBackground5,
  images.desktopBackground6,
  images.desktopBackground7,
  images.desktopBackground8,
];

const mobileBackgrounds = [
  images.mobileBackgrounds1,
  images.mobileBackgrounds2,
  images.mobileBackgrounds3,
  images.mobileBackgrounds4,
  images.mobileBackgrounds5,
  images.mobileBackgrounds6,
];

const BACKGROUND_CHANGE_INTERVAL = 20000;

const MusicPlayer = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<any>(null);

  const backgrounds = useMemo(
    () => (isMobile ? mobileBackgrounds : desktopBackgrounds),
    [isMobile]
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, BACKGROUND_CHANGE_INTERVAL);
    return () => clearInterval(interval);
  }, [backgrounds]);

  useEffect(() => {
    const loadMusic = async () => {
      try {
        setLoading(true);
        const data = await fetchMusicVideos();
        setVideos(data);
        setError(null);
      } catch (err) {
        setError("Failed to load music videos.");
      } finally {
        setLoading(false);
      }
    };
    loadMusic();
  }, []);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          if (window.YT && window.YT.Player) {
            loadPlayer();
          } else {
            // Retry if YT.Player is still not available
            const checkInterval = setInterval(() => {
              if (window.YT && window.YT.Player) {
                clearInterval(checkInterval);
                loadPlayer();
              }
            }, 100);
          }
        };
      } else if (window.YT && window.YT.Player) {
        loadPlayer();
      }
    };

    loadYouTubeAPI();
  }, [videos, currentIndex]);

  const loadPlayer = useCallback(() => {
    if (!videos[currentIndex]) return;

    if (
      playerRef.current &&
      typeof playerRef.current.loadVideoById === "function"
    ) {
      // Player already exists, load new video
      playerRef.current.loadVideoById(videos[currentIndex].videoId);
    } else {
      // Ensure YouTube API is ready before creating player
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player("youtube-player", {
          height: "0",
          width: "0",
          videoId: videos[currentIndex].videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
          },
          events: {
            onReady: () => {
              playerRef.current.playVideo();
              setIsPlaying(true);
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                nextAudio();
              }
            },
          },
        });
      }
    }
  }, [videos, currentIndex]);

  const playAudio = useCallback(() => {
    playerRef.current?.playVideo();
    setIsPlaying(true);
  }, []);

  const pauseAudio = useCallback(() => {
    playerRef.current?.pauseVideo();
    setIsPlaying(false);
  }, []);

  const nextAudio = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  }, [videos.length]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentBgIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          exit={{ opacity: 0, transition: { duration: 2 } }}
        >
          <motion.img
            src={backgrounds[currentBgIndex]}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1, transition: { duration: 8, ease: "linear" } }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-10" />

      <div className="relative z-20 flex flex-col items-center px-4 py-6">
        {loading ? (
          <p className="text-sm font-medium text-gray-300">Loading music...</p>
        ) : error ? (
          <p className="text-sm font-medium text-red-400">{error}</p>
        ) : (
          <motion.div
            className="mb-6 px-4 py-2 bg-black/50 rounded-full max-w-xs text-center"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-sm font-medium truncate">
              {videos[currentIndex]?.title || "No music available"}
            </p>
          </motion.div>
        )}

        <motion.div
          className="flex items-center gap-4 bg-black/50 rounded-full px-6 py-3"
          whileHover={{ scale: 1.02 }}
        >
          <motion.button
            onClick={isPlaying ? pauseAudio : playAudio}
            className="p-2 rounded-full hover:bg-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <PlayCircle className="w-6 h-6" />
            )}
          </motion.button>
          <motion.button
            onClick={nextAudio}
            className="p-2 rounded-full hover:bg-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkipForward className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>

      <div id="youtube-player" className="hidden"></div>
    </div>
  );
};

export default MusicPlayer;
