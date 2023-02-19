class WeatherAPI {
    #key;
    constructor(key) {
        this.#key = key;
    }
    
    async getWeatherData(lat, lon) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.#key}`);
        const data = await response.json();
        return data;
    }

    async getForecastData(lat, lon) {
        const response = await fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.#key}`);
        const data = await response.json();
        return data;
    }

    async getCityLocation(cityName) {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${this.#key}`);
        const data = await response.json();
        return data;
    }

}

const weatherAPI = new WeatherAPI('53adf48f9adafdb91a2ae308a53f4cbd');

export default weatherAPI;