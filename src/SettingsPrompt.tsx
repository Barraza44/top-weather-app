import React from "react";
import { motion } from "framer-motion";
import ISettings from "./interfaces/ISettings";
import "./settings-prompt.css";

const SettingsPrompt = ({visible,handleChange}: ISettings) => {
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
      className={visible}
      onChange={handleChange}
    >
      <h4>Settings</h4>
      <p>Swap units</p>
      <div>
        <label htmlFor="metric-units">Metric (°C)</label>
        <input type="radio" name="units" id="metric-units" value="metric"  />
      </div>
      <div>
        <label htmlFor="imperial-units">Imperial (°F)</label>
        <input type="radio" name="units" id="imperial-units" value="imperial" />
      </div>
      <div>
        <label htmlFor="standard-units">Standard (K)</label>
        <input type="radio" name="units" id="standard-units" value="standard"/>
      </div>

      <button className="change">Change city</button>
      <button className="done">Done</button>
    </motion.div>
  );
}

export default SettingsPrompt
