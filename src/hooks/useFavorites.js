import { useState } from "react";

const useFavorites = () => {
  const [favs, setFavs] = useState(
    JSON.parse(window.localStorage.getItem("fav")) || []
  );

  const addOrRemoveFavorite = (favorite) => {
    if (favs.find((fav) => fav.id === favorite.id)) {
      const newFavs = favs.filter((fav) => fav.id !== favorite.id);
      window.localStorage.setItem("fav", JSON.stringify(newFavs));
      setFavs(newFavs);
    } else {
      if (favs.length > 4) {
        return window.alert("Limit of 5 favorites heroes reached!");
      }
      const newFavs = favs.concat(favorite);
      window.localStorage.setItem("fav", JSON.stringify(newFavs));
      setFavs(newFavs);
    }
  };

  const isFavorite = (hero) => {
    return favs.some((fav) => fav.id === hero.id);
  };

  return { favorites: favs, addOrRemoveFavorite, isFavorite };
};

export default useFavorites;
