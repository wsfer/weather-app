import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import createMapLayers from '../scripts/createMapLayers';
import 'leaflet/dist/leaflet.css';

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

const weatherMap = (lat, lon) => {
  let currentLegend;
  const { baseLayer, weatherLayers, legends } = createMapLayers();
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
    layers: [baseLayer, weatherLayers.precipitation],
    maxBounds: bounds, // Don't allow user to go out of map borders
    maxBoundsViscosity: 1,
  });

  L.control.layers(weatherLayers, null, { collapsed: false }).addTo(map);
  L.marker([lat, lon], { icon: defaultIcon }).addTo(map);
  legends.precipitation.addTo(map);
  currentLegend = legends.precipitation;

  // Change legend based on selected layer
  map.on('baselayerchange', (event) => {
    const { name } = event;
    const newLegend = legends[name];
    map.removeControl(currentLegend);
    map.addControl(newLegend);
    currentLegend = newLegend;
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
