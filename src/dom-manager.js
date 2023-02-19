class DOMManager {
    #location;
    #icon;
    #temperature;
    #description;
    #time;
    #feelsTemp;
    #wind;
    #maxMin;
    #rain;
    #humidity;
    #snow;
    constructor() {
        this.#location = document.querySelector('.location');
        this.#icon = document.querySelector('.icon');
        this.#temperature = document.querySelector('.temperature');
        this.#description = document.querySelector('.description');
        this.#time = document.querySelector('.time');
        this.#feelsTemp = document.querySelector('.feels-temperature');
        this.#wind = document.querySelector('.wind');
        this.#maxMin = document.querySelector('.max-min');
        this.#rain = document.querySelector('.rain');
        this.#humidity = document.querySelector('.humidity');
        this.#snow = document.querySelector('.snow');
    }

    updateWeatherData(data) {
        this.#updateMainWeather(data);
        this.#updateBackgroundImage(data.weather[0].main, data.main.temp);
        console.log(data);
    }

    #updateMainWeather(data) {
        this.#location.textContent = data.name + ', ' + (data.state || data.sys.country);
        this.#icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        this.#icon.alt = data.weather[0].description;
        this.#temperature.textContent = Math.round(data.main.temp) + 'ºC';
        this.#description.textContent = data.weather[0].description;
        const time = new Date(data.dt * 1000);
        this.#time.textContent = time.getHours() + ':' + time.getMinutes();
    }

    #updateAdditionalWeather(data) {
        
    }

    #updateBackgroundImage(weather, temp) {
        let image;
        if (temp >= 35) {
            image = 'url(background-images/sun.jpg)';
        } else if (temp <= -16) {
            image = 'url(background-images/iceberg.jpg)';
        } else {
            weather = weather.toLowerCase();
            switch(weather) {
                case 'thunderstorm':
                    image = 'url(background-images/thunderstorm.jpg)';
                    break;
                case 'drizzle':
                    image = 'url(background-images/drizzle.jpg)';
                    break;
                case 'rain':
                    image = 'url(background-images/rain.jpg)';
                    break;
                case 'snow':
                    image = 'url(background-images/snow.jpg)';
                    break;
                case 'clear':
                    image = 'url(background-images/clear.jpg)';
                    break;
                case 'clouds':
                    image = 'url(background-images/clouds.jpg)';
                    break;
                default:
                    image = 'url(background-images/mist.jpg)';
            }
        }
        document.querySelector('main').style.backgroundImage = image;
    }
}



const manager = new DOMManager();

export default manager;