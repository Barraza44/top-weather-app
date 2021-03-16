import React, {useState} from 'react';
import './App.css';

function App() {
  const [ location, setLocation ] = useState({lat: 0, lon: 0});
  const geoLocate = () => {

    const locate = (position: GeolocationPosition) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      setLocation({lat: latitude, lon: longitude});
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
      <button onClick={() => geoLocate()}>Locate</button>
      <p>{`Your position is ${location.lat}°, ${location.lon}°`}</p>
    </div>
  );
}

export default App;
