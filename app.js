let apikey = "1f6442bbd1f73e321e5a2d48f43396d3";

let city = document.querySelector("#city-input").value;
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apikey}&units=metric`;

function showTemperature(response) {
  console.log(response);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#mainTemperature").innerHTML = math.round(
    response.data.main.temp
  );
}
axios.get(`${apiUrl}&appid=${apikey}`).then(showTemperature);
