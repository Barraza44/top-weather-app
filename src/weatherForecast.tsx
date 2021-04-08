import React, { useState, useEffect } from "react";
import WeatherInfo from "./weatherInfo";
import myApiKey from "./apiKey";
import IResponse from "./IResponse";

// @ts-ignore
const WeatherForecast = ({city, geoLocation}) => {
  console.log(city);
  const [ forecast, setForecast ] = useState(
    {temp: 0, feelsLike: 0, tempMin: 0, tempMax: 0, humidity: 0, visibility: 0, cityName: "", description: ""}
  )

  useEffect(() => {
    if(geoLocation.lat !== null && geoLocation.lon !== null) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.lon}&appid=${myApiKey}&units=metric`)
        .then((response) => response.json())
        .then((response) => {
          const main: IResponse = response.main
          setForecast(
            {temp: main.temp,
            feelsLike: main.feels_like,
            tempMin: main.temp_min,
            tempMax: main.temp_max,
            humidity: main.humidity,
            visibility: response.visibility,
            cityName: response.name,
            description: response.weather[0].main});
          console.table(forecast);
        });

    }

  },[city, geoLocation]);


  return (
    <main>
      <h1>{forecast.temp}</h1>
      <h2>{`${forecast.description} in ${forecast.cityName}`}</h2>
      <div className="forecast">
        <p>Box</p>
      </div>
    </main>
  )
}

export default WeatherForecast;
