let apikey = "1f6442bbd1f73e321e5a2d48f43396d3";

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

let searchCity = document.querySelector("#searchForm");

searchCity.addEventListener("submit", search);
