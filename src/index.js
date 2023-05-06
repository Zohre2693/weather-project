function formatDate(time) {
  let date = new Date(time);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  return `${day} ${hours}:${minutes}`;
}
function displayForcast() {
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "sat", "sun"];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `
     <div class="col-2">
       <div class="forcast-day">${day}</div>
       <img
         src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
         alt=""
         width="36"
       />
       <div class="forcast-temp">
         <span class="forcast-temp-max">18</span>
         <span class="forcast-temp-min">12</span>
       </div>
     
   </div>`;
  });

  forcatHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
  console.log(forcastHTML);
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed * 3.6)}`;
  dateElement.innerHTML = `Date: ${formatDate(response.data.dt * 1000)}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "e6122b0499d90359858b12c35df58b7e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("celsius");
  fahrenheitLink.classList.add("celsius");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("celsius");
  fahrenheitLink.classList.remove("farenheit");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#farenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search(" ");
displayForcast();
