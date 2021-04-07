import React from "react";

// @ts-ignore
const WeatherForecast = ({city, geoLocation}) => {
  console.log(city);
  return (
    <main>
      <h1>31 °C</h1>
      <h2>Sunny in Guadalajara</h2>
      <div>
        <p>Box</p>
      </div>
    </main>
  )
}

export default WeatherForecast;
