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

export const getCharacterById = ({ id }) =>
  axios
    .get(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${process.env.REACT_APP_API_KEY}`
    )
    .then((data) => data.data.data.results[0]);

export const getComicsByCharacterId = ({ id }) =>
  axios
    .get(
      `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?apikey=${process.env.REACT_APP_API_KEY}`
    )
    .then((data) => data.data.data.results);
