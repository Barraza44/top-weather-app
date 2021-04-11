import React from "react";
import { motion } from "framer-motion";
import "./weather-info.css";
import IWeatherInfo from "./interfaces/IWeatherInfo";


const WeatherInfo = ({number, icon, type, unit, idNumber}: IWeatherInfo) => {
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
      {idNumber === 0 || idNumber === 1 || idNumber === 2
        ? <h3>{`${Math.ceil(number)} ${unit}`}</h3>
        : <h3>{`${number} ${unit}`}</h3>
      }
      <p>{type}</p>
    </motion.div>
  );
}

export default WeatherInfo;
