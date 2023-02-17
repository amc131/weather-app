// http://api.openweathermap.org/data/2.5/weather?q=London&APPID=748497c3456aa53fa1c616a6efd42483

// Class to populate city data
class Weather {
  constructor(name, temp, description, wind, icon) {
    this.name = name;
    this.temp = temp;
    this.description = description;
    this.wind = wind;
    this.icon = icon;
  }
}

const citySearch = document.querySelector('#city-search');
const searchBtn = document.querySelector('.search-btn');

// Function to return new Weather class variable
const buildWeather = (name, temp, description, wind, icon) => new Weather(name, temp, description, wind, icon)

// Variable to hold the Weather object
let cityBuild;

// Function to populate data with the cityBuild variable
const displayWeather = (object) => {
  const cityName = document.querySelector('.city-name');
  cityName.textContent = object.name;

  const cityDescription = document.querySelector('.city-description');
  cityDescription.textContent = object.description;

  const weatherIconContainer = document.querySelector('.icon');

  const temp = document.querySelector('.temp');
  temp.textContent = `${object.temp} °F`;

  const wind = document.querySelector('.wind');
  wind.textContent = `${object.wind} mph`;

  if (weatherIconContainer.firstChild) {
    weatherIconContainer.firstChild.remove();
  }
  const image = document.createElement('img');
  image.src = `http://openweathermap.org/img/wn/${object.icon}@2x.png`;
  weatherIconContainer.appendChild(image);

  citySearch.value = '';
};

const handleError = () => {
  const errorMsg = document.querySelector('.error-msg');
  errorMsg.style.display = 'inline';

  const mainWeather = document.querySelector('.main-weather');
  mainWeather.style.display = 'none';
};

async function getAPI(url) {
  const response = await fetch(url, { mode: 'cors' });

  if (response.status === 404) {
    handleError();
  } else {
    const mainWeather = document.querySelector('.main-weather');
    mainWeather.style.display = 'inline';

    const errorMsg = document.querySelector('.error-msg');
    errorMsg.style.display = 'none';
    const getData = await response.json();
    const tempToConvert = getData.main.temp;
    const convertedTemp = (1.8 * (tempToConvert - 273) + 32).toFixed(1);

    const getWindData = getData.wind.speed;
    const getDescription = getData.weather[0].description;

    const iconID = getData.weather[0].icon;

    cityBuild = buildWeather(citySearch.value, convertedTemp, getDescription, getWindData, iconID);
    displayWeather(cityBuild);
  }
}

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getAPI(`http://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&APPID=748497c3456aa53fa1c616a6efd42483`);
});

window.onDOMContentLoaded(getAPI('http://api.openweathermap.org/data/2.5/weather?q=Seattle&APPID=748497c3456aa53fa1c616a6efd42483'));