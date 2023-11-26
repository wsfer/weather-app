import getFlagEmoji from '../assets/getFlagEmoji';
import SVGIcons from '../assets/SVGIcons';
import updateWeather from '../scripts/updateWeather';
import { getCityLocations } from '../scripts/WeatherAPI';

// Header takes care of city search and is static (never changes or is recreated)
const header = new Range()
  .createContextualFragment(
    `<header class="header">
        <h1 class="header__title">${SVGIcons.tornado} Weather</h1>
        <form class="js-search-form header__search-form">
            <label
                class="header__search-form__label"
                for="city"
            ><span class="sr-only">Search for a city</span></label>
            <div class="header__search-form__input-container">
                ${SVGIcons.magnify}
                <input
                    class="js-search-input header__search-form__input-container__input"
                    type="search"
                    id="city"
                    name="city"
                    placeholder="Search for a city..."
                >
                <button class="header__search-form__input-container__button">Search</button>
                <ul class="js-search-result header__search-form__input-container__results"></ul>
                <span class="js-search-error-box header__search-form__input-container__error-box"></span>
            </div>
        </form>
    </header>`
  )
  .querySelector('header');

const form = header.querySelector('.js-search-form');
const searchInput = header.querySelector('.js-search-input');
const cityList = header.querySelector('.js-search-result');
const errorBox = header.querySelector('.js-search-error-box');

const showSearchResultsOnCityList = (cities) => {
  cities.forEach((city) => {
    const { name, country, state, lat, lon } = city;
    const listItem = new Range().createContextualFragment(
      `<li class="header__search-form__input-container__results__item">
            <button class="header__search-form__input-container__results__item__button" type="button">
                ${name}, ${state ?? country} ${getFlagEmoji(country)}
            </button>
        </li>`
    );
    const button = listItem.querySelector('button');
    button.addEventListener('click', () => {
      cityList.textContent = '';
      searchInput.value = '';
      updateWeather(lat, lon);
    });
    cityList.appendChild(listItem);
  });
};

const searchForACity = async (event) => {
  event.preventDefault();
  const cityName = searchInput.value;

  cityList.textContent = '';
  searchInput.value = '';

  const searchAttempt = await getCityLocations(cityName);
  showSearchResultsOnCityList(searchAttempt.cities); // Empty array on failure, which generates nothing
  errorBox.textContent = searchAttempt.error; // Empty string on success
};

const hideSearchResults = (event) => {
  const { target } = event;
  const searchForm = header.querySelector('.js-search-form');
  if (!searchForm.contains(target)) {
    cityList.textContent = '';
  }
};

form.addEventListener('submit', searchForACity);
form.addEventListener('focus', () => {
  errorBox.textContent = '';
});
document.body.addEventListener('click', hideSearchResults);

export default header;
