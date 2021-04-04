import React, {useState} from 'react';
import './App.css';
import WeatherForecast from "./weatherForecast";

function App() {
  const [ location, setLocation ] = useState({lat: 0, lon: 0});
  const [ city, setCity] = useState({cityName: "London"});
  const [ visibility, setVisibility ] = useState("shown")
  const geoLocate = () => {

    const locate = (position: GeolocationPosition) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      setLocation({lat: latitude, lon: longitude});
      setCity({cityName: ""});
      setVisibility("hidden")
      console.log(location);
    }

    const error = () => console.error("unable to locate");

    if(!navigator.geolocation) {
      console.error("Geolocation unsupported");
    } else {
      navigator.geolocation.getCurrentPosition(locate, error);
    }

  }
  return (
    <div className="App">
      <p>Hey</p>
      <button onClick={() => geoLocate()} className={visibility}>Locate</button>
      {city.cityName === ""
        ? <WeatherForecast city={""} geoLocation={location} />
        : <WeatherForecast city={city.cityName} geoLocation={{lat: 0, lon: 0}} />
      }
    </div>
  );
}

export default App;
