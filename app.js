function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    alert("please enter a valid city name...");
  }
}

let searchCity = document.querySelector("#searchingForm");

searchCity.addEventListener("submit", search);

let apikey = "1f6442bbd1f73e321e5a2d48f43396d3";
let apiUrl =
  "http://api.openweathermap.org/data/2.5/weather?q=Sydney&units=metric&APPID=a2e49dcccda9de726c4b47b8edd7a944";

let url =
  "https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}";

function showTemperature(response) {
  let temp = document.querySelector("#temperature");
  temp.innerHTML = response.data.main.temp;
}
axios.get(`${apiUrl}&appid=${apikey}`).then(showTemperature);
