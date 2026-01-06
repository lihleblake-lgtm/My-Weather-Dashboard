import { useState } from "react";
import "./App.css";
const API_KEY = import.meta.env.VITE_API_KEY;
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const fetchWeather = async () => {
    if (!city) return;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();
    setWeather(data);
  };
  const getIcon = (main) => {
    if (main === "Clouds") return "/src/assets/icons/cloud.png";
    if (main === "Rain") return "/src/assets/icons/rain.png";
    if (main === "Thunderstorm") return "/src/assets/icons/thunder.png";
    return "/src/assets/icons/sun.png";
  };
  return (
    <div className="app">
      <div className="card">
        {/* SEARCH */}
        <div className="search">
          <input
            placeholder="Search city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>🔍</button>
        </div>
        {weather && (
          <>
            {/* LOCATION */}
            <p className="location">📍 {weather.city.name}</p>
            {/* CURRENT WEATHER */}
            <div className="current">
              <img
                src={getIcon(weather.list[0].weather[0].main)}
                alt="weather"
              />
              <h1>{Math.round(weather.list[0].main.temp)}°C</h1>
              <p>{weather.list[0].weather[0].main}</p>
            </div>
            {/* DETAILS */}
            <div className="details">
              <div>
                💧
                <span>{weather.list[0].main.humidity}%</span>
                <small>Humidity</small>
              </div>
              <div>
                🌬
                <span>{weather.list[0].wind.speed} km/h</span>
                <small>Wind</small>
              </div>
            </div>
            {/* FORECAST */}
            <div className="forecast">
              {weather.list.slice(8, 40, 8).map((day, i) => (
                <div className="forecast-card" key={i}>
                  <img src={getIcon(day.weather[0].main)} />
                  <p>{Math.round(day.main.temp)}°</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default App;
