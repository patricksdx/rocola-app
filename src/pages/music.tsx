import { useState, useEffect, useRef } from "react";
import {
  FaCompactDisc,
  FaPlay,
  FaPause,
  FaStepForward,
  FaVolumeUp,
  FaStepBackward,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

function MusicPlayer() {
  const [songs, setSongs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("http://192.168.0.5:3001/songs")
      .then((res) => res.json())
      .then((data: string[]) => setSongs(data))
      .catch((err) => console.error("Error cargando canciones:", err));
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.error("Error reproduciendo", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const changeSong = (newIndex: number) => {
    if (songs.length === 0 || !audioRef.current) return;
    setCurrentIndex(newIndex);
    audioRef.current.src = `http://192.168.0.5:3001/music/${songs[newIndex]}`;
    audioRef.current.load();
    audioRef.current.play().catch((err) => console.error("Error reproduciendo", err));
    setIsPlaying(true);
  };

  const nextSong = () => {
    changeSong((currentIndex + 1) % songs.length);
  };
  
  const prevSong = () => {
    changeSong((currentIndex - 1 + songs.length) % songs.length);
  };

  const selectSong = (index: number) => {
    changeSong(index);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  return (
    <main className="w-full p-4 flex flex-col justify-center items-center md:justify-between gap-6 mt-10 md:flex-row">
      <div className="w-full md:w-1/3">
        <h1 className="text-2xl font-bold mb-10 text-center">Reproductor de Música</h1>
        <motion.div
          className="mx-auto w-24 h-24 flex items-center justify-center text-primary"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            repeat: isPlaying ? Infinity : 0,
            duration: 3,
            ease: "linear",
          }}
        >
          <FaCompactDisc size={80} />
        </motion.div>

        <p className="p-4 font-semibold text-center">{songs[currentIndex]}</p>

        <Slider
          defaultValue={[0]}
          max={duration || 100}
          step={1}
          value={[currentTime]}
          onValueChange={(value) => {
            if (audioRef.current) {
              audioRef.current.currentTime = value[0];
            }
          }}
          className="mt-2"
        />

        <p className="text-sm text-center mt-2">
          {Math.floor(currentTime)}s / {Math.floor(duration)}s
        </p>

        <div className="flex items-center justify-center gap-4 mt-4">
          <Button onClick={prevSong}>
            <FaStepBackward />
          </Button>
          <Button onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </Button>
          <Button onClick={nextSong}>
            <FaStepForward />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <FaVolumeUp />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2">
              <Slider
                defaultValue={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
              />
            </PopoverContent>
          </Popover>
        </div>

        {songs.length > 0 && (
          <audio
            ref={audioRef}
            key={currentIndex}
            src={`http://192.168.0.5:3001/music/${songs[currentIndex]}`}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
          />
        )}
      </div>
      <aside className="w-full md:w-auto border-l pl-4">
        <h2 className="text-xl font-semibold mb-2">Lista de Reproducción</h2>
        <ul className="space-y-2 flex flex-col">
          {songs.map((song, index) => (
            <Button
              key={index}
              className={`p-2 cursor-pointer rounded ${
                index === currentIndex ? "bg-secondary text-white" : ""
              }`}
              onClick={() => selectSong(index)}
            >
              <p className="w-full">{song}</p>
            </Button>
          ))}
        </ul>
      </aside>
    </main>
  );
}

export default MusicPlayer;
