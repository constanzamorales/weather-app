function searchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let apiKey = "2de1e0b71614dec5ecd1e018c409e23c";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`; 
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
  axios.get(url).then(displayWeather);
}


function displayWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temp}`;
}


// Feature 1
let currentDate = new Date();
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let time = currentDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
let today = document.querySelector("#today");
today.innerHTML = `${day[currentDate.getDay()]} ${time}`;

// Feature 2 - Executes searchForm function when user clicks the search button
let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchForm);

/*
// Bonus feature
function convertToFahrenheit(event) {
  event.preventDefault
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 81;
}

function convertToCelsius(event) {
  event.preventDefault
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 27;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
*/