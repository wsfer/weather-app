class DOMManager {
    #location;
    #icon;
    #temperature;
    #description;
    #time;
    #feelsTemp;
    #windDirection;
    #windSpeed;
    #clouds;
    #maxMin;
    #pressure;
    #rain;
    #humidity;
    #air;
    #snow;
    constructor() {
        this.#location = document.querySelector('.location');
        this.#icon = document.querySelector('.icon');
        this.#temperature = document.querySelector('.temperature');
        this.#description = document.querySelector('.description');
        this.#time = document.querySelector('.time');
        this.#feelsTemp = document.querySelector('.feels-temperature');
        this.#windDirection = document.querySelector('.wind-direction');
        this.#windSpeed = document.querySelector('.wind-speed');
        this.#clouds = document.querySelector('.cloudiness');
        this.#maxMin = document.querySelector('.max-min');
        this.#pressure = document.querySelector('.pressure');
        this.#rain = document.querySelector('.rain');
        this.#humidity = document.querySelector('.humidity');
        this.#air = document.querySelector('.air-quality');
        this.#snow = document.querySelector('.snow');
    }

    updateWeatherData(data) {
        this.#updateMainWeather(data);
        this.#updateBackgroundImage(data.weather[0].main, data.main.temp);
        this.#updateAdditionalWeather(data);
        console.log(data);
    }

    #updateMainWeather(data) {
        const time = new Date(data.dt * 1000);
        const temp = data.main.temp;
        const tempColors = ['#ff3300', '#ff6600', '#ff9933', '#ffcc99', '#f2f2f2', '#cce6ff', '#80ciff', '#0084ff', '#4d4dff', '#7733ff']
        this.#location.textContent = data.name + ', ' + (data.state || data.sys.country);
        this.#icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        this.#icon.alt = data.weather[0].description;
        this.#temperature.textContent = Math.round(temp) + 'ºC';
        //TODO: a better way to do it, this is ugly as fuck
        if (temp >= 35) {
            this.#temperature.style.color = tempColors[0];
        } else if (temp >= 28) {
            this.#temperature.style.color = tempColors[1];
        } else if (temp >= 21) {
            this.#temperature.style.color = tempColors[2];
        } else if (temp >= 14) {
            this.#temperature.style.color = tempColors[3];
        } else if (temp >= 10) {
            this.#temperature.style.color = tempColors[4];
        } else if (temp >= 5) {
            this.#temperature.style.color = tempColors[5];
        } else if (temp >= 1) {
            this.#temperature.style.color = tempColors[6];
        } else if (temp >= -5) {
            this.#temperature.style.color = tempColors[7];
        } else if (temp >= -15) {
            this.#temperature.style.color = tempColors[8];
        } else {
            this.#temperature.style.color = tempColors[9];
        }
        this.#description.textContent = data.weather[0].description;
        this.#time.textContent = time.getHours() + ':' + time.getMinutes();
    }

    #updateAdditionalWeather(data) {
        this.#feelsTemp.textContent = Math.round(data.main.feels_like) + 'ºC';
        /* Wind direction: https://en.wikipedia.org/wiki/Wind_direction
           0deg = north 90deg = east    180deg = south  270deg = west
           arrow-up     arrow-right     arrow-down      arrow-left
        */
       this.#windDirection.style.transform = `rotate(${-(data.wind.deg)}deg)`;
       this.#windSpeed.textContent = data.wind.speed + 'mph';
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