let city = prompt("Enter a city");
city = city.toLowerCase();

if (city === "paris") {
  city = city.replace("p", "P");
  alert(`It is currently 19°C (66°F) in ${city} with a humidity of 80%`);
} else {
  alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`);
}
