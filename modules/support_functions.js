export { switchTabs, getWeather, getTime };

import { tabsNow, tabsDetails, tabsForecast } from './constants.js';

function switchTabs(e) {
  e.preventDefault();

  if (e.target.textContent === 'Now') {
    tabsNow.classList.remove('hidden');
    tabsDetails.classList.add('hidden');
    tabsForecast.classList.add('hidden');
  } else if (e.target.textContent === 'Details') {
    tabsNow.classList.add('hidden');
    tabsDetails.classList.remove('hidden');
    tabsForecast.classList.add('hidden');
  } else if (e.target.textContent === 'Forecast') {
    tabsNow.classList.add('hidden');
    tabsDetails.classList.add('hidden');
    tabsForecast.classList.remove('hidden');
  }
}

function getWeather(response) {
  let weather;
  response.weather.forEach((res) => {
    weather = res.main;
  });
  return weather;
}

function getTime(time) {
  let date = new Date(time * 1000);
  let hours = date.getHours();
  let minutes = '0' + date.getMinutes();
  let seconds = '0' + date.getSeconds();
  let formattedTime = `${hours}:${parseInt(minutes)}:${parseInt(seconds)}`;
  return formattedTime;
}
