// http://api.openweathermap.org/data/2.5/weather?q=London&APPID=748497c3456aa53fa1c616a6efd42483

const citySearch = document.querySelector('#city-search');
const searchBtn = document.querySelector('.search-btn');
const cityName = 'Seattle';
class Weather {
  constructor(name, temp, description, wind) {
    this.name = name;
    this.temp = temp;
    this.description = description;
    this.wind = wind;
  }
}

const buildWeather = (name, temp, description, wind) => new Weather(name, temp, description, wind);

async function getAPI(url) {
  const response = await fetch(url, { mode: 'cors' });

  const getData = await response.json();
  const tempToConvert = getData.main.temp;
  const convertedTemp = (1.8 * (tempToConvert - 273) + 32).toFixed(1);

  const getWindData = getData.wind.speed;
  const getDescription = getData.weather[0].description;

  console.log(buildWeather(cityName, convertedTemp, getDescription, getWindData));
}

getAPI();

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getAPI(`http://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&APPID=748497c3456aa53fa1c616a6efd42483`);
});

window.onDOMContentLoaded(getAPI('http://api.openweathermap.org/data/2.5/weather?q=Seattle&APPID=748497c3456aa53fa1c616a6efd42483'));
