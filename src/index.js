import './style.css';
import weatherAPI from './weather-api.js';

/*navigator.geolocation.getCurrentPosition((data) => {
    const lat = data.coords.latitude;
    const lon = data.coords.longitude;
    weatherAPI.getWeatherData(lat, lon)
        .then((inf) => {
            console.log(inf);
        });
});*/