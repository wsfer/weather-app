import './styles/main.scss';
import header from './components/header';
import footer from './components/footer';
import loading from './components/loading';
import updateWeather from './scripts/updateWeather';

const defaultCoords = [
  [51.5073219, -0.1276474],
  [48.8588897, 2.3200410217200766],
  [-33.8698439, 151.2082848],
  [43.6534817, -79.3839347],
  [-23.5506507, -46.6333824],
  [30.0443879, 31.2357257],
  [-34.6075682, -58.4370894],
  [52.5170365, 13.3888599],
  [13.7524938, 100.4935089],
  [40.7127281, -74.0060152],
];
const dynamicDOMContent = new Range()
  .createContextualFragment('<div class="js-content content"></div>')
  .querySelector('div');
const backgroundImageContainer = new Range()
  .createContextualFragment('<div class="js-background background"></div>')
  .querySelector('div');

dynamicDOMContent.appendChild(loading());
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
    const randomIndex = Math.floor(Math.random() * defaultCoords.length);
    const randomCoords = defaultCoords[randomIndex];
    updateWeather(...randomCoords);
  }
);
