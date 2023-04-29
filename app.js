function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("please enter a valid city name...");
  }
}

let searchCity = document.querySelector("#searchForm");

searchCity.addEventListener("submit", search);
