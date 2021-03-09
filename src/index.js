let currentDate = new Date();
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let time = currentDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

let today = document.querySelector('#today');
today.innerHTML = `${day[currentDate.getDay()]} ${time}`;

function searchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchForm);
