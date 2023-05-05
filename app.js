let apikey = "1f6442bbd1f73e321e5a2d48f43396d3";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${response.data.name}&units=metric&APPID=${apikey}`;

function showTemperature(response) {
  console.log(response);

  info.innerHTML = response.data.main.temp;

  let info = document.querySelector("#mainTemperature");
}
axios.get(`${apiUrl}&appid=${apikey}`).then(showTemperature);

function search(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input");

  let h1 = document.querySelector("h1");
  if (city.value) {
    h1.innerHTML = `${city.value}`;
  }
}
let city = response.data.main.name;
searchCity.addEventListener("submit", search);
