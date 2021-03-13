// Getting date
function getCurrentDate(timestamp) {
  let currentDate = new Date();
  let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = week[currentDate.getDay()];
  return `${day} ${formatTime(timestamp)}`;
}

// Formatting current time
function formatTime(timestamp) {
  let currentDate = new Date(timestamp);
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Searching for the city in the API
function searchCity(city) {
  let apiKey = "2de1e0b71614dec5ecd1e018c409e23c";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayWeather);
  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayForecast);
}

// Handling submit city
function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

// Displaying current day's weather
function displayWeather(response) {
  let cityName = response.data.name;
  let countryName = response.data.sys.country;
  let citySearched = document.querySelector("#city");
  citySearched.innerHTML = `${cityName}, ${countryName}`;

  let tempCelsius = Math.round(response.data.main.temp);
  let weatherCondition = response.data.weather[0].description;
  let pressure = (response.data.main.pressure).toLocaleString(undefined, {minimunFractionDigits: 0});
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");

  document.querySelector("#temperature").innerHTML = `${tempCelsius}`;
  document.querySelector("#current-weather-condition").innerHTML = weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1);
  document.querySelector("#pressure").innerHTML = `<i class="pressure-icon"></i>${pressure} hPa`;
  document.querySelector("#humidity").innerHTML = `<i class="humidity-icon"></i>${humidity}%`;
  document.querySelector("#wind").innerHTML = `<i class="wind-icon"></i>${wind} km/h`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  console.log(response.data.list);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  let weatherCondition = null;

  for (let index = 0; index < 5; index++) {
    weatherCondition = response.data.list[index].weather[0].description;
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="card text-center">
    <h5 class="card-title">
      ${formatTime(forecast.dt * 1000)}
    </h5>
    <div class="card-body">
    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="card-img-top small-weather-icon">
    <p id="weather-condition" class="card-text">
      ${weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1)} <br />
    <strong>${Math.round(forecast.main.temp_max)}°</strong> / ${Math.round(forecast.main.temp_min)}°
    </p>
    </div>
    </div>`
  }
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempFahrenheit = (tempCelsius * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(tempFahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(tempCelsius);
}

// Executing searchForm function when user clicks the search button
let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", submitCity);

// Triggering the unit conversion
let tempCelsius = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Santiago");