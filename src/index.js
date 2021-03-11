function searchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let apiKey = "2de1e0b71614dec5ecd1e018c409e23c";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`; 
  city.innerHTML = `${searchInput.value}`;
  axios.get(url).then(function retreiveCityName(city) {
    console.log(city.data);
    let cityName = city.data.name;
    let countryName = city.data.sys.country;
    let citySearched = document.querySelector("#city");
    citySearched.innerHTML = `${cityName}, ${countryName}`;  
    axios.get(url).then(displayWeather);
  });
}

function displayWeather(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let weatherCondition = response.data.weather[0].description;
  let pressure = (response.data.main.pressure).toLocaleString(undefined, {minimunFractionDigits: 0});
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;

  document.querySelector("#temperature").innerHTML = `${temp}`;
  document.querySelector("#weather-condition").innerHTML = weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1);
  document.querySelector("#pressure").innerHTML = `<i class="pressure-icon"></i>${pressure} hPa`;
  document.querySelector("#humidity").innerHTML = `<i class="humidity-icon"></i>${humidity}%`;
  document.querySelector("#wind").innerHTML = `<i class="wind-icon"></i>${wind} km/h`;
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