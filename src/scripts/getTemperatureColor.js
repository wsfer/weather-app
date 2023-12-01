// TODO: improve this code and modify rgb values to act like a gradient based on temperature value
const getTemperatureColor = (temperature) => {
  if (temperature >= 40) {
    return 'rgb(255, 0, 255)';
  }
  if (temperature >= 30) {
    return 'rgb(252, 128, 20)';
  }
  if (temperature >= 20) {
    return 'rgb(255, 194, 40)';
  }
  if (temperature >= 10) {
    return 'rgb(255, 240, 40)';
  }
  if (temperature >= 0) {
    return 'rgb(194, 255, 40)';
  }
  if (temperature >= -10) {
    return 'rgb(35, 221, 221)';
  }
  if (temperature >= -20) {
    return 'rgb(32, 196, 232)';
  }
  if (temperature >= -30) {
    return 'rgb(32, 140, 236)';
  }
  if (temperature >= -40) {
    return 'rgb(130, 87, 219)';
  }
  return 'rgb(130, 22, 146)';
};

export default getTemperatureColor;
