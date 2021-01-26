// Parse local storage favourites
export const parseFavouritesFromLocalStorage = (favourites) => {
  let favouritesFromLocalStorage = localStorage.getItem(favourites);
  favouritesFromLocalStorage = JSON.parse(favouritesFromLocalStorage);

  return favouritesFromLocalStorage;
};

// Get favourites from local storage
export const getFavouritesFromLocalStorage = (
  favourites,
  productId,
  productVariantColor
) => {
  const parsedFavourites = parseFavouritesFromLocalStorage(favourites);

  /* Loop over the parsed favourites from ls 
  and find the favourite which has the same matching id and color 
  as passed in */
  if (parsedFavourites !== null) {
    const item = parsedFavourites.find((favourite) => {
      return (
        favourite.id === productId && favourite.color === productVariantColor
      );
    });
    return item;
  } else {
    return false;
  }
};

// Add favourite to local storage
export const addFavouriteToLocalStorage = (favourites, favouritedProduct) => {
  const parsedFavourites = parseFavouritesFromLocalStorage(favourites);

  let saveFavouritesToLocalStorage = [];

  if (parsedFavourites !== null) {
    saveFavouritesToLocalStorage = [...parsedFavourites, favouritedProduct];
    localStorage.setItem(
      favourites,
      JSON.stringify(saveFavouritesToLocalStorage)
    );
  } else {
    saveFavouritesToLocalStorage = [favouritedProduct];
    localStorage.setItem(
      favourites,
      JSON.stringify(saveFavouritesToLocalStorage)
    );
  }
};

// Remove favourite from local storage
export const removeFavouriteFromLocalStorage = (
  favourites,
  productId,
  productVariantColor
) => {
  const parsedFavourites = parseFavouritesFromLocalStorage(favourites);

  if (parsedFavourites !== null) {
    const filteredFavourites = parsedFavourites.filter((favourite) => {
      if (productId === favourite.id) {
        return productVariantColor !== favourite.color;
      } else {
        return null;
      }
    });

    localStorage.setItem(favourites, JSON.stringify(filteredFavourites));

    getFavouritesFromLocalStorage(favourites, productId, productVariantColor);
  }
};
