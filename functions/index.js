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
} = require("./handlers/accounts");

app.post("/register", register);
app.post("/signin", signIn);
app.post("/reset-password", resetPassword);
app.get("/account", firebaseAuth, getAuthenticatedAccount);

// Cart routes
const {
  addToCart,
  getCart,
  deleteFromCart,
  increaseQty,
  decreaseQty,
  getStockQty,
} = require("./handlers/cart");

app.post("/add-to-cart", firebaseAuth, addToCart);
app.get("/get-cart", firebaseAuth, getCart);
app.post("/delete-from-cart", firebaseAuth, deleteFromCart);
app.post("/increase-qty", firebaseAuth, increaseQty);
app.post("/decrease-qty", firebaseAuth, decreaseQty);
app.post("/get-stock-qty", getStockQty);

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
const { getProductReviews } = require("./handlers/reviews");

app.post("/get-reviews", getProductReviews);

exports.api = functions.https.onRequest(app);
