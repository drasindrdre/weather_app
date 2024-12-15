function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");

  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(temperature);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

let windSpeedElement = document.querySelector("#wind-speed");
windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);
timeElement.innerHTML = formatDate(date);

let iconElement = document.querySelector("#icon")

iconElement.innerHTML = `<img
                class="weather-app-icon"
                src="${response.data.condition.icon_url}"
                alt=""
              />`; 

}

function formatDate(date) {
    
    let minutes = date.getMinutes();
    let hours = date.getHours();

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let day = days[date.getDay()];

if (minutes < 10) {
    minutes = `0${minutes}` ;
}

return `${day} ${hours}:${minutes}`
} 

function searchCity(city) {
  let apiKey = "8a3a6608o4abb33fba96t64a93c2140f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");



function displayForecast() {
let forecastElement = document.querySelector("#forecast");

let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let forecastHTML = "";

days.forEach(function(day) {
forecastHTML =  forecastHTML + `
  <div class = "weather-forecast-day" >
    <div class = "weather-forecast-date">${day}</div>
    <div class = "weather-forecast-icon">🌤️</div>
    <div class = "weather-forecast-temperatures">
      <div class = "weather-forecast-temperature">
        <strong>15&deg;</strong>
      </div>
      <div class = "weather-forecast-temperature">9&deg;</div>
    </div>
  </div>

`;  
});

forecastElement.innerHTML = forecastHTML;
}

displayForecast();