class DOMCreator {
    #range;
    constructor() {
        this.#range = new Range();
    }

    createMainSection(data) {
        const time = new Date(data.dt * 1000);

        const DOMContent = this.#range.createContextualFragment(
            `<h2 class="location">${data.name}, ${(data.state || data.sys.country)}</h2>
             <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" class="icon">
             <h3 class="temperature" style="color:${this.#getTemperatureColor(data.main.temp)}">${Math.round(data.main.temp)}ºC</h3>
             <p class="description">${data.weather[0].description}</p>
             <p class="update-time">Updated at ${time.getHours()}:${time.getMinutes()}</p>`
        );

        return DOMContent;
    }

    createAdditionalSection(data, airData) {
        /* about wind direction: https://en.wikipedia.org/wiki/Wind_direction

           0deg = north 90deg = east    180deg = south  270deg = west
           arrow-up     arrow-right     arrow-down      arrow-left

           ...so just take the value as -(deg) for rotate property */
        let rain;
        let snow;
        const airQuality = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
        const airQualityColor = [
            'rgb(0, 0, 255)',
            'rgb(128, 128, 255)',
            'rgb(255, 255, 255)',
            'rgb(255, 255, 0)',
            'rgb(255, 0, 0)'
        ];
        if (data.rain) {
            rain = `<div>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.92,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.92,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.92,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z" />
                            </svg>
                            Rain:
                        </span>
                        <span class="rain">
                            ${data.rain['1h']}mm
                        </span>
                    </div>`
        } else {
           rain = '';
        }

        if (data.snow) {
            snow = `<div>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z" />
                            </svg>
                            Snow:
                    </span>
                    <span>
                        ${data.snow['1h']}mm
                    </span>
                </div>`
        } else {
            snow = '';
        }

        const DOMContent = this.#range.createContextualFragment(`
            <div>
                <div>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z" />
                        </svg>
                        Feels like:
                    </span>
                    <span>
                        ${Math.round(data.main.feels_like)}ºC
                    </span>
                </div>
                <div>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z" />
                        </svg>
                        Wind:
                    </span>
                    <span>
                        <svg style="width: 1rem; height: 1rem; transform: rotate(${-(data.wind.deg)}deg); margin-right: 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M14,20H10V11L6.5,14.5L4.08,12.08L12,4.16L19.92,12.08L17.5,14.5L14,11V20Z" />
                        </svg>
                    <span>
                        ${data.wind.speed}mph
                    </span>
                </div>
                <div>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M6.5 20Q4.22 20 2.61 18.43 1 16.85 1 14.58 1 12.63 2.17 11.1 3.35 9.57 5.25 9.15 5.88 6.85 7.75 5.43 9.63 4 12 4 14.93 4 16.96 6.04 19 8.07 19 11 20.73 11.2 21.86 12.5 23 13.78 23 15.5 23 17.38 21.69 18.69 20.38 20 18.5 20Z" />
                        </svg>Cloudiness:</span>
                    <span class="cloudiness">
                        ${data.clouds.all}%
                    </span>
                </div>
            </div>
            <div>
                <div>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M16.5,5C18.05,5 19.5,5.47 20.69,6.28L19.53,9.17C18.73,8.44 17.67,8 16.5,8C14,8 12,10 12,12.5C12,15 14,17 16.5,17C17.53,17 18.47,16.66 19.23,16.08L20.37,18.93C19.24,19.61 17.92,20 16.5,20A7.5,7.5 0 0,1 9,12.5A7.5,7.5 0 0,1 16.5,5M6,3A3,3 0 0,1 9,6A3,3 0 0,1 6,9A3,3 0 0,1 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5Z" />
                        </svg>
                        Max/min:
                    </span>
                    <span>
                        ${data.main.temp_max}º/${data.main.temp_min}º
                    </span>
                </div>
                <div>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z" />
                        </svg>
                        Pressure:
                    </span> 
                    <span>
                        ${data.main.pressure}hPa
                    </span>
                </div>
                ${rain}
                ${snow}
            </div>
            <div>
                <div>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z" />
                        </svg>
                        Humidity:
                    </span>
                    <span>
                        ${data.main.humidity}%
                    </span>
                </div>
                <div>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z" />
                        </svg>
                        Air Quality:
                    </span>
                    <span style="color: ${airQualityColor[airData.list[0].main.aqi+1]}">
                         ${airQuality[airData.list[0].main.aqi+1]}
                    </span>
                </div>
            </div>`);
        return DOMContent;
    }

    createForecastSection(data) {
        const forecastFrag = document.createDocumentFragment();
        
        data.list.map((obj) => this.#createForecastBox(obj)).forEach((element) => {
            forecastFrag.appendChild(element);
        });

        const DOMContent = this.#range.createContextualFragment(`
            <button id="previous">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M13,22L3,12L13,2V8H21V16H13V22M6,12L11,17V14H19V10H11V7L6,12Z" />
                </svg>
            </button>
            <div id="forecast-slider">
                <div id="forecast-container"></div>
            </div>
            <button id="next">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M11,16H3V8H11V2L21,12L11,22V16M13,7V10H5V14H13V17L18,12L13,7Z" />
                </svg>
            </button>
            <div id="forecast-controls">${'<button></button>'.repeat(data.list.length/5)}</div>`
        );

        DOMContent.querySelector('#forecast-container').appendChild(forecastFrag);

        return DOMContent;
    }

    createBackgroundLegend(legend) {
        return this.#range.createContextualFragment(legend);
    }
    
    #createForecastBox(dataObj) {
        const time = new Date(dataObj.dt * 1000);
        const hours = (time.getHours().length == 1) ? ('0' + time.getHours()) : time.getHours();
        const dayOfWeek = ['Sun.','Mon.','Tues.','Wed.','Thurs.','Fri.','Sat.'][time.getDay()];
        return this.#range.createContextualFragment(
            `<div class="forecast-content">
                <h4 class="forecast-time">${dayOfWeek} ${time.getDate()}, ${hours}:00</h4>
                <img src="http://openweathermap.org/img/wn/${dataObj.weather[0].icon}@2x.png" alt="${dataObj.weather[0].description}" class="forecast-icon">
                <p class="forecast-temperature" style="color: ${this.#getTemperatureColor(dataObj.main.temp)}">${Math.round(dataObj.main.temp)}ºC</p>
                <p class="forecast-description">${dataObj.weather[0].description}</p>
            </div>`);
    }

    #getTemperatureColor(temp) {
        let tempColor;
        /*About temperature color:
            50ºC = pink/rgb(255, 0, 255)
                ^ inc blue by (temp-35)*17 ^
            35ºC = red/rgb(255, 0, 0)
                ^ dec green by 255-((temp-20)*17) ^
            20ºC = yellow/rgb(255, 255, 0)
                ^ inc red by (temp-5)*17 ^
            5º = blue/rgb(0, 255, 0)
                ^ dec blue by 255-((temp+10)*17) ^
            -10ºC = light blue/rgb(0, 255, 255)
                ^ dec red by 128-((temp+25)*17/2) ^
                ^ dec green by 255-((temp+25)*17) ^
            -25ºC = purple/rgb(128, 0, 255)
        */
            if (temp > 50) { //Who knows where will be more than 50ºC...
                tempColor = 'rgb(255, 0, 255)';
            } else if (temp >= 35) {
                tempColor = `rgb(255, 0, ${Math.round((temp-35)*17)})`;
            } else if (temp >= 20) {
                tempColor = `rgb(255, ${255 - Math.round((temp-20)*17)}, 0)`;
            } else if (temp >= 5) {
                tempColor = `rgb(${Math.round((temp-5)*17)}, 255, 0)`;
            } else if (temp >= -10) {
                tempColor = `rgb(0, 255, ${255 - Math.round((-(temp-5))*15)})`;
            } else if (temp >= -25) {
                tempColor = `rgb(${Math.round(128 - ((temp+25)*17/2))}, ${Math.round(255 - ((temp+25)+17))}, 255)`;
            }
            return tempColor;
    }
}


class DOMManager {
    #mainInformation;
    #additionalInformation;
    #backgroundLegend;
    #forecastCarousel;
    #creator;
    constructor() {
        this.#mainInformation = document.querySelector('#main-information');
        this.#additionalInformation = document.querySelector('#additional-information');
        this.#backgroundLegend = document.querySelector('#background-legend');
        this.#forecastCarousel = document.querySelector('#forecast-carousel'); 
        this.#creator = new DOMCreator();
    }

    updateWeatherData(currentWeather, airQuality) {
        const mainSection = this.#creator.createMainSection(currentWeather);
        const additionalSection = this.#creator.createAdditionalSection(currentWeather, airQuality);

        this.#mainInformation.textContent = '';
        this.#additionalInformation.textContent = ''; 

        this.#mainInformation.appendChild(mainSection);
        this.#additionalInformation.appendChild(additionalSection);
        this.#updateBackgroundImage(currentWeather.weather[0].main, currentWeather.main.temp);
    }

    updateForecastData(data) {
        const forecastSection = this.#creator.createForecastSection(data);

        const reference = [
            forecastSection.querySelector('#next'),
            forecastSection.querySelector('#previous'),
            forecastSection.querySelector('#forecast-controls'),
            forecastSection.querySelector('#forecast-container')
        ];

        this.#forecastCarousel.textContent = '';
        this.#forecastCarousel.appendChild(forecastSection);

        return reference; //used outside, on forecast carousel class creation
    }

    #updateBackgroundImage(weather, temp) {
        let image;
        let legend;
        if (temp >= 35) {
            image = 'url(background-images/sun.jpg)';
            legend = '<p>Photo by <a href="https://unsplash.com/@nasa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">NASA</a> on <a href="https://unsplash.com/photos/JHyiw_dpALk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>'
        } else if (temp <= -16) {
            image = 'url(background-images/iceberg.jpg)';
            legend = '<p>Image by <a href="https://pixabay.com/users/358611-358611/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=404966">358611</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=404966">Pixabay</a></p>'
        } else {
            weather = weather.toLowerCase();
            switch(weather) {
                case 'thunderstorm':
                    image = 'url(background-images/thunderstorm.jpg)';
                    legend = '<p>Image by <a href="https://pixabay.com/users/wkidesign-1940642/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1158027">Keli Black</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1158027">Pixabay</a></p>'
                    break;
                case 'drizzle':
                    image = 'url(background-images/drizzle.jpg)';
                    legend = '<p>Photo by <a href="https://unsplash.com/@alexandramirghes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexandra Mirghe?</a> on <a href="https://unsplash.com/photos/ejG09ilWXFQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>'
                    break;
                case 'rain':
                    image = 'url(background-images/rain.jpg)';
                    legend = '<p>Image by <a href="https://pixabay.com/users/seagullnady-6451533/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2775032">??????? ????</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2775032">Pixabay</a></p>'
                    break;
                case 'snow':
                    image = 'url(background-images/snow.jpg)';
                    legend = '<p>Image by <a href="https://pixabay.com/users/maky_orel-436253/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6843181">Markéta (Machová) Klimeová</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6843181">Pixabay</a></p>'
                    break;
                case 'clear':
                    image = 'url(background-images/clear.jpg)';
                    legend = '<p>Photo by <a href="https://unsplash.com/@catebligh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Cate Bligh</a> on <a href="https://unsplash.com/photos/lX5wMeZUidA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>'
                    break;
                case 'clouds':
                    image = 'url(background-images/clouds.jpg)';
                    legend = '<p>Photo by <a href="https://unsplash.com/@billy_huy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Billy Huynh</a> on <a href="https://unsplash.com/photos/v9bnfMCyKbg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>'
                    break;
                default:
                    image = 'url(background-images/mist.jpg)';
                    legend = '<p>Photo by <a href="https://unsplash.com/@goanne?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Anna Goncharova</a> on <a href="https://unsplash.com/photos/E0e1NmVclRo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>'
            }
        }

        document.querySelector('main').style.backgroundImage = image;
        this.#backgroundLegend.textContent = '';
        this.#backgroundLegend.appendChild(this.#creator.createBackgroundLegend(legend));
    }
}

const manager = new DOMManager();

export default manager;