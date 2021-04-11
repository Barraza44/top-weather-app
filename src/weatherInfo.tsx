import React from "react";
import { motion } from "framer-motion";
import "./weather-info.css";
import IWeatherInfo from "./interfaces/IWeatherInfo";


const WeatherInfo = ({number, icon, type}: IWeatherInfo) => {
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
      <h3>{`${number}°C`}</h3>
      <p>{type}</p>
    </motion.div>
  );
}

export default WeatherInfo;
