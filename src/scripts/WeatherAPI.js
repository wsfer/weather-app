const API_KEY = '53adf48f9adafdb91a2ae308a53f4cbd';

const getCityLocations = async (cityName) => {
  const endpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return response.ok
    ? { cities: data, error: data.length > 0 ? '' : 'No city was found' }
    : { cities: [], error: data.message };
};

const getCurrentWeather = async (lat, lon) => {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

const getWeatherForecast = async (lat, lon) => {
  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

const getAirData = async (lat, lon) => {
  const endpoint = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export { getCityLocations, getCurrentWeather, getWeatherForecast, getAirData };
