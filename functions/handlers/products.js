const { db } = require("../util/admin");

const getProduct = async (req, res) => {
  const productId = req.body.productId;
  const collection = req.body.collection;

  try {
    const productsRef = db.collection(collection);
    const product = await productsRef.doc(productId).get();
    return res.status(200).json(product.data());
  } catch (err) {
    console.error(err);
  }
};

const getAllShoes = async (req, res) => {
  const collection = req.query.collection;
  const sort = req.query.sort ? req.query.sort : false;
  let productsRef = sort
    ? db.collection(collection).orderBy("price", sort)
    : db.collection(collection);

  const products = [];

  try {
    const querySnapshot = await productsRef.get();
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return res.status(201).json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const getShoesByCategory = async (req, res) => {
  const collection = req.query.collection;
  const category = req.query.category;
  const sort = req.query.sort ? req.query.sort : false;
  let productsRef = sort
    ? db.collection(collection).orderBy("price", sort)
    : db.collection(collection);
  const products = [];

  try {
    const querySnapshot = await productsRef
      .where("category", "==", category)
      .get();
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return res.status(201).json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const getShoesByFilter = async (req, res) => {
  const collection = req.query.collection;
  const sort = req.query.sort ? req.query.sort : false;
  let category = req.query.category ? req.query.category : false;
  let colors = req.query.colors ? req.query.colors : false;
  let bestFor = req.query.bestfor ? req.query.bestfor : false;
  let weather = req.query.weather ? req.query.weather : false;

  colors = colors && colors.split(",");
  bestFor = bestFor && bestFor.split(",");
  weather = weather && weather.split(",");

  let productsRef = sort
    ? db.collection(collection).orderBy("price", sort)
    : db.collection(collection);

  // Queries
  const categoryWithColors = productsRef
    .where("category", "==", category)
    .where("colors", "array-contains-any", colors);

  const categoryWithBestFor = productsRef
    .where("category", "==", category)
    .where("bestfor", "array-contains-any", bestFor);

  const categoryWithWeather = productsRef
    .where("category", "==", category)
    .where("weather", "array-contains-any", weather);

  const withColors = productsRef.where("colors", "array-contains-any", colors);

  const withBestFor = productsRef.where(
    "bestfor",
    "array-contains-any",
    bestFor
  );

  withWeather = productsRef.where("weather", "array-contains-any", weather);

  // Return products
  let querySnapshot;

  let products = [];

  if (category) {
    if (colors && weather) {
      try {
        querySnapshot = await categoryWithColors.get();
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    } else if (weather) {
      try {
        querySnapshot = await categoryWithWeather.get();
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    } else if (colors) {
      try {
        querySnapshot = await categoryWithColors.get();
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    }
  } else {
    if (colors && bestFor && weather) {
      console.log("colors, bestfor and weather");
      try {
        querySnapshot = await withColors.get();
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    } else if (colors && bestFor) {
      console.log("colors and bestfor");
      try {
        querySnapshot = await withColors.get();
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    } else if (colors && weather) {
      console.log("colors and weather");
      try {
        querySnapshot = await withColors.get();
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    } else if (bestFor && weather) {
      console.log("bestfor and weather");
      try {
        querySnapshot = await withBestFor.get();
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    } else if (bestFor) {
      console.log("bestfor only");
      try {
        querySnapshot = await withBestFor.get();
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    } else if (colors) {
      console.log("colors only");
      try {
        querySnapshot = await withColors.get();
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    } else if (weather) {
      console.log("weather only");
      try {
        querySnapshot = await withWeather.get();
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    }
  }

  if (colors && bestFor && weather) {
    console.log("colors, bestfor and weather");
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    products = products.filter((product) => {
      return product.weather.some((weatherType) =>
        weather.includes(weatherType)
      );
    });

    products = products.filter((product) => {
      return product.bestfor.some((bestfor) => bestFor.includes(bestfor));
    });

    return res.json(products);
  }

  if (colors && bestFor) {
    console.log("colors and bestfor");
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    products = products.filter((product) => {
      return product.bestfor.some((bestfor) => bestFor.includes(bestfor));
    });

    return res.json(products);
  }

  if (colors && weather) {
    console.log("colors and weather");
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    products = products.filter((product) => {
      return product.weather.some((a) => weather.includes(a));
    });

    return res.json(products);
  }

  if (bestFor && weather) {
    console.log("colors and weather");
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    products = products.filter((product) => {
      return product.weather.some((a) => weather.includes(a));
    });

    return res.json(products);
  }

  querySnapshot.forEach((doc) => {
    console.log("is this running");
    products.push({ id: doc.id, ...doc.data() });
  });

  console.log(products.length);

  return res.json(products);
};

module.exports = {
  getAllShoes,
  getShoesByCategory,
  getShoesByFilter,
  getProduct,
};

// if category, filter by color and weather, color or weather

// if no category filter by color bestfor and weather, color and bestfor, color and weather, bestfor and weather
