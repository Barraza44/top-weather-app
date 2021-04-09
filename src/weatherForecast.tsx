import React, { useState, useEffect } from "react";
import WeatherInfo from "./weatherInfo";
import myApiKey from "./apiKey";
import IResponse from "./IResponse";
import FeelsLike from "./vector/FeelsLike.svg";
import Frame from "./vector/Frame.svg";
import Humidity from "./vector/Humidity.svg";
import MaxTemp from "./vector/MaxTemp.svg";
import MinTemp from "./vector/MinTemp.svg";
import Wind from "./vector/Wind.svg";

// @ts-ignore
const WeatherForecast = ({city, geoLocation}) => {
  console.log(city);
  const [ forecast, setForecast ] = useState(
    [
      {data: 0, icon: FeelsLike, type: "Feels like"},
      {data: 0, icon: MinTemp, type: "Min Temp."},
      {data: 0, icon: MaxTemp, type: "Max Temp."},
      {data: 0, icon: Humidity, type: "Humidity"},
      {data: 0, icon: Frame, type: "Visibility"},
      {data: 0, icon: Wind, type: "Wind"}
    ]
  );
  const [ temperature, setTemperature ] = useState(0);
  const [ cityName, setCityName ] = useState("");
  const [ description, setDescription ] = useState("");

  let apiUri: string;

  if(geoLocation.lat !== null && geoLocation.lon !== null) {
    apiUri = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.lon}&appid=${myApiKey}&units=metric`;
  } else {
    apiUri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApiKey}&units=metric`;
  }

  useEffect(() => {
      fetch(apiUri)
        .then((response) => response.json())
        .then((response) => {
          const main: IResponse = response.main
          setForecast([
            {data: main.feels_like, icon: FeelsLike, type: "Feels like"},
            {data: main.temp_min, icon: MinTemp, type: "Min Temp."},
            {data: main.temp_max, icon: MaxTemp, type: "Max Temp."},
            {data: main.humidity, icon: Humidity, type: "Humidity"},
            {data: response.visibility, icon: Frame, type: "Visibility"},
            {data: response.wind, icon: Wind, type: "Wind"}
          ]);
          setTemperature(main.temp);
          setDescription(response.weather[0].description);
          setCityName(response.name);
          console.log(response.name);
        });

  },[city, geoLocation]);


  return (
    <main>
      <h1>{temperature}</h1>
      <h2>{`${description} in ${cityName !== "" ? cityName : city}`}</h2>
      <div className="forecast">
        {forecast.map(info => (
          <WeatherInfo type={info.type} icon={info.icon} number={info.data} />
        ))}
      </div>
    </main>
  )
}

export default WeatherForecast;
