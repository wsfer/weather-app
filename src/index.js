import './style.css';
import WeatherAPI from './weather-api.js';
import DOMManager from './dom-manager.js';
import ForecastCarousel from './forecast-carousel.js';

let forecastCarousel;
const loadingScreen = document.querySelector('#loading');
const input = document.querySelector('.input-container > input');

document.querySelector('#search-box > button').addEventListener('click', () => {
    searchForACity(input.value)
        .then((coords) => {
            updateWeather(...coords);
        });
});

//Try getting user location
navigator.geolocation.getCurrentPosition((location) => {
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;
    updateWeather(lat, lon);
});

async function searchForACity(city) {
    const cityLocation = await WeatherAPI.getCityLocation(city);
    return [cityLocation[0].lat, cityLocation[0].lon];
}

async function updateWeather(lat, lon) {
    loadingScreen.style.height = '100vh';
    const currentWeather = await WeatherAPI.getCurrentWeather(lat, lon);
    const currentForecast = await WeatherAPI.getForecast(lat, lon);
    const airQuality = await WeatherAPI.getAirData(lat, lon);
    DOMManager.updateWeatherData(currentWeather, airQuality);
    const carousel = DOMManager.updateForecastData(currentForecast); //this function return the elements needed for ForecastCarousel creation
    forecastCarousel = new ForecastCarousel(...carousel);
    loadingScreen.style.height = '0';
}