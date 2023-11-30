import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

const API_KEY = '53adf48f9adafdb91a2ae308a53f4cbd';
const OPEN_STREET_MAP = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const WEATHER_PRECIPITATION = `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
const WEATHER_TMPERATURE = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
const WEATHER_CLOUDS = `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
const WEATHER_WIND = `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
const WEATHER_PRESSURE = `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
const ATTRIBUITION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a><span aria-hidden="true"> | </span><a href="https://openweathermap.org/">OpenWeather</a>';

// This fix missing marker icon
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerIcon2x,
  iconSize: [25, 41],
  shadowSize: [41, 41],
  iconAnchor: [12, 41],
  shadowAnchor: [4, 62],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

// Layers
const baseLayer = L.tileLayer(OPEN_STREET_MAP, { attribution: ATTRIBUITION });
const precipitationLayer = L.tileLayer(WEATHER_PRECIPITATION);
const temperatureLayer = L.tileLayer(WEATHER_TMPERATURE);
const cloudsLayer = L.tileLayer(WEATHER_CLOUDS);
const windLayer = L.tileLayer(WEATHER_WIND);
const pressureLayer = L.tileLayer(WEATHER_PRESSURE);

// Legends - TODO: add html content
const precipitationLegend = L.control({ position: 'bottomright' });
precipitationLegend.onAdd = () => {
  const div = L.DomUtil.create('div', 'weather-map__map__legend');
  div.innerHTML = 'precipitation';
  return div;
};

const temperatureLegend = L.control({ position: 'bottomright' });
temperatureLegend.onAdd = () => {
  const div = L.DomUtil.create('div', 'weather-map__map__legend');
  div.innerHTML = 'temperature';
  return div;
};

const cloudsLegend = L.control({ position: 'bottomright' });
cloudsLegend.onAdd = () => {
  const div = L.DomUtil.create('div', 'weather-map__map__legend');
  div.innerHTML = 'clouds';
  return div;
};

const windLegend = L.control({ position: 'bottomright' });
windLegend.onAdd = () => {
  const div = L.DomUtil.create('div', 'weather-map__map__legend');
  div.innerHTML = 'wind';
  return div;
};

const pressureLegend = L.control({ position: 'bottomright' });
pressureLegend.onAdd = () => {
  const div = L.DomUtil.create('div', 'weather-map__map__legend');
  div.innerHTML = 'pressure';
  return div;
};

// Used when changing layers to change legend together
const layerToLegend = new Map([
  [precipitationLayer, precipitationLegend],
  [temperatureLayer, temperatureLegend],
  [cloudsLayer, cloudsLegend],
  [windLayer, windLegend],
  [pressureLayer, pressureLegend],
  ['current', precipitationLegend], // Also stores current active legend
]);

const weatherLayers = {
  Precipitation: precipitationLayer,
  Temperature: temperatureLayer,
  Clouds: cloudsLayer,
  Wind: windLayer,
  Pressure: pressureLayer,
};

const weatherMap = (lat, lon) => {
  const DOMContent = new Range().createContextualFragment(
    `<section class="weather-map">
      <h2 class="weather-map__title">Weather Map</h2>
      <div class="weather-map__map" id="map"></div>
    </section>`
  );
  const mapContainer = DOMContent.querySelector('#map');
  const southWest = L.latLng(-90, -180);
  const northEast = L.latLng(90, 180);
  const bounds = L.latLngBounds(southWest, northEast);
  const map = L.map(mapContainer, {
    center: [lat, lon],
    zoom: 10,
    minZoom: 3,
    layers: [baseLayer, precipitationLayer],
    maxBounds: bounds, // Don't allow user to go out of map borders
    maxBoundsViscosity: 1,
  });

  L.control.layers(weatherLayers, null, { collapsed: false }).addTo(map);
  L.marker([lat, lon], { icon: defaultIcon }).addTo(map);
  precipitationLegend.addTo(map);

  // Change legend based on selected layer
  map.on('baselayerchange', (event) => {
    const { layer } = event;
    const currentLegend = layerToLegend.get('current');
    const newLegend = layerToLegend.get(layer);
    map.removeControl(currentLegend);
    map.addControl(newLegend);
    layerToLegend.set('current', newLegend);
  });

  // Allows leaflet to recalculate map size after it's rendered on DOM, avoiding some bugs
  const observer = new MutationObserver(() => {
    map.invalidateSize();
    observer.disconnect();
  });

  observer.observe(mapContainer, {
    attributes: true,
    childList: true,
    subtree: true,
  });

  return DOMContent;
};

export default weatherMap;
