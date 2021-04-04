import React from "react";

// @ts-ignore
const WeatherForecast = ({city, geoLocation}) => {
  console.log(city);
  return (
    <div>
      <p>{`Your location is ${geoLocation.lat}, ${geoLocation.lon}`}</p>
      <p>{`The city is ${city}`}</p>
    </div>
  )
}

export default WeatherForecast;
