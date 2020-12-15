const axios = require("axios");

export const getCharacters = (offset) =>
  axios
    .get(
      `https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&limit=${20}&apikey=${
        process.env.REACT_APP_API_KEY
      }`
    )
    .then((data) => data.data.data);
