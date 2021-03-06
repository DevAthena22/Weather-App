function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = now.getDay();
  let today = days[now.getDay()];

  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes === 10 || minutes > 10) {
    return `Last updated ${today}, ${hours}:${minutes}`;
  } else {
    return `Last updated ${today}, ${hours}:0${minutes}`;
  }
}

function cityAndFahrenheitTemp(response) {
  let fahrenheitTemperature = Math.round(response.data.main.temp);
  let showFahrenheitTemp = document.querySelector("#main-temperature");
  document.querySelector("#fahrenheit-link").innerHTML = `<strong>°F</strong>`;
  document.querySelector("#celsius-link").innerHTML = `°C`;
  showFahrenheitTemp.innerHTML = `${fahrenheitTemperature}°`;

  document
    .querySelector("#celsius-link")
    .addEventListener("click", showLocation);
}

function showFahrenheit(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#enter-location");
  let showCity = document.querySelector("#show-location");
  let city = `${locationInput.value.trim().toUpperCase()}`;
  showCity.innerHTML = `${city}`;

  let apiKey = "a43a933ee08be334d6f5d62e405ad630";
  let unitImperial = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unitImperial}`;

  axios.get(apiUrl).then(cityAndFahrenheitTemp);
}

function cityAndCelsiusTemp(response) {
  let celsiusTemperature = Math.round(response.data.main.temp);
  let showCelsiusTemp = document.querySelector("#main-temperature");
  let weatherIcon = document.querySelector("#main-weather-icon");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feelsLike");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#app-date");
  document.querySelector("#celsius-link").innerHTML = `<strong>°C</strong>`;
  document.querySelector("#fahrenheit-link").innerHTML = `°F`;
  showCelsiusTemp.innerHTML = `${celsiusTemperature}°`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  feelsLikeElement.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windspeedElement.innerHTML = `<br/>Wind Speed: ${
    Math.round(response.data.wind.speed) * 3.6
  } km/hr`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  document
    .querySelector("#fahrenheit-link")
    .addEventListener("click", showFahrenheit);
}

function showLocation(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#enter-location");
  let city = `${locationInput.value.trim().toUpperCase()}`;
  document.querySelector("#show-location").innerHTML = `${city}`;

  let apiKey = "a43a933ee08be334d6f5d62e405ad630";
  let unitMetric = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unitMetric}`;

  axios.get(apiUrl).then(cityAndCelsiusTemp);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", showLocation);

function convertToFahrenheit(response) {
  let fahrenheitTemperature = Math.round(response.data.main.temp) * 1.8 + 32;
  let city = `${response.data.name}`;
  let showCity = document.querySelector("#show-location");
  showCity.innerHTML = `${city}`;
  let showFahrenheitTemp = document.querySelector("#main-temperature");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.innerHTML = `<strong>°C</strong>`;
  fahrenheitLink.innerHTML = `°F`;
  showFahrenheitTemp.innerHTML = `${fahrenheitTemperature}°`;

  fahrenheitLink.addEventListener("click", retrievePositionFahrenheit);
}

function retrievePositionFahrenheit(event) {
  event.preventDefault();
  let apiKey = "a43a933ee08be334d6f5d62e405ad630";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(convertToFahrenheit);
}

function showCelsiusInCurrentLocation(response) {
  let celsiusTemperature = Math.round(response.data.main.temp);
  let city = `${response.data.name}`;
  let showCity = document.querySelector("#show-location");
  showCity.innerHTML = `${city}`;
  document.querySelector("#celsius-link").innerHTML = `<strong>°C</strong>`;
  document.querySelector("#fahrenheit-link").innerHTML = `°F`;
  document.querySelector(
    "#main-temperature"
  ).innerHTML = `${celsiusTemperature}°`;
}

function retrievePosition(position) {
  let apiKey = "a43a933ee08be334d6f5d62e405ad630";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCelsiusInCurrentLocation);
}

function startGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationIconButton = document.querySelector(
  "#current-location-icon"
);
currentLocationIconButton.addEventListener("click", startGeolocation);
