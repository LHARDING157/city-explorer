import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [map, setMap] = useState("");
  const [apiError, setApiError] = useState("");
  const [weather, setWeather] = useState([]);

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  async function getLocation() {
    try {
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      const res = await axios.get(API);
      const newLocation = res.data[0];
      setLocation(newLocation);
      getMap(newLocation);
      getWeather(newLocation);
      setApiError("");
    } catch (error) {
      console.log(error);
      setApiError(error.message);
      setLocation({});
      setWeather([]);
      setMap("");
    }
  }

  async function getMap(newLocation) {
    const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${newLocation.lat},${newLocation.lon}&zoom=15`;
    setMap(API);
  }

  async function getWeather(newLocation) {
    try {
      const API = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}`;
      const res = await axios.get(API);
      console.log(res.data);
      setWeather(res.data);
    } catch (error) {
      console.log(error);
      setWeather([]);
    }
  }

  return (
    <div className="App">
      <h1>City Explorer</h1>
      <div className="search">
        <input onChange={handleChange} placeholder="Place name" />
        <button className="btn" onClick={getLocation}>
          Explore
        </button>
      </div>
      <p>{apiError}</p>
      <h2>{location.display_name}</h2>
      <div className="data">
        <p>Latitude = {location.lat}</p>
        <p>Longitude = {location.lon}</p>
      </div>
      {map && <img src={map} alt="map" />}
    </div>
  );
}

export default App;
