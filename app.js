function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0:${hours}`;
  }
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0:${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}
function search(city) {
  let apikey = "dd13320e3c3ba6c3bc970f09d672c7de";

  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiurl).then(displayWeatherCondition);
}

function getForcast(coordinates) {
  let apikey = "515c9ddbeb3cda9061acfab71031839e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayDailyForcast);
}

function displayWeatherCondition(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#mainTemperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `https://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  getForcast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchLocation(position) {
  apikey = "dd13320e3c3ba6c3bc970f09d672c7de";
  apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apikey}&units=metric`;
  axios.get(apiurl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  let temperatureElement = document.querySelector("#mainTemperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#mainTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayDailyForcast(response) {
  let dailyForcast = response.data.daily;
  let forcastElement = document.querySelector("#forcast");
  let forcastHtml = `<div class="row">`;

  dailyForcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHtml =
        forcastHtml +
        `
            <div class="col-2"> 
              <div class="week-days">${formatDay(forcastDay.dt)}</div>
              <img
                class="daily-forcast-icon"
                src="https://openweathermap.org/img/wn/${
                  forcastDay.weather[0].icon
                }@2x.png"
                alt=""
              />
              <div class="daily-temperature"></div>
              <span id="daily-temperature-max">${Math.round(
                forcastDay.temp.max
              )}°</span>
              <span id="daily-temperature-min">${Math.round(
                forcastDay.temp.min
              )}°</span>
            </div>
          `;
    }
  });

  forcastHtml = forcastHtml + `</div>`;

  forcastElement.innerHTML = forcastHtml;
}
let celsiusTemperature = null;

let searchInput = document.querySelector("#searchingForm");
searchInput.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

search("New York");
