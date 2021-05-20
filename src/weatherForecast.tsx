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
import settingsIcon from "./vector/settings.svg";
import "./weather-forecast.css";
import IWeather from "./interfaces/IWeather";
import SettingsPrompt from "./SettingsPrompt";
import UnitPicker from "./UnitPicker";
import Loading from "./Loading";

const WeatherForecast = ({city, geoLocation, changeCity}: IWeather) => {
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
  const [ visible, setVisible ] = useState("hidden");
  const [ loading, setLoading ] = useState(true);

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
        })
        .catch(() =>{
          alert(`Your query [${city}] did not throw any results`);
          changeCity()
        })
        .finally(() => setLoading(false));

  },[city, geoLocation]);


  const { unitsArray, temperature: temperatureData } = UnitPicker(units, temperature);

  const handleChange = (e: any) => setUnits(e.target.value);


  const hideSettings = () => {
    setVisible("hidden");
  }

  const showSettings = () => setVisible("shown")

  return (
    <main>
      <div className="head">
      <h1>{`${Math.ceil(temperatureData)} ${unitsArray[0]}`}</h1>
      <h2>{`${description} in ${cityName !== "" ? cityName : city}`}</h2>
      <button id="setting" onClick={showSettings}>
        <img src={settingsIcon} alt=""/>
      </button>
      </div>
      <div className="forecast">
        {forecast.map(data => (
          <WeatherInfo
            number={data.data}
            icon={data.icon}
            type={data.type}
            key={data.key}
            unit={unitsArray[data.key]}
          />
        ))}
        {
          visible === "shown" ?
            <div className={`container-${visible}`} >
              <SettingsPrompt
                visible={`settings-${visible}`}
                handleChange={handleChange}
                changeCity={changeCity}
                hideSettings={hideSettings}
              />
            </div>
            : null
        }
        {
          loading ?
            <div className="loading-container">
              <Loading />
            </div>
            : null
        }
      </div>
    </main>
  )
}

export default WeatherForecast;
