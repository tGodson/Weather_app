// import { searchbox, errorMsg, displayResults } from "./index";
// const api = {
//   key: "c3f4541f34d8e4712373b9a314c1be96",
//   base: "https://api.openweathermap.org/data/2.5/"
// }

// const setQuery = (evt) => {
//   if (evt.keyCode == 13) {
//     getResults(searchbox.value);
//   }
// }
// searchbox.addEventListener('keypress', setQuery);

// const getResults = (query) => {
//   fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
//     .then(weather => {
//       return weather.json();
//     }).then(displayResults)
//     .catch(function(err) {
//       errorMsg.innerHTML = "Please make sure your spelling above is correct!";
//     });
// }
// export { setQuery, getResults };