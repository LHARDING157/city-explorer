import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQueary] = useState("");
  const [location, setLocation] = useState({});

  function handleChange(event) {
    setSearchQueary(event.target.value);
  }

  async function getLocation() {
    try {
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      const res = await axios.get(API);
      setLocation(res.data(0));
      console.log(location);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>City Explorer</h1>
      <input onChange={handleChange} placeholder="Place name" />
      <button onClick={getLocation}>Explore</button>
      <h2>{location.display_name}</h2>
    </div>
  );
}

export default App;
