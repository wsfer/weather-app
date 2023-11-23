import SVGIcons from '../assets/SVGIcons';
import getTemperatureColor from '../assets/getTemperatureColor';

const weatherStatus = (data, airData) => {
  const { main, rain, snow, wind, clouds } = data;
  const { sunrise, sunset } = data.sys;

  const sunriseTime = new Date(sunrise * 1000);
  const sunriseHours =
    sunriseTime.getHours() >= 10
      ? sunriseTime.getHours()
      : `0${sunriseTime.getHours()}`;
  const sunriseMinutes =
    sunriseTime.getMinutes() >= 10
      ? sunriseTime.getMinutes()
      : `0${sunriseTime.getMinutes()}`;

  const sunsetTime = new Date(sunset * 1000);
  const sunsetHours =
    sunsetTime.getHours() >= 10
      ? sunsetTime.getHours()
      : `0${sunsetTime.getHours()}`;
  const sunsetMinutes =
    sunsetTime.getMinutes() >= 10
      ? sunsetTime.getMinutes()
      : `0${sunsetTime.getMinutes()}`;

  const airQuality = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  const airQualityColor = [
    'rgb(0, 0, 255)',
    'rgb(128, 128, 255)',
    'rgb(255, 255, 255)',
    'rgb(255, 255, 0)',
    'rgb(255, 0, 0)',
  ];

  return new Range().createContextualFragment(
    `<section class="weather-status">
        <h2 class="sr-only">Weather status</h2>
        <ul class="weather-status__list">
            <li class="weather-status__list__item">
                <span>${SVGIcons.termometer} Feels like: </span>
                <span style="color: ${getTemperatureColor(main.feels_like)}">
                    ${Math.round(main.feels_like)}ºC
                </span>
            </li>
            <li class="weather-status__list__item">
                <span>${SVGIcons.wind} Wind: </span>
                <span>${SVGIcons.windArrow(wind.deg)} ${wind.speed}mph</span>
            </li>
            <li class="weather-status__list__item">
                <span>${SVGIcons.cloud} Cloudiness: </span>
                <span class="cloudiness">${clouds.all}%</span>
            </li>
            <li class="weather-status__list__item">
                <span>${SVGIcons.celsius} Max/min: </span>
                <span>
                    <span style="color: ${getTemperatureColor(
                      main.temp_max
                    )}">${Math.round(
                      main.temp_max
                    )}º</span>/<span style="color: ${getTemperatureColor(
                      main.temp_min
                    )}">${Math.round(main.temp_min)}º</span>
                </span>
            <li class="weather-status__list__item">
            <li class="weather-status__list__item">
                <span>${SVGIcons.pressure} Pressure: </span>
                <span>${main.pressure}hPa</span>
            </li>
            ${
              rain
                ? `<li class="weather-status__list__item">
                    <span>${SVGIcons.rain} Rain: </span>
                    <span>${rain['1h']}mm</span>
                </li>`
                : ''
            }
            ${
              snow
                ? `<li class="weather-status__list__item">
                    <span>${SVGIcons.snow} Snow: </span>
                    <span>${snow['1h']}mm</span>
                </li>`
                : ''
            }
            <li class="weather-status__list__item">
                <span>${SVGIcons.water} Humidity: </span>
                <span>${main.humidity}%</span>
            </li>
            <li class="weather-status__list__item">
                <span>${SVGIcons.air} Air Quality: </span>
                <span style="color: ${
                  airQualityColor[airData.list[0].main.aqi - 1]
                }">
                     ${airQuality[airData.list[0].main.aqi - 1]}
                </span>
            </li>
            <li class="weather-status__list__item">
                <span>${SVGIcons.sunrise} Sunrise: </span>
                <span>${sunriseHours}:${sunriseMinutes}</span>
            </li>
            <li class="weather-status__list__item">
                <span>${SVGIcons.sunset} Sunset: </span>
                <span>${sunsetHours}:${sunsetMinutes}</span>
            </li>
        </ul>
    </section>`
  );
};

export default weatherStatus;
