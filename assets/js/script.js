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

// call on api url
var getWeather = function (city) {
  var apiKey = "d3e5277fbff376e9a968986ed05ba8fb";
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={d3e5277fbff376e9a968986ed05ba8fb}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      showWeather(data, city);
    });
  });
};
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// search function tied to button taking from the input field - event listener at the bottom of code
var formSubmission = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getWeather(city);
    getMultiDay(city);
    cities.unshift({ city });
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
  saveSearch();
  priorSearch(city);
};
// saving prior city searches to local storage and stringifying them to be able to pull them later
var saveSearch = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
};

// display retrieved data
var showWeather = function(weather, searchCity){
    //clear old content
    currentWeatherEl.textContent= "";  
    citySearchOutputEl.textContent=searchCity;
 
    console.log(weather);
// adding histroy via href nodes under search box

// main weather display

// 5 day forecast put into cards below main

searchFormEl.addEventListener("submit", formSubmission);

