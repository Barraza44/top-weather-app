import React from "react";
import { motion } from "framer-motion";
import "./weather-info.css";
import IWeatherInfo from "./interfaces/IWeatherInfo";


const WeatherInfo = ({number, icon, type, unit}: IWeatherInfo) => {
  let weatherData: number;
  switch (unit) {
    case "°F":
      weatherData = Math.ceil(((number * (9/5)) + 32));
      break;
    case "K":
      weatherData = Math.ceil(number + 273.15);
      break;
    case "mph":
      weatherData = Math.round(number * 2.237);
      break;
    case "km/h":
      weatherData = Math.round(number * 3.6);
      break;
    default:
      weatherData = number;
      break;
  }


  return (
    <motion.div
      initial={{
        opacity: 0.1,
        scale: 0.1
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      layout
      className="card"
    >
      <img src={icon} alt=""/>
      <h3>{`${weatherData} ${unit}`}</h3>
      <p>{type}</p>
    </motion.div>
  );
}

export default WeatherInfo;
