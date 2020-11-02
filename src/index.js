const api = {
  key: "c3f4541f34d8e4712373b9a314c1be96",
  base: "https://api.openweathermap.org/data/2.5/"
}

let temp = document.querySelector('.current .temp');


document.body.style.backgroundImage = "url('./img/cloud.jpeg')";
localStorage.setItem('temp', JSON.stringify(23));

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  localStorage.setItem('temp', JSON.stringify(weather.main.temp));

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  if (weather.weather[0].main === "Clear"){
    document.body.style.backgroundImage = "url('./img/clear.jpg')";
  }else if(weather.weather[0].main === "Rain"){
    document.body.style.backgroundImage = "url('./img/rain.jpeg')";
  }else if(weather.weather[0].main === "Mist"){
    document.body.style.backgroundImage = "url('./img/mist.jpeg')";
  }else{
    document.body.style.backgroundImage = "url('./img/cloud.jpeg')";
  }

}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

let fahrenheitBtn = document.querySelector('.current .hi-low .fahrenheit');
const fahrenheit = () => {
  let temperature = JSON.parse(localStorage.getItem('temp'));
  let temp_fahrenheit = (temperature * 1.8) + 32;
  temp.innerHTML = `${Math.round(temp_fahrenheit)}<span>°F</span>`;
}
fahrenheitBtn.addEventListener('click', fahrenheit);

let celsiusBtn = document.querySelector('.current .hi-low .celsius');
const celsius = () => {
  let temperature = JSON.parse(localStorage.getItem('temp'));
  temp.innerHTML = `${Math.round(temperature)}<span>°C</span>`;
}
celsiusBtn.addEventListener('click', celsius);