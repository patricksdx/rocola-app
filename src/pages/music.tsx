import { useState, useEffect, useRef } from "react";
import { FaCompactDisc } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function MusicPlayer() {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3001/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Error cargando canciones:", err));
  }, []);

  const nextSong = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const selectSong = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <main className="w-full p-4 flex justify-between gap-6 mt-10">
      {/* Sección del reproductor */}
      <div className="w-1/3">
        <h1 className="text-2xl font-bold mb-4">Reproductor de Música</h1>
        {/* Vinilo animado */}
        <motion.div
          className="mx-auto w-24 h-24 flex items-center justify-center text-gray-700 dark:text-white"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            repeat: isPlaying ? Infinity : 0,
            duration: 3,
            ease: "linear",
          }}
        >
          <FaCompactDisc size={80} />
        </motion.div>

        {/* Nombre de la canción actual */}
        <p className="p-4 font-semibold text-center">{songs[currentIndex]}</p>

        {/* Botón de siguiente canción */}
        <Button
          className="w-full text-left p-2 border rounded mb-2 hover:bg-gray-200"
          onClick={nextSong}
        >
          Siguiente Canción
        </Button>

        {/* Controles de audio */}
        {songs.length > 0 && (
          <audio
            ref={audioRef}
            key={currentIndex}
            controls
            autoPlay
            className="w-full mt-4"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source
              src={`http://localhost:3001/music/${songs[currentIndex]}`}
              type="audio/mpeg"
            />
            Tu navegador no soporta audio.
          </audio>
        )}
      </div>
      {/* Lista de reproducción */}
      <aside className="border-l pl-4">
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
