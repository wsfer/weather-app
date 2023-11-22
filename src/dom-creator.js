import SVGIcons from './assets/SVGIcons';

class DOMCreator {
  #range;

  constructor() {
    this.#range = new Range();
  }

  createMainSection(data) {
    const time = new Date(data.dt * 1000);
    const hours =
      time.getHours() >= 10 ? time.getHours() : `0${time.getHours()}`;
    const minutes =
      time.getMinutes() >= 10 ? time.getMinutes() : `0${time.getMinutes()}`;
    const { description } = data.weather[0];

    const DOMContent = this.#range.createContextualFragment(
      `<h2 class="location">${data.name}, ${data.state || data.sys.country}</h2>
        <img src="http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" alt="${data.weather[0].description}" class="icon">
        <h3 class="temperature" style="color:${this.#getTemperatureColor(
          data.main.temp
        )}">${Math.round(data.main.temp)}ºC</h3>
        <p class="description">${
          description[0].toUpperCase() + description.slice(1)
        }</p>
        <p class="update-time">Updated at ${hours}:${minutes}</p>`
    );

    return DOMContent;
  }

  createAdditionalSection(data, airData) {
    /* about wind direction: https://en.wikipedia.org/wiki/Wind_direction

             0deg = north 90deg = east    180deg = south  270deg = west
             arrow-up     arrow-right     arrow-down      arrow-left

             ...so just take the value as -(deg) for rotate property */

    const max = data.main.temp_max;
    const min = data.main.temp_min;
    const feels = data.main.feels_like;
    let rain;
    let snow;
    const airQuality = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    const airQualityColor = [
      'rgb(0, 0, 255)',
      'rgb(128, 128, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 0)',
      'rgb(255, 0, 0)',
    ];
    if (data.rain) {
      rain = `<div>
            <span>${SVGIcons.rain} Rain: </span>
            <span class="rain">
                ${data.rain['1h']}mm
            </span>
        </div>`;
    } else {
      rain = '';
    }

    if (data.snow) {
      snow = `<div>
            <span>${SVGIcons.snow} Snow: </span>
            <span>
                ${data.snow['1h']}mm
            </span>
        </div>`;
    } else {
      snow = '';
    }

    const DOMContent = this.#range.createContextualFragment(
      `<div>
            <div>
                <span>${SVGIcons.termometer} Feels like: </span>
                <span style="color: ${this.#getTemperatureColor(feels)}">
                    ${Math.round(feels)}ºC
                </span>
            </div>
            <div>
                <span>${SVGIcons.wind} Wind: </span>
                <span>
                    <svg style="width: 1rem; height: 1rem; transform: rotate(${-data
                      .wind
                      .deg}deg); margin-right: 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path style="fill: #b3b3cc" d="M14,20H10V11L6.5,14.5L4.08,12.08L12,4.16L19.92,12.08L17.5,14.5L14,11V20Z" />
                    </svg>
                <span>
                    ${data.wind.speed}mph
                </span>
            </div>
            <div>
                <span>${SVGIcons.cloud} Cloudiness: </span>
                <span class="cloudiness">
                    ${data.clouds.all}%
                </span>
            </div>
        </div>
        <div>
            <div>
                <span>${SVGIcons.celsius} Max/min: </span>
                <span>
                    <span style="color: ${this.#getTemperatureColor(
                      max
                    )}">${Math.round(
                      max
                    )}º</span>/<span style="color: ${this.#getTemperatureColor(
                      min
                    )}">${Math.round(min)}º</span>
                </span>
            </div>
            <div>
                <span>${SVGIcons.pressure} Pressure: </span>
                <span>
                    ${data.main.pressure}hPa
                </span>
            </div>
            ${rain}
            ${snow}
        </div>
        <div>
            <div>
                <span>${SVGIcons.water} Humidity: </span>
                <span>
                    ${data.main.humidity}%
                </span>
            </div>
            <div>
                <span>${SVGIcons.air} Air Quality: </span>
                <span style="color: ${
                  airQualityColor[airData.list[0].main.aqi - 1]
                }">
                     ${airQuality[airData.list[0].main.aqi - 1]}
                </span>
            </div>
        </div>`
    );
    return DOMContent;
  }

  createForecastSection(data) {
    const forecastFrag = document.createDocumentFragment();

    data.list
      .map((obj) => this.#createForecastBox(obj))
      .forEach((element) => {
        forecastFrag.appendChild(element);
      });

    const DOMContent = this.#range.createContextualFragment(
      `<button id="previous">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20,10V14H11L14.5,17.5L12.08,19.92L4.16,12L12.08,4.08L14.5,6.5L11,10H20Z" />
            </svg>
        </button>
        <div id="forecast-slider">
            <div id="forecast-container"></div>
        </div>
        <button id="next">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M4,10V14H13L9.5,17.5L11.92,19.92L19.84,12L11.92,4.08L9.5,6.5L13,10H4Z" />
            </svg>
        </button>
        <div id="forecast-controls">${'<button></button>'.repeat(
          data.list.length / 5
        )}</div>`
    );

    DOMContent.querySelector('#forecast-container').appendChild(forecastFrag);

    return DOMContent;
  }

  createBackgroundLegend(legend) {
    return this.#range.createContextualFragment(legend);
  }

  #createForecastBox(dataObj) {
    const time = new Date(dataObj.dt * 1000);
    const hours =
      time.getHours() >= 10 ? time.getHours() : `0${time.getHours()}`;
    const dayOfWeek = [
      'Sun.',
      'Mon.',
      'Tues.',
      'Wed.',
      'Thurs.',
      'Fri.',
      'Sat.',
    ][time.getDay()];
    const { description } = dataObj.weather[0];

    return this.#range.createContextualFragment(
      `<div class="forecast-content">
            <h4 class="forecast-time">${dayOfWeek} ${time.getDate()}, ${hours}:00</h4>
            <img src="http://openweathermap.org/img/wn/${
              dataObj.weather[0].icon
            }@2x.png" alt="${
              dataObj.weather[0].description
            }" class="forecast-icon">
            <p class="forecast-temperature" style="color: ${this.#getTemperatureColor(
              dataObj.main.temp
            )}">${Math.round(dataObj.main.temp)}ºC</p>
            <p class="forecast-description">${
              description[0].toUpperCase() + description.slice(1)
            }</p>
        </div>`
    );
  }

  #getTemperatureColor(temp) {
    let tempColor;
    /* About temperature color:
              50ºC = pink/rgb(255, 0, 255)
                  ^ inc blue by (temp-35)*17 ^
              35ºC = red/rgb(255, 0, 0)
                  ^ dec green by 255-((temp-20)*17) ^
              20ºC = yellow/rgb(255, 255, 0)
                  ^ inc red and green by (temp-5)*17 ^
                  ^ dec blue by 255-((temp-5)*17)
              5º = blue/rgb(0, 0, 255)
                  ^ dec green by 255-((temp+10)*17) ^
              -10ºC = light blue/rgb(0, 255, 255)
          */
    if (temp > 50) {
      // Who knows where will be more than 50ºC...
      tempColor = 'rgb(255, 0, 255)';
    } else if (temp >= 35) {
      tempColor = `rgb(255, 0, ${Math.round((temp - 35) * 17)})`;
    } else if (temp >= 20) {
      tempColor = `rgb(255, ${255 - Math.round((temp - 20) * 17)}, 0)`;
    } else if (temp >= 5) {
      tempColor = `rgb(${Math.round((temp - 5) * 17)}, ${Math.round(
        (temp - 5) * 17
      )}, ${Math.round(255 - (temp - 5) * 17)})`;
    } else if (temp >= -10) {
      tempColor = `rgb(0, ${255 - Math.round(-(temp - 5) * 15)}, 255)`;
    } else if (temp < -10) {
      tempColor = 'rgb(0, 255, 255)';
    }
    return tempColor;
  }
}

export default DOMCreator;
