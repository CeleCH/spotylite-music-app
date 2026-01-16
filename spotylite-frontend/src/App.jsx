
import { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import Login from "./login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);


  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  const search = async () => {
    if (!query) return;
    setLoading(true);

    const res = await axios.get(
      `http://localhost:8082/api/music/search?q=${query}`
    );

    setSongs(res.data);
    setLoading(false);
  };


  return (
    <div className="spotify">
      {currentSong && (
        <div
          className="bg-blur"
          style={{
            backgroundImage: `url(${currentSong.thumbnail})`,
          }}
        />
      )}

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>🎵 SpotyLite</h2>
        <p>Hola, {user.username}</p>

        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("user");
            setUser(null);
          }}
        >
          Cerrar sesión
        </button>

        <div className="search-area">
          <input
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={search}>Buscar</button>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">
        <div className="main-inner">
          <div
            className="header"
            style={{
              backgroundImage: currentSong
                ? `linear-gradient(180deg, rgba(0,0,0,.2), #121212), url(${currentSong.thumbnail})`
                : "linear-gradient(180deg, #2a2a2a, #121212)",
            }}
          >
            <h1>Resultados</h1>
          </div>

          {loading && <p>Buscando...</p>}

          <div className="grid">
            {songs.map((song) => (
              <div key={song.videoId} className="card">
                <div className="card-image">
                  <img src={song.thumbnail} alt="" />
                  <button
                    className="play-btn"
                    onClick={() => setCurrentSong(song)}
                  >
                    ▶
                  </button>
                </div>

                <h4>{song.title}</h4>
                <p>{song.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    {/* RIGHT PANEL */}
<div className="right-panel">
  {currentSong ? (
    <>
      {/* 1️⃣ INFO DE LA CANCIÓN */}
      <div className="now-playing">
        <img
          src={currentSong.thumbnail}
          alt={currentSong.title}
        />

        <h3>{currentSong.title}</h3>
        <p>{currentSong.author}</p>

        <div className="actions">
          <button className="play-btn">▶ Play</button>
          <button className="like-btn">💚</button>
        </div>
      </div>

      {/* 2️⃣ VIDEO (ESTE ES EL ÚNICO Y EL QUE SUENA) */}
      <div className="video-player">
        <YouTube
          videoId={currentSong.videoId}
          opts={{
            width: "100%",
            height: "220",
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              rel: 0,
            },
          }}
        />
      </div>

            <div className="song-info">
              <p><strong>Álbum:</strong> YouTube Music</p>
              <p><strong>Duración:</strong> ~3 min</p>
              <p><strong>Género:</strong> Urbano</p>
            </div>

            <div className="suggestions">
              <h4>También te puede gustar</h4>

              {songs
                .filter((s) => s.videoId !== currentSong.videoId)
                .slice(0, 5)
                .map((song) => (
                  <div
                    key={song.videoId}
                    className="mini-song"
                    onClick={() => setCurrentSong(song)}
                  >
                    <img src={song.thumbnail} />
                    <div>
                      <span>{song.title}</span>
                      <small>{song.author}</small>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <h3>🎧 SpotyLite</h3>
            <p>Busca una canción y selecciónala</p>
            <span>La música vive aquí</span>
          </div>
        )}
      </div>

   {/* PLAYER */}
{currentSong && (
  <div className="player" onClick={() => setFullscreen(true)}>
    <span className="song-title">{currentSong.title}</span>

    <div className="visualizer">
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} className="bar" />
      ))}
    </div>
  </div>
)}


{fullscreen && currentSong && (
  <div className="fullscreen-player">
    <div
      className="fullscreen-bg"
      style={{
        backgroundImage: `url(${currentSong.thumbnail})`,
      }}
    />

    <button
      className="close-fullscreen"
      onClick={() => setFullscreen(false)}
    >
      ✕
    </button>

    <img
      src={currentSong.thumbnail}
      className="fullscreen-cover"
      alt=""
    />

    <h2>{currentSong.title}</h2>
    <p>{currentSong.author}</p>

    <div className="visualizer big">
      {Array.from({ length: 24 }).map((_, i) => (
        <span key={i} className="bar" />
      ))}
    </div>
  </div>
)}



    </div>
  );
}

export default App;
