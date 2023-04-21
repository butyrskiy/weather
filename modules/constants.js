export {searchForm, searchInput, temperatureNow, cityNow, addCity, locationsList, tabsList, tabsNow, tabsDetails, tabsForecast, detailsCurrentCity, detailsTemperature, detailsFeelsLike, detailsWeather, detailsSunrise, detailsSunset, serverUrl, cityName, apiKey, url, forecastUrl, forecastList};

const searchForm = document.querySelector('.search-form'),
      searchInput = document.querySelector('.search-input'),
      temperatureNow = document.querySelector('.temperature'),
      cityNow = document.querySelector('.info-current-city'),
      addCity = document.querySelector('.add-city'),
      locationsList = document.querySelector('.locations-list'),
      tabsList = document.querySelector('.tabs-list'),
      tabsNow = document.querySelector('.tabs-now'),
      tabsDetails = document.querySelector('.tabs-details'),
      tabsForecast = document.querySelector('.tabs-forecast'),
      detailsCurrentCity = document.querySelector('.details-current-city'),
      detailsTemperature = document.querySelector('.temperature-details-content'),
      detailsFeelsLike = document.querySelector('.feels_like-details-content'),
      detailsWeather = document.querySelector('.weather-details-content'),
      detailsSunrise = document.querySelector('.sunrise-details-content'),
      detailsSunset = document.querySelector('.sunset-details-content');

const forecastList = document.querySelector('.forecast-list');
      
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const cityName = 'boston';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';