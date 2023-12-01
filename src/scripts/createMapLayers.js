import L from 'leaflet';
import createMapLegends from './createMapLegends';

const API_KEY = '53adf48f9adafdb91a2ae308a53f4cbd';
const OPEN_STREET_MAP = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const WEATHER_PRECIPITATION = `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
const WEATHER_TMPERATURE = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
const WEATHER_CLOUDS = `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
const WEATHER_WIND = `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
const WEATHER_PRESSURE = `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
const ATTRIBUITION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a><span aria-hidden="true"> | </span><a href="https://openweathermap.org/">OpenWeather</a>';

const createMapLayers = () => {
  const baseLayer = L.tileLayer(OPEN_STREET_MAP, { attribution: ATTRIBUITION });
  const precipitationLayer = L.tileLayer(WEATHER_PRECIPITATION);
  const temperatureLayer = L.tileLayer(WEATHER_TMPERATURE);
  const cloudsLayer = L.tileLayer(WEATHER_CLOUDS);
  const windLayer = L.tileLayer(WEATHER_WIND);
  const pressureLayer = L.tileLayer(WEATHER_PRESSURE);

  return {
    baseLayer,
    weatherLayers: {
      precipitation: precipitationLayer,
      temperature: temperatureLayer,
      clouds: cloudsLayer,
      wind: windLayer,
      pressure: pressureLayer,
    },
    legends: createMapLegends(),
  };
};

export default createMapLayers;
