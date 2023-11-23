import { getCurrentWeather, getAirData } from './WeatherAPI';
import weatherMain from '../components/weatherMain';
import weatherStatus from '../components/weatherStatus';

// Recreate HTML sections with new weather informations
const updateWeather = async (lat, lon) => {
  const dynamicDOMContent = document.querySelector('.js-content');
  const currentWeatherData = await getCurrentWeather(lat, lon);
  const airData = await getAirData(lat, lon);

  const DOMWeatherMain = weatherMain(currentWeatherData);
  const DOMWeatherStatus = weatherStatus(currentWeatherData, airData);

  dynamicDOMContent.appendChild(DOMWeatherMain);
  dynamicDOMContent.appendChild(DOMWeatherStatus);
};

export default updateWeather;
