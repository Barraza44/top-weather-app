import React from "react";
import WeatherInfo from "./weatherInfo";

// @ts-ignore
const WeatherForecast = ({city, geoLocation}) => {
  console.log(city);
  return (
    <main>
      <h1>31 °C</h1>
      <h2>Sunny in Guadalajara</h2>
      <div className="forecast">
        <p>Box</p>
      </div>
    </main>
  )
}

export default WeatherForecast;
