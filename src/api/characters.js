const axios = require("axios");

export const getCharacters = () =>
  axios
    .get(
      `https://gateway.marvel.com:443/v1/public/characters?apikey=${process.env.REACT_APP_API_KEY}`
    )
    .then((data) => data.data);
