import './styles/main.scss';
import header from './components/header';
import footer from './components/footer';
import updateWeather from './scripts/updateWeather';

const defaultCoords = [0, 0]; // TODO: add more coords
const dynamicDOMContent = new Range().createContextualFragment(
  '<div class="js-content content"></div>'
);
const backgroundImageContainer = new Range()
  .createContextualFragment('<div class="js-background background"></div>')
  .querySelector('div');

backgroundImageContainer.append(header);
backgroundImageContainer.append(dynamicDOMContent);
backgroundImageContainer.append(footer);

document.body.appendChild(backgroundImageContainer);

// Try getting user location
navigator.geolocation.getCurrentPosition(
  (location) => {
    const { latitude, longitude } = location.coords;
    updateWeather(latitude, longitude);
  },
  () => {
    updateWeather(...defaultCoords);
  }
);
