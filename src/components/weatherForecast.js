import getTemperatureColor from '../assets/getTemperatureColor';

const createForecastBoxTemplate = (data) => {
  const { description, icon } = data.weather[0];
  const temperature = data.main.temp;
  const time = new Date(data.dt * 1000);
  const hours = time.getHours() >= 10 ? time.getHours() : `0${time.getHours()}`;
  const dayOfWeek = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.'][
    time.getDay()
  ];

  return `<article class="weather-forecast__forecast-list__item__box">
            <h3 class="weather-forecast__forecast-list__item__box__time">
              <span class="sr-only">Weather at </span>${dayOfWeek} ${time.getDate()}, ${hours}:00
            </h3>
            <img
              class="weather-forecast__forecast-list__item__box__icon"
              src="http://openweathermap.org/img/wn/${icon}@2x.png"
              alt="${description}">
            <p
              class="weather-forecast__forecast-list__item__box__temperature"
              style="color: ${getTemperatureColor(temperature)}">
              ${Math.round(temperature)}ºC
            </p>
            <p class="weather-forecast__forecast-list__item__box__description">${
              description[0].toUpperCase() + description.slice(1)
            }</p>
          </article>`;
};

const weatherForecast = (forecastData) => {
  const forecastBoxes = forecastData.list
    .map(
      (data) => `<li class="weather-forecast__forecast-list__item">
                  ${createForecastBoxTemplate(data)}
                </li>`
    )
    .join('');

  return new Range().createContextualFragment(`
    <section class="weather-forecast">
      <h2 class="weather-forecast__title">Forecast</h2>
      <ul class="weather-forecast__forecast-list">
        ${forecastBoxes}
      </ul>
    </section>
  `);
};

export default weatherForecast;
