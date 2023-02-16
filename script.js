// http://api.openweathermap.org/data/2.5/weather?q=London&APPID=748497c3456aa53fa1c616a6efd42483

async function getAPI() {
  const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=748497c3456aa53fa1c616a6efd42483', { mode: 'cors' });
  const getTempData = await response.json();
  const tempToConvert = getTempData.main.temp;
  console.log(tempToConvert);
}

getAPI();
