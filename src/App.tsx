import React, {useState} from 'react';
import './App.css';
import WeatherForecast from "./weatherForecast";
import SearchBox from "./searchBox";

function App() {
  const [ location, setLocation ] = useState({lat: 0, lon: 0});
  const [ city, setCity] = useState({cityName: ""});
  const [ visibility, setVisibility ] = useState("shown");
  const [ styleClass, setStyleClass ] = useState(["App", "opaque"]);
  const geoLocate = () => {

    const locate = (position: GeolocationPosition) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      setLocation({lat: latitude, lon: longitude});
      setCity({cityName: ""});
      setVisibility("hidden");
      setStyleClass(["App2", "opaque2"]);
      console.log(location);
    }

    const error = () => console.error("unable to locate");

    if(!navigator.geolocation) {
      console.error("Geolocation unsupported");
      // @ts-ignore
      setLocation({lat: null, lon: null});
    } else {
      navigator.geolocation.getCurrentPosition(locate, error);
    }

  }

  const handleSearch = (e: any) => {
    setCity({cityName: e.target.value});
  }

  const handleClick = () => {
    setVisibility("hidden");
    setStyleClass(["App2", "opaque2"]);
    // @ts-ignore
    setLocation({lat: null, lon: null});
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
  }

  return (
    <div className={styleClass[0]}>
      <div className={styleClass[1]}>
        <h1 className={visibility}>Pick a city to start</h1>
        <SearchBox visibility={visibility} handleSearch={handleSearch} city={city.cityName} handleSubmit={handleSubmit} />
        <button className={visibility} onClick={handleClick}>Search</button>
        <button onClick={() => geoLocate()} className={visibility}>Use geolocation instead</button>
        {visibility === "hidden"
          ? <WeatherForecast  city={city.cityName} geoLocation={location} />
          : null
        }
      </div>
    </div>
  );
}

export default App;
