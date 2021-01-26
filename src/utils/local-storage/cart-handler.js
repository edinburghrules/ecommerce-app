// Parse local storage cart
export const parseCartFromLocalStorage = (cart) => {
  let cartFromLocalStorage = localStorage.getItem(cart);
  cartFromLocalStorage = JSON.parse(cartFromLocalStorage);

  return cartFromLocalStorage;
};

// Add favourite to local storage
export const addToCartLocalStorage = (cart, product) => {
  const parsedCart = parseCartFromLocalStorage(cart);

  let saveCartToLocalStorage = [];

  if (parsedCart !== null) {
    saveCartToLocalStorage = [...parsedCart, product];
    localStorage.setItem(cart, JSON.stringify(saveCartToLocalStorage));
  } else {
    saveCartToLocalStorage = [product];
    localStorage.setItem(cart, JSON.stringify(saveCartToLocalStorage));
  }
};
