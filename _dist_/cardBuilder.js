import { weatherFetch } from './weather.js';

const API_ICON_URL = 'http://openweathermap.org/img/wn/';

const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
  new Date().getDay()
];

const currentTime12hr = () => {
  const date = new Date();
  let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const am_pm = date.getHours() >= 12 ? 'PM' : 'AM';
  hours = hours < 10 ? '0' + hours : hours;
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  // const seconds =
  //   date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  let time = `${hours}:${minutes} ${am_pm}`;
  return time;
};

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const cardBuilder = async (
  mountNode,
  mountPosition = 'beforeend',
  fetchParameters
) => {
  const data = await weatherFetch(...fetchParameters);
  console.log(data);

  const article = document.createElement('article');
  article.classList =
    'article_comp p-6 mt-10 flex flex-col items-center justify-around  rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-500 bg-opacity-80 w-5/6';

  //////////// HEADER /////////////////////////////
  const articleHeader = document.createElement('div');
  articleHeader.classList = ' flex flex-col justify-center items-center';
  const articleHeaderTitle = document.createElement('h2');
  const articleHeaderInfo = document.createElement('p');

  articleHeaderTitle.textContent = `${data.name}`;
  articleHeaderTitle.className = 'text-gray-50 text-3xl tracking-wide';

  articleHeaderInfo.textContent = `${weekday}, ${currentTime12hr()}`;
  articleHeaderInfo.className = 'text-gray-200 mt-1 tracking-wide';

  /////////// BODY ///////////////////////////////
  const articleBody = document.createElement('div');
  articleBody.classList = 'w-full flex flex-row';
  const articleBodyStatus = document.createElement('div');
  articleBodyStatus.classList = 'w-2/3';

  const articleBodyStatusAmbient = document.createElement('div');
  articleBodyStatusAmbient.classList =
    'flex flex-row justify-start items-center';

  const articleBodyStatusAmbientIcon = document.createElement('img');
  articleBodyStatusAmbientIcon.width = '55';
  articleBodyStatusAmbientIcon.src = `${API_ICON_URL}${data.weather[0].icon}@2x.png`;
  const articleBodyStatusAmbientText = document.createElement('h4');
  articleBodyStatusAmbientText.textContent = `${capitalize(
    data.weather[0].main
  )}`;
  articleBodyStatusAmbientText.className = 'text-gray-100 text-3xl';

  const articleBodyStatusTemp = document.createElement('h3');
  articleBodyStatusTemp.textContent = `${Math.round(data.main.temp)}°`;
  articleBodyStatusTemp.className = 'text-gray-100 text-8xl';

  const articleBodyMinMax = document.createElement('div');
  articleBodyMinMax.className = 'w-1/3 flex items-end justify-center';

  const articleBodyMinMaxContainer = document.createElement('div');
  articleBodyMinMaxContainer.className = 'text-3xl divide-y';

  const articleBodyMinMaxContainerMaxTmp = document.createElement('div');
  articleBodyMinMaxContainerMaxTmp.textContent = `${Math.round(
    data.main.temp_max
  )}°C`;
  articleBodyMinMaxContainerMaxTmp.className = '';

  articleBodyMinMaxContainerMaxTmp.className = 'text-gray-100';
  const articleBodyMinMaxContainerMinTmp = document.createElement('div');
  articleBodyMinMaxContainerMinTmp.textContent = `${Math.round(
    data.main.temp_min
  )}°C`;
  articleBodyMinMaxContainerMinTmp.className = 'text-gray-100';

  ///////////// Footer /////////////////////////
  const articleFooter = document.createElement('div');
  articleFooter.className = 'h-1/4 w-full';

  ////////////////APPENDS /////////////////////

  //////////////Header append ///////////////
  articleHeader.append(articleHeaderTitle);
  articleHeader.append(articleHeaderInfo);
  article.append(articleHeader);
  //////////////////////////BODY APPEND /////////////////////
  // Ambient
  articleBodyStatusAmbient.append(articleBodyStatusAmbientIcon);
  articleBodyStatusAmbient.append(articleBodyStatusAmbientText);
  // Status
  articleBodyStatus.append(articleBodyStatusAmbient);
  articleBodyStatus.append(articleBodyStatusTemp);
  articleBody.append(articleBodyStatus);
  // min max temp
  articleBodyMinMaxContainer.append(articleBodyMinMaxContainerMaxTmp);
  articleBodyMinMaxContainer.append(articleBodyMinMaxContainerMinTmp);
  articleBodyMinMax.append(articleBodyMinMaxContainer);
  articleBody.append(articleBodyMinMax);
  article.append(articleBody);
  //////////////////// FOOTER APPEND ///////////////
  article.append(articleFooter);

  mountNode.insertAdjacentElement(mountPosition, article);
};
