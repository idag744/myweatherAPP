function search(city) {
  let apikey = "dd13320e3c3ba6c3bc970f09d672c7de";

  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiurl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  console.log(response);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#mainTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchInput = document.querySelector("#searchingForm");

searchInput.addEventListener("submit", handleSubmit);

search("New York");
