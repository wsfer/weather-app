import getFlagEmoji from '../assets/getFlagEmoji';
import SVGIcons from '../assets/SVGIcons';
import updateWeather from '../scripts/updateWeather';
import { getCityLocations } from '../scripts/WeatherAPI';

// Header takes care of city search and is static (never changes or is recreated)
const header = new Range().createContextualFragment(
  `<header>
        <h1>${SVGIcons.tornado} Weather</h1>
        <form class="js-search-form search-form">
            <label
                class="search-form__label"
                for="city"
            ><span class="sr-only">Search for a city</span></label>
            <div class="search-form__input-container">
                <input
                    style="color: black"
                    class="js-search-input search-form__input"
                    type="search"
                    id="city"
                    name="city"
                    placeholder="Search for a city..."
                >
                <button class="search-form__button">Search</button>
                <ul class="js-search-result search-form__results"></ul>
            </div>
            <span class="js-search-error-box search-form__error-box"></span>
        </form>
    </header>`
);

const form = header.querySelector('.js-search-form');
const searchInput = header.querySelector('.js-search-input');
const cityList = header.querySelector('.js-search-result');
const errorBox = header.querySelector('.js-search-error-box');

const showSearchResultsOnCityList = (cities) => {
  cities.forEach((city) => {
    const { name, country, state, lat, lon } = city;
    const listItem = new Range().createContextualFragment(
      `<li class="search-form__results__list-item">
            <button class="search-form__results__list-item__button" type="button">
                ${name}, ${state ?? country} ${getFlagEmoji(country)}
            </button>
        </li>`
    );
    const button = listItem.querySelector('button');
    button.addEventListener('click', () => {
      cityList.textContent = '';
      updateWeather(lat, lon);
    });
    cityList.appendChild(listItem);
  });
};

const searchForACity = async (event) => {
  event.preventDefault();
  const cityName = searchInput.value;

  cityList.textContent = '';
  searchInput.textContent = '';

  const searchAttempt = await getCityLocations(cityName);
  showSearchResultsOnCityList(searchAttempt.cities); // Empty array on failure, which generates nothing
  errorBox.textContent = searchAttempt.error; // Empty string on success
};

form.addEventListener('submit', searchForACity);
form.addEventListener('focus', () => {
  errorBox.textContent = '';
});

export default header;
