import { useState } from "react";
import { getWeather, getForecast } from "./services/weatherApi";
import { WiCloud, WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiSunrise, WiSunset } from "react-icons/wi"; 

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("Calgary");

  const fetchWeatherData = async () => {
    if (!city.trim()) return;
    const weatherData = await getWeather(city);
    const forecastData = await getForecast(city);
    setWeather(weatherData);
    setForecast(forecastData);
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny size={40} color="#FFD700" />;
      case "Clouds":
        return <WiCloud size={40} color="#87CEEB" />;
      case "Rain":
        return <WiRain size={40} color="#1E90FF" />;
      case "Snow":
        return <WiSnow size={40} color="#ADD8E6" />;
      case "Thunderstorm":
        return <WiThunderstorm size={40} color="#FF4500" />;
      default:
        return <WiCloud size={40} color="#87CEEB" />;
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh", 
      width: "100vw",
      backgroundColor: "#f0f8ff",
      fontFamily: "Arial, sans-serif",
      padding: "10px",
      overflow: "hidden"
    }}>
      
      {/* Search Bar */}
      <div style={{ marginBottom: "15px", display: "flex", gap: "8px" }}>
        <input 
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
            width: "200px"
          }}
        />
        <button 
          onClick={fetchWeatherData} 
          style={{
            padding: "8px 12px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "#fff",
            fontSize: "14px",
            cursor: "pointer"
          }}>
          Search
        </button>
      </div>

      {/* Weather Card */}
      {weather && (
        <div style={{
          textAlign: "center",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          minWidth: "350px",
          maxWidth: "500px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <h1 style={{ fontSize: "22px", marginBottom: "5px" }}>🌍 {weather.name}</h1>
          {getWeatherIcon(weather.weather[0].main)}
          <h2 style={{ fontSize: "20px", margin: "5px 0" }}>{weather.weather[0].main}</h2>
          <p style={{ fontSize: "16px", color: "#555" }}>
            {weather.weather[0].description}
          </p>
          <p style={{ fontSize: "18px", fontWeight: "bold", margin: "5px 0" }}>
            🌡️ {weather.main.temp}°C
          </p>
          <div style={{ display: "flex", gap: "10px", fontSize: "14px" }}>
            <p>💨 {weather.wind.speed} m/s</p>
            <p>🌍 {weather.main.humidity}% Humidity</p>
          </div>
          <div style={{ display: "flex", gap: "10px", fontSize: "14px" }}>
            <p><WiSunrise size={24} /> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p><WiSunset size={24} /> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      )}

      {/* 5-Day Forecast */}
      {forecast && (
        <div style={{ 
          marginTop: "15px", 
          textAlign: "center", 
          maxWidth: "650px", // ✅ Prevents excessive stretching
          width: "100%",
        }}>
          <h2 style={{ marginBottom: "5px" }}>📅 5-Day Forecast</h2>
          <div style={{ 
            display: "flex", 
            gap: "8px", 
            justifyContent: "center", // ✅ Keeps items centered
            padding: "10px",
            flexWrap: "wrap", // ✅ Allows wrapping on small screens
          }}>
            {forecast.list.filter((_, index) => index % 8 === 0).map((day, index) => (
              <div key={index} style={{
                padding: "8px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                minWidth: "100px", // ✅ Smaller min-width for small screens
                maxWidth: "120px", // ✅ Keeps uniform width
                flex: "1",
                textAlign: "center"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "bold", margin: "5px 0" }}>{formatDate(day.dt)}</p>
                {getWeatherIcon(day.weather[0].main)}
                <p style={{ fontSize: "14px", margin: "5px 0" }}>{day.main.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
