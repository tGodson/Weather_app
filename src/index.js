// import { setQuery, getResults } from "./logic";
import './style.css';
import Clear from './img/clear.jpg';
import Rain from './img/rain.jpeg';
import Cloud from './img/cloud.jpeg';
import Mist from './img/mist.jpeg';

const api = {
  key: 'c3f4541f34d8e4712373b9a314c1be96',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const temp = document.querySelector('.current .temp');

document.body.style.backgroundImage = `url(${Cloud})`;
localStorage.setItem('temp', JSON.stringify(23));

const searchbox = document.querySelector('.search-box');

const city = document.querySelector('.location .city');
const date = document.querySelector('.location .date');
const weatherEl = document.querySelector('.current .weather');
const fahrenheitBtn = document.querySelector('.current .hi-low .fahrenheit');
const celsiusBtn = document.querySelector('.current .hi-low .celsius');
const errorMsg = document.querySelector('.error');

const dateBuilder = (d) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

const displayResults = (weather) => {
  errorMsg.innerHTML = '';
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  date.innerText = dateBuilder(now);

  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  localStorage.setItem('temp', JSON.stringify(weather.main.temp));

  weatherEl.innerText = weather.weather[0].main;

  if (weather.weather[0].main === 'Clear') {
    document.body.style.backgroundImage = `url(${Clear})`;
  } else if (weather.weather[0].main === 'Rain') {
    document.body.style.backgroundImage = `url(${Rain})`;
  } else if (weather.weather[0].main === 'Mist') {
    document.body.style.backgroundImage = `url(${Mist})`;
  } else {
    document.body.style.backgroundImage = `url(${Cloud})`;
  }
};

const getResults = (query) => {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => weather.json()).then(displayResults)
    .catch(() => {
      errorMsg.innerHTML = 'Please make sure your spelling above is correct!';
    });
};

const setQuery = (evt) => {
  if (evt.keyCode === 13) {
    getResults(searchbox.value);
  }
};
searchbox.addEventListener('keypress', setQuery);

const fahrenheit = () => {
  const temperature = JSON.parse(localStorage.getItem('temp'));
  const tempFahrenheit = (temperature * 1.8) + 32;
  temp.innerHTML = `${Math.round(tempFahrenheit)}<span>°F</span>`;
};
fahrenheitBtn.addEventListener('click', fahrenheit);

const celsius = () => {
  const temperature = JSON.parse(localStorage.getItem('temp'));
  temp.innerHTML = `${Math.round(temperature)}<span>°C</span>`;
};
celsiusBtn.addEventListener('click', celsius);

// export { searchbox, displayResults, errorMsg };