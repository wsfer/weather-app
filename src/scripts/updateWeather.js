import { getCurrentWeather, getAirData } from './WeatherAPI';
import weatherMain from '../components/weatherMain';
import weatherStatus from '../components/weatherStatus';
import getWeatherImage from '../assets/getWeatherImage';

// Recreate HTML sections with new weather informations
const updateWeather = async (lat, lon) => {
  const dynamicDOMContent = document.querySelector('.js-content');
  const backgroundImageContainer = document.querySelector('.js-background');

  const currentWeatherData = await getCurrentWeather(lat, lon);
  const airData = await getAirData(lat, lon);

  const DOMWeatherMain = weatherMain(currentWeatherData);
  const DOMWeatherStatus = weatherStatus(currentWeatherData, airData);
  const weather = currentWeatherData.weather[0].main;
  const image = getWeatherImage(weather);

  dynamicDOMContent.appendChild(DOMWeatherMain);
  dynamicDOMContent.appendChild(DOMWeatherStatus);
  backgroundImageContainer.style.backgroundImage = `linear-gradient(rgb(0, 0, 0, 0.7), rgb(0, 0, 0, 0.7)), url('${image}')`;
};

export default updateWeather;
