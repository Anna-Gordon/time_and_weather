const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  weatherAPI: process.env.WEATHER_API_KEY,
  googleAPI: process.env.GOOGLE_API_KEY
};