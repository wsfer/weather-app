import getTemperatureColor from '../assets/getTemperatureColor';

const weatherMain = (data) => {
  const { name, state, dt, weather, main } = data;
  const { country } = data.sys;
  const { description, icon } = weather[0];
  const time = new Date(dt * 1000);
  const hours = time.getHours() >= 10 ? time.getHours() : `0${time.getHours()}`;
  const minutes =
    time.getMinutes() >= 10 ? time.getMinutes() : `0${time.getMinutes()}`;

  return new Range().createContextualFragment(
    `<main class="main-weather">
        <h2 class="main-weather__title">
            <span class="sr-only">Weather on </span>${name}, ${state ?? country}
        </h2>
        <img
            class="main-weather__icon"
            src="http://openweathermap.org/img/wn/${icon}@2x.png"
            alt="${description}">
        <p
            class="main-weather__temperature"
            style="color:${getTemperatureColor(main.temp)}">
            ${Math.round(main.temp)}ºC
        </p>
        <p class="main-weather__description">${
          description[0].toUpperCase() + description.slice(1)
        }</p>
        <p class="main-weather__update-time">Updated at ${hours}:${minutes}</p>
    </main>`
  );
};

export default weatherMain;
