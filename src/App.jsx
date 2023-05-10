import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [map, setMap] = useState("");

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  async function getLocation() {
    try {
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      const res = await axios.get(API);
      setLocation(res.data[0]);
      getMap(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function getMap(data) {
    const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${data.lat},${data.lon}&zoom=11`;
    setMap(API);
  }

  return (
    <div className="App">
      <h1>City Explorer</h1>
      <input onChange={handleChange} placeholder="Place name" />
      <button onClick={getLocation}>Explore</button>
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
