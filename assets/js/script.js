// global variables
var city = []
var searchFormEl=document.querySelector("#search-form");
var cityInputEl=document.querySelector("#city-input");
var currentWeatherEl=document.querySelector("#weather-container");
var citySearchOutputEl = document.querySelector("#searched-city");
var forecastInfo = document.querySelector("#forecast");
var multiDayForecast = document.querySelector("#multi-day-forecast")
var multiDayContainerEl = document.querySelector("#multi-day-container");
var priorSearchButtonEl = document.querySelector("#prior-search-buttons");
var priorSearch= document.getElementsByClassName("prior-search");
var searchBox = document.getElementsByClassName("search-box");
var currentCity = document.getElementsByClassName("current-city");

api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// search function tied to button taking from the input field

// adding histroy via href nodes under search box

// main weather display

// 5 day forecast put into cards below main
