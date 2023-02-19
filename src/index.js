import './style.css';
import WeatherAPI from './weather-api.js';
import DOMManager from './dom-manager.js';

navigator.geolocation.getCurrentPosition((location) => {
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;
    const response = WeatherAPI.getCurrentWeather(lat, lon);
    response.then((data) => DOMManager.updateWeatherData(data));
});