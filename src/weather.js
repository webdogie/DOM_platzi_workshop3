export const weatherFetch = async function (
  url,
  api_key,
  req_type,
  city,
  countrySymbol,
  lat,
  lon
) {
  // console.table(arguments);
  switch (arguments.length) {
    case 5:
      return await fetch(
        `${url}${req_type}?q=${city},${countrySymbol}&appid=${api_key}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.cod && !data.cod === '200') {
            console.error(`[Error] ${data.cod}`);
            return;
          }
          return data;
        });

    case 7:
      return await fetch(
        `${url}${req_type}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
      )
        .then((res) => res.json())

        .then((data) => {
          if (data.cod && !data.cod === '200') {
            console.error(`[Error] ${data.cod}`);
            return;
          }
          return data;
        });

    default:
      console.error('Invalide number of arguments');
  }
};
