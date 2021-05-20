export default function UnitPicker(units: string, temp: number) {

  const temperatureDataObject = {
    unitsArray: [""],
    temperature: 0,
  };

  switch (units) {
    case "metric":
      temperatureDataObject.unitsArray = ["°C", "°C", "°C", "%", "m", "km/h"];
      temperatureDataObject.temperature = temp;
      break;
    case "imperial":
      temperatureDataObject.unitsArray = ["°F", "°F", "°F", "%", "m", "mph"];
      temperatureDataObject.temperature = (temp * (9 / 5) + 32);
      break;
    default:
      temperatureDataObject.unitsArray = ["K", "K", "K", "%", "m", "m/s"];
      temperatureDataObject.temperature = (temp + 273.15);
      break;
  }
  return temperatureDataObject;
}
