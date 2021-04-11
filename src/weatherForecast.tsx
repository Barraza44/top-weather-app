import React, { useState, useEffect } from "react";
import WeatherInfo from "./weatherInfo";
import myApiKey from "./apiKey";
import IResponse from "./interfaces/IResponse";
import FeelsLike from "./vector/FeelsLike.svg";
import Frame from "./vector/Frame.svg";
import Humidity from "./vector/Humidity.svg";
import MaxTemp from "./vector/MaxTemp.svg";
import MinTemp from "./vector/MinTemp.svg";
import Wind from "./vector/Wind.svg";
import "./weather-forecast.css";
import IWeather from "./interfaces/IWeather";

const WeatherForecast = ({city, geoLocation}: IWeather) => {
  console.log(city);
  const [ forecast, setForecast ] = useState(
    [
      {"data": 0, "icon": FeelsLike, "type": "Feels like", "key": 0},
      {"data": 0, "icon": MinTemp, "type": "Min Temp.", "key": 1},
      {"data": 0, "icon": MaxTemp, "type": "Max Temp.", "key": 2},
      {"data": 0, "icon": Humidity, "type": "Humidity", "key": 3},
      {"data": 0, "icon": Frame, "type": "Visibility", "key": 4},
      {"data": 0, "icon": Wind, "type": "Wind", "key": 5}
    ]
  );
  const [ temperature, setTemperature ] = useState(0);
  const [ cityName, setCityName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ units, setUnits ] = useState("metric");

  let apiUri: string;

  if(geoLocation.lat !== null && geoLocation.lon !== null) {
    apiUri = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.lon}&appid=${myApiKey}&units=${units}`;
  } else {
    apiUri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApiKey}&units=${units}`;
  }

  useEffect(() => {
      fetch(apiUri)
        .then((response) => response.json())
        .then((response) => {
          const main: IResponse = response.main;
          setForecast([
            {"data": main.feels_like, "icon": FeelsLike, "type": "Feels like", "key": 0},
            {"data": main.temp_min, "icon": MinTemp, "type": "Min Temp.", "key": 1},
            {"data": main.temp_max, "icon": MaxTemp, "type": "Max Temp.", "key": 2},
            {"data": main.humidity, "icon": Humidity, "type": "Humidity", "key": 3},
            {"data": response.visibility, "icon": Frame, "type": "Visibility", "key": 4},
            {"data": response.wind.speed, "icon": Wind, "type": "Wind", "key": 5}
          ]);
          setTemperature(main.temp);
          setDescription(response.weather[0].description);
          setCityName(response.name);
          console.log(response.name);
        });

  },[city, geoLocation, units]);

  let unitsArray: string[];

  switch (units) {
    case "metric":
      unitsArray = ["°C", "°C", "°C", "%", "m", "m/s"];
      break;
    case "imperial":
      unitsArray = ["°F", "°F", "°F", "%", "mi", "mph"];
      break;
    default:
      unitsArray = ["K", "K", "K", "%", "m", "m/s"];
      break;
  }

  return (
    <main>
      <div className="head">
      <h1>{`${Math.ceil(temperature)}${unitsArray[0]}`}</h1>
      <h2>{`${description} in ${cityName !== "" ? cityName : city}`}</h2>
      </div>
      <div className="forecast">
        {forecast.map(data => (
          <WeatherInfo
            number={data.data}
            icon={data.icon}
            type={data.type}
            key={data.key}
            unit={unitsArray[data.key]}
            idNumber={data.key}
          />
        ))}
      </div>
    </main>
  )
}

export default WeatherForecast;
