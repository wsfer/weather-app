import DOMCreator from './dom-creator';

class DOMManager {
  #mainInformation;

  #additionalInformation;

  #backgroundLegend;

  #forecastCarousel;

  #creator;

  constructor() {
    this.#mainInformation = document.querySelector('#main-information');
    this.#additionalInformation = document.querySelector(
      '#additional-information'
    );
    this.#backgroundLegend = document.querySelector('#background-legend');
    this.#forecastCarousel = document.querySelector('#forecast-carousel');
    this.#creator = new DOMCreator();
  }

  updateWeatherData(currentWeather, airQuality) {
    const mainSection = this.#creator.createMainSection(currentWeather);
    const additionalSection = this.#creator.createAdditionalSection(
      currentWeather,
      airQuality
    );

    this.#mainInformation.textContent = '';
    this.#additionalInformation.textContent = '';

    this.#mainInformation.appendChild(mainSection);
    this.#additionalInformation.appendChild(additionalSection);
    this.#updateBackgroundImage(
      currentWeather.weather[0].main,
      currentWeather.main.temp
    );
  }

  updateForecastData(data) {
    const forecastSection = this.#creator.createForecastSection(data);

    const reference = [
      forecastSection.querySelector('#next'),
      forecastSection.querySelector('#previous'),
      forecastSection.querySelector('#forecast-controls'),
      forecastSection.querySelector('#forecast-container'),
    ];

    this.#forecastCarousel.textContent = '';
    this.#forecastCarousel.appendChild(forecastSection);

    return reference; // used outside, on forecast carousel class creation
  }

  #updateBackgroundImage(weather, temp) {
    let image;
    let legend;
    if (temp >= 37) {
      image = 'url(background-images/sun.jpg)';
      legend =
        '<p>Photo by <a href="https://unsplash.com/@nasa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">NASA</a> on <a href="https://unsplash.com/photos/JHyiw_dpALk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>';
    } else if (temp <= -25) {
      image = 'url(background-images/iceberg.jpg)';
      legend =
        '<p>Image by <a href="https://pixabay.com/users/358611-358611/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=404966">358611</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=404966">Pixabay</a></p>';
    } else {
      switch (weather.toLowerCase()) {
        case 'thunderstorm':
          image = 'url(background-images/thunderstorm.jpg)';
          legend =
            '<p>Image by <a href="https://pixabay.com/users/wkidesign-1940642/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1158027">Keli Black</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1158027">Pixabay</a></p>';
          break;
        case 'drizzle':
          image = 'url(background-images/drizzle.jpg)';
          legend =
            '<p>Photo by <a href="https://unsplash.com/@alexandramirghes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexandra Mirghe?</a> on <a href="https://unsplash.com/photos/ejG09ilWXFQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>';
          break;
        case 'rain':
          image = 'url(background-images/rain.jpg)';
          legend =
            '<p>Image by <a href="https://pixabay.com/users/seagullnady-6451533/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2775032">??????? ????</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2775032">Pixabay</a></p>';
          break;
        case 'snow':
          image = 'url(background-images/snow.jpg)';
          legend =
            '<p>Image by <a href="https://pixabay.com/users/maky_orel-436253/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6843181">Markéta (Machová) Klimeová</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6843181">Pixabay</a></p>';
          break;
        case 'clear':
          image = 'url(background-images/clear.jpg)';
          legend =
            '<p>Photo by <a href="https://unsplash.com/@catebligh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Cate Bligh</a> on <a href="https://unsplash.com/photos/lX5wMeZUidA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>';
          break;
        case 'clouds':
          image = 'url(background-images/clouds.jpg)';
          legend =
            '<p>Photo by <a href="https://unsplash.com/@billy_huy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Billy Huynh</a> on <a href="https://unsplash.com/photos/v9bnfMCyKbg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>';
          break;
        default:
          image = 'url(background-images/mist.jpg)';
          legend =
            '<p>Photo by <a href="https://unsplash.com/@goanne?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Anna Goncharova</a> on <a href="https://unsplash.com/photos/E0e1NmVclRo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>';
      }
    }

    document.querySelector('main').style.backgroundImage = image;
    this.#backgroundLegend.textContent = '';
    this.#backgroundLegend.appendChild(
      this.#creator.createBackgroundLegend(legend)
    );
  }
}

const manager = new DOMManager();

export default manager;
