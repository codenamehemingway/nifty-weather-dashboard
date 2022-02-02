// global variables

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-input");
var currentWeatherEl = document.querySelector("#weather-container");
var citySearchOutputEl = document.querySelector("#searched-city");
var forecastInfo = document.querySelector("#forecast");
var multiDayForecast = document.querySelector("#multi-day-forecast");
var multiDayContainerEl = document.querySelector("#multi-day-container");
var priorSearchButtonEl = document.querySelector("#prior-search-buttons");
var priorSearch = document.getElementsByClassName("prior-search");
var searchBox = document.getElementsByClassName("search-box");
var currentCity = document.getElementsByClassName("current-city");
var cities = [];

// start function with form submission
var formSubmission = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getWeather(city);
    get5Day(city);
    cities.unshift({ city });
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
  saveSearch();
  pastSearch(city);
};

var saveSearch = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
};

var getWeather = function (city) {
  var apiKey = "d3e5277fbff376e9a968986ed05ba8fb";
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      showWeather(data, city);
    });
  });
};

var showWeather = function (weather, searchCity) {
  //clear old content
  currentWeatherEl.textContent = "";
  citySearchOutputEl.textContent = searchCity;

  //create date element
  var currentDate = document.createElement("span");
  currentDate.textContent =
    " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
  citySearchOutputEl.appendChild(currentDate);

  //create an image spot for the current weather icon
  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  );
  citySearchOutputEl.appendChild(weatherIcon);

  //create a span for temp, humidity, and wind
  var temperatureEl = document.createElement("span");
  temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
  temperatureEl.classList = "list-group-item";

  var humidityEl = document.createElement("span");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
  humidityEl.classList = "list-group-item";

  var windSpeedEl = document.createElement("span");
  windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  windSpeedEl.classList = "list-group-item";

  // attach wind, temp, and humidity
  currentWeatherEl.appendChild(temperatureEl);

  currentWeatherEl.appendChild(humidityEl);

  currentWeatherEl.appendChild(windSpeedEl);

  var lat = weather.coord.lat;
  var lon = weather.coord.lon;
  getUvIndex(lat, lon);
};

var getUvIndex = function (lat, lon) {
  var apiKey = "d3e5277fbff376e9a968986ed05ba8fb";
  var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      displayUvIndex(data);
    });
  });
};
// create uv index display area
var displayUvIndex = function (index) {
  var uvIndexEl = document.createElement("div");
  uvIndexEl.textContent = "UV Index: ";
  uvIndexEl.classList = "list-group-item";

  uvIndexValue = document.createElement("span");
  uvIndexValue.textContent = index.value;

  if (index.value <= 2) {
    uvIndexValue.classList = "favorable";
  } else if (index.value > 2 && index.value <= 8) {
    uvIndexValue.classList = "moderate ";
  } else if (index.value > 8) {
    uvIndexValue.classList = "severe";
  }

  uvIndexEl.appendChild(uvIndexValue);

  //attach UV to current weather
  currentWeatherEl.appendChild(uvIndexEl);
};
// obtain the 5 day forecast
var get5Day = function (city) {
  var apiKey = "d3e5277fbff376e9a968986ed05ba8fb";
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      display5Day(data);
    });
  });
};
// display the 5 day forecast
var display5Day = function (weather) {
  multiDayContainerEl.textContent = "";
  forecastInfo.textContent = "5-Day Forecast:";

  var forecast = weather.list;
  for (var i = 5; i < forecast.length; i = i + 8) {
    var dailyForecast = forecast[i];

    var forecastEl = document.createElement("div");
    forecastEl.classList = "card bg-primary text-light m-2";

    //date element
    var forecastDate = document.createElement("h5");
    forecastDate.textContent = moment
      .unix(dailyForecast.dt)
      .format("MMM D, YYYY");
    forecastDate.classList = "card-header text-center";
    forecastEl.appendChild(forecastDate);

    //image element for the icon pulled from openweather
    var weatherIcon = document.createElement("img");
    weatherIcon.classList = "card-body text-center";
    weatherIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`
    );
    // attach temp, humidity, and icon
    forecastEl.appendChild(weatherIcon);

    var forecastTempEl = document.createElement("span");
    forecastTempEl.classList = "card-body text-center";
    forecastTempEl.textContent = dailyForecast.main.temp + " °F";

    forecastEl.appendChild(forecastTempEl);

    var forecastHumEl = document.createElement("span");
    forecastHumEl.classList = "card-body text-center";
    forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

    forecastEl.appendChild(forecastHumEl);

    multiDayContainerEl.appendChild(forecastEl);
  }
};

// var pastSearch = function (pastSearch) {
//   pastSearchEl = document.createElement("button");
//   pastSearchEl.textContent = pastSearch;
//   pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
//   pastSearchEl.setAttribute("data-city", pastSearch);
//   pastSearchEl.setAttribute("type", "submit");

//   priorSearchButtonEl.prepend(pastSearchEl);
// };

// var pastSearchHandler = function (event) {
//   var city = event.target.getAttribute("data-city");
//   if (city) {
//     getWeather(city);
//     get5Day(city);
//   }
// };

searchFormEl.addEventListener("submit", formSubmission);
// priorSearchButtonEl.addEventListener("click", pastSearchHandler);
