import React from "react";
import { motion } from "framer-motion";
import "./weather-info.css";
// @ts-ignore
const WeatherInfo = ({number, icon, type}) => {
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
      <p>{number}</p>
      <p>{type}</p>
    </motion.div>
  );
}

export default WeatherInfo;
