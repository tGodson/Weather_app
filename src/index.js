const api = {
  key: "c3f4541f34d8e4712373b9a314c1be96",
  base: "https://api.openweathermap.org/data/2.5/"
}

let temp = document.querySelector('.current .temp');
document.body.style.backgroundImage = "url('./img/cloud.jpeg')";
localStorage.setItem('temp', JSON.stringify(23));

const searchbox = document.querySelector('.search-box');

let city = document.querySelector('.location .city');
let date = document.querySelector('.location .date');
let weather_el = document.querySelector('.current .weather');
let fahrenheitBtn = document.querySelector('.current .hi-low .fahrenheit');
let celsiusBtn = document.querySelector('.current .hi-low .celsius');
let errorMsg = document.querySelector('.error');

const setQuery = (evt) => {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}
searchbox.addEventListener('keypress', setQuery);

const getResults = (query) => {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults)
    .catch(function(err) {
      errorMsg.innerHTML = "Please make sure your spelling above is correct!";
    });
}

const displayResults = (weather) => {
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  date.innerText = dateBuilder(now);

  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  localStorage.setItem('temp', JSON.stringify(weather.main.temp));

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

const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}


const fahrenheit = () => {
  let temperature = JSON.parse(localStorage.getItem('temp'));
  let temp_fahrenheit = (temperature * 1.8) + 32;
  temp.innerHTML = `${Math.round(temp_fahrenheit)}<span>°F</span>`;
}
fahrenheitBtn.addEventListener('click', fahrenheit);

const celsius = () => {
  let temperature = JSON.parse(localStorage.getItem('temp'));
  temp.innerHTML = `${Math.round(temperature)}<span>°C</span>`;
}
celsiusBtn.addEventListener('click', celsius);