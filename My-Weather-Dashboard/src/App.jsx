return (
  <div style={{ color: "red", fontSize: "30px" }}>
    APP IS RENDERING
  </div>
);


import { useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) throw new Error("City not found");

      const json = await res.json();
      setData(json);
      setError("");
    } catch (err) {
      setError("City not found");
      setData(null);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <div className="search">
          <input
            type="text"
            placeholder="Search city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>🔍</button>
        </div>

        {error && <p className="error">{error}</p>}

        {data && (
          <>
            <h2>{data.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="weather"
            />
            <h1>{Math.round(data.main.temp)}°C</h1>
            <p>{data.weather[0].description}</p>

            <div className="details">
              <p>Humidity: {data.main.humidity}%</p>
              <p>Wind: {data.wind.speed} m/s</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
