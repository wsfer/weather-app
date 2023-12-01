import L from 'leaflet';

const createMapLegends = () => {
  const precipitation = L.control({ position: 'bottomright' });
  precipitation.onAdd = () => {
    const div = L.DomUtil.create('div', 'weather-map__map__legend');
    div.innerHTML = `
        <h3 class="weather-map__map__legend__title">Precipitation mm/h</h3>
        <div class="weather-map__map__legend__values">
          <span>0  </span>
          <span>0.1</span>
          <span>0.2</span>
          <span>0.5</span>
          <span>1  </span>
          <span>10 </span>
          <span>140</span>
        </div>
        <div class="weather-map__map__legend__scale weather-map__map__legend__scale--precipitation"></div>`;

    return div;
  };

  const temperature = L.control({ position: 'bottomright' });
  temperature.onAdd = () => {
    const div = L.DomUtil.create('div', 'weather-map__map__legend');
    div.innerHTML = `
        <h3 class="weather-map__map__legend__title">Temperature ºC</h3>
        <div class="weather-map__map__legend__values">
          <span>-40</span>
          <span>-30</span>
          <span>-20</span>
          <span>-10</span>
          <span>  0</span>
          <span> 10</span>
          <span> 20</span>
          <span> 30</span>
        </div>
        <div class="weather-map__map__legend__scale weather-map__map__legend__scale--temperature"></div>`;

    return div;
  };

  const clouds = L.control({ position: 'bottomright' });
  clouds.onAdd = () => {
    const div = L.DomUtil.create('div', 'weather-map__map__legend');
    div.innerHTML = `
        <h3 class="weather-map__map__legend__title">Clouds %</h3>
        <div class="weather-map__map__legend__values">
          <span>0  </span>
          <span>25 </span>
          <span>50 </span>
          <span>75 </span>
          <span>100</span>
        </div>
        <div class="weather-map__map__legend__scale weather-map__map__legend__scale--clouds"></div>`;

    return div;
  };

  const wind = L.control({ position: 'bottomright' });
  wind.onAdd = () => {
    const div = L.DomUtil.create('div', 'weather-map__map__legend');
    div.innerHTML = `
        <h3 class="weather-map__map__legend__title">Wind m/s</h3>
        <div class="weather-map__map__legend__values">
          <span>1  </span>
          <span>5  </span>
          <span>15 </span>
          <span>25 </span>
          <span>50 </span>
          <span>100</span>
          <span>200</span>
        </div>
        <div class="weather-map__map__legend__scale weather-map__map__legend__scale--wind"></div>`;

    return div;
  };

  const pressure = L.control({ position: 'bottomright' });
  pressure.onAdd = () => {
    const div = L.DomUtil.create('div', 'weather-map__map__legend');
    div.innerHTML = `
        <h3 class="weather-map__map__legend__title">Pressure hPa</h3>
        <div class="weather-map__map__legend__values">
          <span>940 </span>
          <span>960 </span>
          <span>980 </span>
          <span>1000</span>
          <span>1010</span>
          <span>1020</span>
          <span>1040</span>
          <span>1060</span>
          <span>1080</span>
        </div>
        <div class="weather-map__map__legend__scale weather-map__map__legend__scale--pressure"></div>`;

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
