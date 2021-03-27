const functions = require("firebase-functions");
var cors = require("cors");
const app = require("express")();
app.use(cors());

const firebaseAuth = require("./util/firebaseAuth");

// Accounts routes
const {
  register,
  signIn,
  resetPassword,
  getAuthenticatedAccount,
  addAddress,
} = require("./handlers/accounts");

app.post("/register", register);
app.post("/signin", signIn);
app.post("/reset-password", resetPassword);
app.get("/account", firebaseAuth, getAuthenticatedAccount);
app.post("/add-address", firebaseAuth, addAddress);

// Cart routes
const {
  addToCartFromLocalStorage,
  addToCart,
  removeCart,
  getCart,
  deleteFromCart,
  increaseQty,
  decreaseQty,
  getStockQty,
} = require("./handlers/cart");

app.post("/add-to-cart", firebaseAuth, addToCart);
app.post("/remove-cart", firebaseAuth, removeCart);
app.post(
  "/add-to-cart-from-local-storage",
  firebaseAuth,
  addToCartFromLocalStorage
);
app.get("/get-cart", firebaseAuth, getCart);
app.post("/delete-from-cart", firebaseAuth, deleteFromCart);
app.post("/increase-qty", firebaseAuth, increaseQty);
app.post("/decrease-qty", firebaseAuth, decreaseQty);
app.post("/get-stock-qty", getStockQty);

// Payment routes
const { getPaymentIntent } = require("./handlers/payment-intents");
app.post("/payment-intents", getPaymentIntent);

// Favourite routes
const {
  getFavourites,
  addFavourite,
  removeFavourite,
} = require("./handlers/favourites");

app.post("/get-favourites", firebaseAuth, getFavourites);
app.post("/add-favourite", firebaseAuth, addFavourite);
app.post("/remove-favourite", firebaseAuth, removeFavourite);

// Products routes
const {
  getAllProducts,
  getProductsByCategory,
  getProductsByFilter,
  getProduct,
} = require("./handlers/products");

app.get("/products", getAllProducts);
app.get("/products-category", getProductsByCategory);
app.get("/filtered-products", getProductsByFilter);
app.post("/get-product", getProduct);

// Reviews routes
const { getProductReviews, addProductReview } = require("./handlers/reviews");

app.post("/get-reviews", getProductReviews);
app.post("/add-review", addProductReview);

// Orders routes
const { submitOrder, getOrder, getAllOrders } = require("./handlers/orders");

app.post("/submit-order", submitOrder);
app.post("/get-order", getOrder);
app.get("/get-all-orders", firebaseAuth, getAllOrders);

exports.api = functions.https.onRequest(app);
