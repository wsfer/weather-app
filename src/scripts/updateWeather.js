import {
  getCurrentWeather,
  getWeatherForecast,
  getAirData,
} from './WeatherAPI';
import weatherMain from '../components/weatherMain';
import weatherStatus from '../components/weatherStatus';
import weatherForecast from '../components/weatherForecast';
import getWeatherImage from '../assets/getWeatherImage';
import loading from '../components/loading';

// Recreate HTML sections with new weather informations
const updateWeather = async (lat, lon) => {
  const dynamicDOMContent = document.querySelector('.js-content');
  const backgroundImageContainer = document.querySelector('.js-background');

  dynamicDOMContent.textContent = ''; // Clear old content
  dynamicDOMContent.appendChild(loading());

  const currentWeatherData = await getCurrentWeather(lat, lon);
  const forecastData = await getWeatherForecast(lat, lon);
  const airData = await getAirData(lat, lon);

  const DOMWeatherMain = weatherMain(currentWeatherData);
  const DOMWeatherStatus = weatherStatus(currentWeatherData, airData);
  const DOMWeatherForecast = weatherForecast(forecastData);
  const weather = currentWeatherData.weather[0].main;
  const image = getWeatherImage(weather);

  dynamicDOMContent.textContent = ''; // Remove loading bar
  dynamicDOMContent.appendChild(DOMWeatherMain);
  dynamicDOMContent.appendChild(DOMWeatherStatus);
  dynamicDOMContent.appendChild(DOMWeatherForecast);
  backgroundImageContainer.style.backgroundImage = `linear-gradient(rgb(0, 0, 0, 0.7), rgb(0, 0, 0, 0.7)), url('${image}')`;
};

export default updateWeather;
