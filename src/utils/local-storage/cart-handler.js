// Parse local storage cart
export const parseCartFromLocalStorage = (cart) => {
  let cartFromLocalStorage = localStorage.getItem(cart);
  cartFromLocalStorage = JSON.parse(cartFromLocalStorage);
  return cartFromLocalStorage || [];
};

// Add favourite to local storage
export const addToCartLocalStorage = (product) => {
  let parsedCart = parseCartFromLocalStorage("cart");

  let saveCartToLocalStorage = [];

  if (parsedCart.length > 0) {
    // Check to see if this product is already in cart
    const index = parsedCart.findIndex((cartItem) => {
      return (
        cartItem.id === product.id &&
        cartItem.color === product.color &&
        cartItem.size === product.size
      );
    });

    // TODO: Check qty in stock and if product qty is greater than stock qty dispatch low stock

    if (index > -1) {
      parsedCart[index].qty += 1;
      localStorage.setItem("cart", JSON.stringify(parsedCart));
    } else {
      parsedCart = [...parsedCart, product];
      localStorage.setItem("cart", JSON.stringify(parsedCart));
    }
  } else {
    saveCartToLocalStorage = [product];
    localStorage.setItem("cart", JSON.stringify(saveCartToLocalStorage));
  }
};

export const deleteFromCartLocalStorage = (product) => {
  const parsedCart = parseCartFromLocalStorage("cart");

  const index = parsedCart.findIndex((cartItem) => {
    return (
      cartItem.id === product.id &&
      cartItem.color === product.color &&
      cartItem.size === product.size
    );
  });

  parsedCart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(parsedCart));
};

export const increaseQtyLocalStorage = (product) => {
  const parsedCart = parseCartFromLocalStorage("cart");

  const indexOfProductToUpdate = parsedCart.findIndex((cartItem) => {
    return (
      cartItem.id === product.id &&
      cartItem.color === product.color &&
      cartItem.size === product.size
    );
  });

  const productToUpdate = parsedCart.find((cartItem) => {
    return (
      cartItem.id === product.id &&
      cartItem.color === product.color &&
      cartItem.size === product.size
    );
  });

  productToUpdate.qty += 1;

  parsedCart.splice(indexOfProductToUpdate, 1, productToUpdate);

  localStorage.setItem("cart", JSON.stringify(parsedCart));

  return productToUpdate.qty;
};

export const decreaseQtyLocalStorage = (product) => {
  const parsedCart = parseCartFromLocalStorage("cart");

  const indexOfProductToUpdate = parsedCart.findIndex((cartItem) => {
    return (
      cartItem.id === product.id &&
      cartItem.color === product.color &&
      cartItem.size === product.size
    );
  });

  const productToUpdate = parsedCart.find((cartItem) => {
    return (
      cartItem.id === product.id &&
      cartItem.color === product.color &&
      cartItem.size === product.size
    );
  });

  productToUpdate.qty -= 1;

  if (productToUpdate.qty > 0) {
    parsedCart.splice(indexOfProductToUpdate, 1, productToUpdate);
    localStorage.setItem("cart", JSON.stringify(parsedCart));
  } else {
    parsedCart.splice(indexOfProductToUpdate, 1);
    localStorage.setItem("cart", JSON.stringify(parsedCart));
  }
};

export const getCurrentQtyLocalStorage = (product) => {
  const parsedCart = parseCartFromLocalStorage("cart");

  const productToUpdate = parsedCart.find((cartItem) => {
    return (
      cartItem.id === product.id &&
      cartItem.color === product.color &&
      cartItem.size === product.size
    );
  });

  const currentQty = productToUpdate.qty;

  return currentQty;
};
