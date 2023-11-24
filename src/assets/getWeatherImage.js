import Clear from './images/clear.jpg';
import Clouds from './images/clouds.jpg';
import Drizzle from './images/drizzle.jpg';
import Iceberg from './images/iceberg.jpg';
import Mist from './images/mist.jpg';
import Rain from './images/rain.jpg';
import Snow from './images/snow.jpg';
import Sun from './images/sun.jpg';
import Thunderstorm from './images/thunderstorm.jpg';

const getWeatherImage = (weather, temperature) => {
  if (temperature >= 37) {
    return Sun;
  }
  if (temperature <= -20) {
    return Iceberg;
  }
  switch (weather.toLowerCase()) {
    case 'thunderstorm':
      return Thunderstorm;
    case 'drizzle':
      return Drizzle;
    case 'rain':
      return Rain;
    case 'snow':
      return Snow;
    case 'clear':
      return Clear;
    case 'clouds':
      return Clouds;
    default:
      return Mist;
  }
};

export default getWeatherImage;
