import L from 'leaflet';

const createMapLegends = () => {
  const precipitation = L.control({ position: 'bottomright' });
  precipitation.onAdd = () => {
    const div = L.DomUtil.create('div', 'weather-map__map__legend');
    div.innerHTML = 'precipitation';
    return div;
  };

  const temperature = L.control({ position: 'bottomright' });
  temperature.onAdd = () => {
    const div = L.DomUtil.create('div', 'weather-map__map__legend');
    div.innerHTML = 'temperature';
    return div;
  };

  const clouds = L.control({ position: 'bottomright' });
  clouds.onAdd = () => {
    const div = L.DomUtil.create('div', 'weather-map__map__legend');
    div.innerHTML = 'clouds';
    return div;
  };

  const wind = L.control({ position: 'bottomright' });
  wind.onAdd = () => {
    const div = L.DomUtil.create('div', 'weather-map__map__legend');
    div.innerHTML = 'wind';
    return div;
  };

  const pressure = L.control({ position: 'bottomright' });
  pressure.onAdd = () => {
    const div = L.DomUtil.create('div', 'weather-map__map__legend');
    div.innerHTML = 'pressure';
    return div;
  };

  return {
    precipitation,
    temperature,
    clouds,
    wind,
    pressure,
  };
};

export default createMapLegends;
