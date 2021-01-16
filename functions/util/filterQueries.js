// Queries
const productsRef = db.collection(collection);

exports.categoryWithColors = productsRef
  .where('category', '==', category)
  .where('colors', 'array-contains-any', colors);

exports.categoryWithBestFor = productsRef
  .where('category', '==', category)
  .where('bestfor', 'array-contains-any', bestFor);

exports.categoryWithColorsAndBestFor = productsRef
  .where('category', '==', category)
  .where('colors', 'array-contains-any', colors)
  .where('bestfor', 'array-contains-any', bestFor);

exports.withColors = productsRef.where('colors', 'array-contains-any', colors);

exports.withBestFor = productsRef.where(
  'bestfor',
  'array-contains-any',
  bestFor
);

exports.withColorsAndBestFor = productsRef
  .where('colors', 'array-contains-any', colors)
  .where('bestfor', 'array-contains-any', bestFor);
