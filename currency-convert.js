const axios = require('axios');

// http://data.fixer.io/api/latest?access_key=2cddd92d5c6d882fe7493028312fd774

const currencyUrl = 'http://data.fixer.io/api/latest?access_key=2cddd92d5c6d882fe7493028312fd774';
const currencyCodeUrl = 'https://restcountries.eu/rest/v2/currency/';
// const getExchangeRate = (from, to) => {
//     return axios.get(url).then((response) => {
//         const euro = 1 / response.data.rates[from];
//         const rate = euro * response.data.rates[to];
//         return rate;
//     });
// };

//  const convertCurrency = (from, to, amount) => {
//      let convertedAmount;
//      return getExchangeRate(from,to).then((rate) => {
//          convertedAmount = (amount * rate).toFixed(2);
//          console.log(convertedAmount);
//             return getCountries(to);        
//       }).then((countries) => {
//              console.log(countries);   
//              return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries ${countries.join(',')}`
//  });    
//  };
const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(currencyUrl);
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    }

    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`${currencyCodeUrl}${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`)
  }
};

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const convertedAmount = (amount * rate).toFixed(2);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
};

convertCurrency('USD', 'CAD', 20).then((message) => {
  console.log(message);
}).catch((e) => {
  console.log(e.message);
});
// getExchangeRate('USD', 'TRY').then((rate) => {
//     console.log(rate);
// });

// getCountries('TRY').then((countries) => {
//     console.log(countries);
// });