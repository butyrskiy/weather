import * as constants from '../modules/constants.js';

import {
  switchTabs,
  getWeather,
  getTime,
} from '../modules/support_functions.js';

const cityArr = [];

const response = JSON.parse(localStorage.getItem('locations'));
const locations = new Set(response);
renderAllLocations(response);

constants.searchForm.addEventListener('submit', getInputValue);
constants.addCity.addEventListener('click', AddLocations);
constants.locationsList.addEventListener('click', deleteAndCurrentCity);
constants.tabsList.addEventListener('click', switchTabs);

if (document.cookie) {
  const obj = getCookie();

  constants.cityNow.textContent = obj.currentCity;
  constants.temperatureNow.textContent = obj.temperature;
}

function getInputValue(e) {
  e.preventDefault();
  const cityName = constants.searchInput.value;

  getData(cityName);
  constants.searchInput.value = '';
  constants.searchInput.focus();
}

async function getData(cityName) {
  try {
    const data = await fetch(
      `${constants.serverUrl}?q=${cityName}&appid=${constants.apiKey}`
    );
    const forecastData = await fetch(
      `${constants.forecastUrl}?q=${cityName}&appid=${constants.apiKey}`
    );
    const forecastDataJSON = await forecastData.json();
    const dataToJSON = await data.json();
    render(dataToJSON);
    forecastRender(forecastDataJSON);
  } catch (error) {
    console.log(error);
  }
}

function render(response) {
  const city = response.name,
    temperature = (response.main.temp - 273.5).toFixed(1),
    feelsLike = (response.main.feels_like - 273, 5).toFixed(1),
    weather = getWeather(response),
    sunrise = getTime(response.sys.sunrise),
    sunset = getTime(response.sys.sunset);

  constants.cityNow.textContent = city;
  constants.temperatureNow.textContent = `${temperature}\u00B0`;
  constants.detailsCurrentCity.textContent = city;
  constants.detailsTemperature.textContent = `${temperature}\u00B0`;
  constants.detailsFeelsLike.textContent = feelsLike;
  constants.detailsWeather.textContent = weather;
  constants.detailsSunrise.textContent = sunrise;
  constants.detailsSunset.textContent = sunset;

  cityArr.push(response);

  addCurrentCityToLocalstorage(response);

  const cookieValue = `${city}; temperature=${temperature}`;

  setCookie('currentCity', cookieValue, {
    secure: true,
    'max-age': 3600,
  });
}

function AddLocations() {
  const res = JSON.parse(localStorage.getItem('currentCity'));

  const HTMLLocationsElement = `<li class="locations-item">
  <a href="" class="locations-link">${res.name}</a>
  <button class="delete-city"></button>
  </li>`;
  constants.locationsList.insertAdjacentHTML('beforeend', HTMLLocationsElement);

  locations.add(res);

  addLocationsToLocalStorage();
}

function renderAllLocations(response) {
  if (!response) return;
  response.forEach((elem) => {
    const HTMLLocationsElement = `<li class="locations-item">
  <a href="" class="locations-link">${elem.name}</a>
  <button class="delete-city"></button>
  </li>`;
    constants.locationsList.insertAdjacentHTML(
      'beforeend',
      HTMLLocationsElement
    );
  });
}

function deleteAndCurrentCity(e) {
  e.preventDefault();
  if (e.target.className === 'delete-city') {
    const parentNode = e.target.closest('.locations-item');
    const previousElement = e.target.previousElementSibling;
    const cityName = previousElement.textContent;

    for (const item of locations) {
      if (item.name === cityName) {
        locations.delete(item);
      }
    }

    parentNode.remove();
    addLocationsToLocalStorage();
  }

  if (e.target.className === 'locations-link') {
    const parentNode = e.target.closest('.locations-link');
    const cityName = parentNode.textContent;

    let city;
    locations.forEach((cityInfo) => {
      if (cityInfo.name === cityName) {
        city = cityInfo;
      }
    });
    render(city);
  }
}

function forecastRender(response) {
  const data = response.list;

  for (let i = 0; i < 1; ++i) {
    const li = `<li class="forecast-list-item">
  <div class="forecast-list-item-box">
    <div class="top-info">
      <span class="forecast-card date">${data[i].dt_txt}</span>
      <span class="forecast-card time">12:00</span>
    </div>
    <div class="bottom-info">
      <div class="temperature-info">
        <span class="forecast-card forecast-temperature">Temperature: ${data[i].main.temp}</span>
        <span class="forecast-card forecast-feels-like">Feels like: ${data[i].main.feels_like}</span>
      </div>
      <div class="temperature-status">
        <span class="forecast-card weather-status">Rain</span>
        <img src="img/rain.svg" class="forecast-icon" alt="cloud icon">
      </div>
    </div>
  </div>
    </li>`;

    constants.forecastList.insertAdjacentHTML('afterbegin', li);
  }
}

function addCurrentCityToLocalstorage(response) {
  localStorage.setItem('currentCity', JSON.stringify(response));
}

function addLocationsToLocalStorage() {
  localStorage.setItem('locations', JSON.stringify([...locations]));
}

function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    ...options,
  };

  let updatedCookie =
    encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie() {
  const cookies = decodeURIComponent(document.cookie);

  return cookies.split('; ').reduce((acc, item) => {
    const [name, value] = item.split('=');
    acc[name] = value;
    return acc;
  }, {});
}
