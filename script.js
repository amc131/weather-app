// http://api.openweathermap.org/data/2.5/weather?q=London&APPID=748497c3456aa53fa1c616a6efd42483

// Class to populate city data
class Weather {
  constructor(name, temp, description, wind) {
    this.name = name;
    this.temp = temp;
    this.description = description;
    this.wind = wind;
  }
}

const citySearch = document.querySelector('#city-search');
const searchBtn = document.querySelector('.search-btn');

// Function to return new Weather class variable
const buildWeather = (name, temp, description, wind) => new Weather(name, temp, description, wind);

// Variable to hold the Weather object
let cityBuild;

// Function to populate data with the cityBuild variable
const displayWeather = (object) => {
  const cityName = document.querySelector('.city-name');
  cityName.textContent = object.name;

  const cityDescription = document.querySelector('.city-description');
  cityDescription.textContent = object.description;
  console.log(object);
  citySearch.value = '';
};

async function getAPI(url) {
  const response = await fetch(url, { mode: 'cors' });

  const getData = await response.json();
  const tempToConvert = getData.main.temp;
  const convertedTemp = (1.8 * (tempToConvert - 273) + 32).toFixed(1);

  const getWindData = getData.wind.speed;
  const getDescription = getData.weather[0].description;

  cityBuild = buildWeather(citySearch.value, convertedTemp, getDescription, getWindData);
  displayWeather(cityBuild);
}

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getAPI(`http://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&APPID=748497c3456aa53fa1c616a6efd42483`);
});

window.onDOMContentLoaded(getAPI('http://api.openweathermap.org/data/2.5/weather?q=Seattle&APPID=748497c3456aa53fa1c616a6efd42483'));