import './style.css';
import WeatherAPI from './weather-api.js';
import DOMManager from './dom-manager.js';
import ForecastCarousel from './forecast-carousel.js';

let forecastCarousel;

//Try getting user location
navigator.geolocation.getCurrentPosition((location) => {
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;
    WeatherAPI.getCurrentWeather(lat, lon)
        .then((data) => DOMManager.updateWeatherData(data));
    
    setTimeout(() => {
        WeatherAPI.getForecast(lat, lon)
            .then((data) => DOMManager.updateForecastData(data))
            .then((carousel) => forecastCarousel = new ForecastCarousel(...carousel));
    }, 1200);
});