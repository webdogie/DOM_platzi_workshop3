'use strict';
////////////////////////////////////////// SETUP //////////////////////////////////////////////////////////
import { weatherFetch } from './weather.js';
import { cardBuilder } from './cardBuilder.js';
// import { localWeather } from './localWeather';

const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '1cd38fdfb4e576db86733fbddac42215';
// 10d@2x.png

const weatherInput = document.querySelector('#input_city');
const weatherInputCode = document.querySelector('#input_city_code');
const weatherSeachButton = document.querySelector('#search');
const weatherSeachContainer = document.querySelector('#search_container');

const weatherArticleMount = document.querySelector('#weather_article_mount');

/////////////////////////////////////// EVENT LISTENERS //////////////////////////////////////////////////

weatherSeachButton.addEventListener('click', () => {
  const cityInput = weatherInput.value;
  const cityInputCode = weatherInputCode.value;
  // buildCard();
  cardBuilder(weatherArticleMount, undefined, [
    API_URL,
    API_KEY,
    'weather',
    cityInput,
    cityInputCode,
  ]);
  // console.log(weatherInput.value);
  weatherInput.value = '';
  weatherInputCode.value = '';
});

weatherSeachContainer.addEventListener('keypress', (e) => {
  const cityInput = weatherInput.value;
  const cityInputCode = weatherInputCode.value;
  if (e.key === 'Enter') {
    // buildCard();
    cardBuilder(weatherArticleMount, undefined, [
      API_URL,
      API_KEY,
      'weather',
      cityInput,
      cityInputCode,
    ]);
    // console.log(weatherInput.value);
    weatherInput.value = '';
    weatherInputCode.value = '';
  }
});
