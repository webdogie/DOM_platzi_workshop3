import { weatherFetch } from './weather';

const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '1cd38fdfb4e576db86733fbddac42215';

if ('geolocation' in navigator) {
  console.log('GEOLOCATION supported');
} else {
  console.log('GEOLOCATION not supported');
}

// const localForecastData =
// navigator.geolocation.getCurrentPosition(
//   async (position) => {
//     // doSomething(position.coords.latitude, position.coords.longitude);
//     // console.log(
//     //   `Latitude: ${position.coords.latitude} | Longitude: ${position.coords.longitude}`
//     // );
//     // console.log(localForecastData);
//     return const localForecastData = await weatherFetch(
//       API_URL,
//       API_KEY,
//       'weather',
//       undefined,
//       undefined,
//       position.coords.latitude,
//       position.coords.longitude
//     );
//   }
// );

// export const localWeather = forecast;
