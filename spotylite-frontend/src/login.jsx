
import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:8082/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      onLogin(res.data);
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>🎵 SpotyLite</h2>

      <input
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br/>

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>

      <button onClick={login}>Ingresar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
