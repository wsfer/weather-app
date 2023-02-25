import './style.css';
import WeatherAPI from './weather-api.js';
import DOMManager from './dom-manager.js';
import ForecastCarousel from './forecast-carousel.js';

let forecastCarousel;
const header = document.querySelector('header');
const loadingScreen = document.querySelector('#loading');
const input = document.querySelector('.input-container > input');
const errorBox = document.querySelector('#error-box');
input.value = '';

//The search function
document.querySelector('#search-box > button').addEventListener('click', () => {
    searchForACity(input.value).then((coords) => {updateWeather(...coords)});
});
input.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        searchForACity(input.value).then((coords) => {
            input.value = '';
            updateWeather(...coords);
        });
    }
});
input.addEventListener('input', () => {
    errorBox.textContent = '';
});
input.addEventListener('focus', () => {
    errorBox.textContent = '';
})

//Change header background-color when scrolling, to be a bit more opaque and hide content below it
window.addEventListener('scroll', (e) => {
    if (window.scrollY > 0) {
        header.style.backgroundColor = 'rgba(17, 17, 17, 0.6)';
    } else if (window.scrollY === 0) {
        header.style.backgroundColor = 'rgba(217, 217, 217, 0.2)';
    }
});

//Try getting user location
navigator.geolocation.getCurrentPosition(function success(location) {
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;
    updateWeather(lat, lon);
}, function failed(err) {
    if (err.code == 1) { //Dfault weather is for London
        searchForACity('London').then((coords) => {updateWeather(...coords)});
    }
});

async function searchForACity(city) {
    try {
        if (!city.length) { 
            throw new Error('You must type a city name');
        }
        const cityLocation = await WeatherAPI.getCityLocation(city);
        if (!cityLocation.length) {
            throw new Error('No city was found');
        }
        return [cityLocation[0].lat, cityLocation[0].lon];
    } catch(err) {
        errorBox.textContent = err.message;
    }
}

async function updateWeather(lat, lon) {
    try {
        loadingScreen.style.height = '100vh';
        const currentWeather = await WeatherAPI.getCurrentWeather(lat, lon);
        const currentForecast = await WeatherAPI.getForecast(lat, lon);
        const airQuality = await WeatherAPI.getAirData(lat, lon);
        DOMManager.updateWeatherData(currentWeather, airQuality);
        const carousel = DOMManager.updateForecastData(currentForecast); //this function return the elements needed for ForecastCarousel creation
        forecastCarousel = new ForecastCarousel(...carousel);
        loadingScreen.style.height = '0';
    } catch(err) {
        errorBox.textContent = 'Failed to load data';
        loadingScreen.style.height = '0';
    }
}