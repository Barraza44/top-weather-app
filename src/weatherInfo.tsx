import React from "react";
import { motion } from "framer-motion";

const WeatherInfo = () => {
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
    >
      <p>Hey</p>
    </motion.div>
  );
}

export default WeatherInfo;
