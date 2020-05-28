const request = require('request');
const moment = require('moment-timezone');
const cityTimezones = require('city-timezones');
//import environment variables api keys for: https://api.openweathermap.org and https://maps.googleapis.com
const { weatherAPI, googleAPI } = require('./config');

//command line arguments 
const userInput = process.argv.slice(2);
const regex = /^[a-z]+$/i;
const regZipNum = /[0-9]/;
if (userInput[0].match(regZipNum) || userInput[0].match(regZipNum) && userInput[0].match(regex)) {
  console.log("It is zip code");
} 
if (userInput[0].match(regex)) {
  console.log("It is a name of city");
} else {
  console.log("Location is not found");
}

//helper functions
const findTimeByLocationName = (location) => {
    const locationTimezone = cityTimezones.lookupViaCity(location);
    // const locationTimezone = cityTimezones.findFromCityStateProvince(location);
    console.log("ASDFGH", locationTimezone);
    const momentTimeZone = moment.tz(locationTimezone[0].timezone);
    console.log(`The time in ${location} is ${momentTimeZone.toLocaleString()}`);
  // } else {
  //   return "Location is not found";
  // }
  // return momentTimeZone.toLocaleString();
}

const formatWeatherData = (data) => {
  const { weather, main, name } = data;
  let temperature = main.temp;
  let tempFeelsLike = main.feels_like;
  let description = weather[0].main.toLowerCase();
  console.log(`The temperature in ${name} is ${temperature} (feels like ${tempFeelsLike}) and ${description}`);
}

// request(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${userInput[0]}&appid=${weatherAPI}`, (error, response, body) => {
//   if (error) {
//     return `Error message: ${error}`;
//   } else if (response.statusCode !== 200) {
//     const msg = `Status Code ${response.statusCode} when fethching weather for ... . Response: ${body}`;
//     return msg;
//   } else {
//     body = JSON.parse(body);
//     formatWeatherData(body);
//     findTimeByLocationName(userInput[0]);
//   }
// });

request(`https://maps.googleapis.com/maps/api/geocode/json?address=${userInput[0]}&key=${googleAPI}`, (er, res, body) => {
  if (res.statusCode !== 200) {
    console.log("Response: ", res.statusCode);
  }
  body = JSON.parse(body);
  console.log(body.results[0].address_components[1].short_name);
  console.log(body.results[0].formatted_address);
})


// `http://maps.googleapis.com/maps/api/geocode/json?address=92101`


// request(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleTimezoneKey}`, (er, res, body) => {
  // console.log(body);
  // let localTime = Date(1331161200 + body.dstOffset + body.rawOffset);
  // let localTime = moment().tz("1331161200", body.timeZoneId);
  // console.log(localTime);
  
//   const locationTime = cityTimezones.findFromCityStateProvince(userInput[0]);
//   console.log(locationTime);
  
//   //current location time
//   let date = new Date();
//   let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
//   console.log("DATE", date);
//   console.log("UTC", utc);
//   let torontoOffset = 5;
//   let torontoTime = new Date(utc + (3600000 * torontoOffset));
//   console.log(torontoTime.toLocaleString());
// })
// let offset = momentTimeZone.utcOffset();
// if (momentTimeZone.isDST) {
//   offset -= 60;
// }

// offset = offset / 60;
// console.log(offset);

//find timezone for location 
// const locationTimezone = cityTimezones.lookupViaCity(userInput[0]);
// const momentTimeZone = moment.tz(locationTimezone[0].timezone);
// console.log(`The time in ${userInput[0]} is ${momentTimeZone.toLocaleString()}`);
// // let searchCity = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${userInput[0]}&appid=${apiKey}`;



 