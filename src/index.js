let currentDate = new Date();
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let time = currentDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

let today = document.querySelector('#today');
today.innerHTML = `${day[currentDate.getDay()]} ${time}`;

console.log(`${day[currentDate.getDay()]} ${time}`);
