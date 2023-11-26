import Clear from '../assets/images/clear.jpg';
import Clouds from '../assets/images/clouds.jpg';
import Drizzle from '../assets/images/drizzle.jpg';
import Iceberg from '../assets/images/iceberg.jpg';
import Mist from '../assets/images/mist.jpg';
import Rain from '../assets/images/rain.jpg';
import Snow from '../assets/images/snow.jpg';
import Sun from '../assets/images/sun.jpg';
import Thunderstorm from '../assets/images/thunderstorm.jpg';

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
