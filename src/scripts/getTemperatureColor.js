const getTemperatureColor = (temperature) => {
  if (temperature >= 45) {
    return 'rgb(255, 0, 255)';
  }
  if (temperature >= 30) {
    return 'rgb(255, 0, 0)';
  }
  if (temperature >= 15) {
    return 'rgb(255, 255, 0)';
  }
  if (temperature >= 0) {
    return 'rgb(0, 0, 255)';
  }
  return 'rgb(0, 255, 255)';
};

export default getTemperatureColor;
