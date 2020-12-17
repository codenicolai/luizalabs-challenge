const axios = require("axios");

export const getCharacters = ({ frase, offset, orderBy }) =>
  axios
    .get(
      `https://gateway.marvel.com:443/v1/public/characters?${
        frase && `name=${frase}&`
      }offset=${offset}&orderBy=${orderBy}&apikey=${
        process.env.REACT_APP_API_KEY
      }`
    )
    .then((data) => data.data.data);
