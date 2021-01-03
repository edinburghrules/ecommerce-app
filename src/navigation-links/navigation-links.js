import denim from '../assets/denim.jpg';
import knits from '../assets/knitwear.jpg';

// Mens Links

export const mensApparelLinks = [
  { category: "Men's Apparel", path: '/collections/mens/apparel' },
  { category: 'T-Shirts', path: '/collections/mens/apparel/t-shirts' },
  { category: 'Sweaters', path: '/collections/mens/apparel/sweaters' },
  {
    category: 'Coats & Jackets',
    path: '/collections/mens/apparel/coats&jackets',
  },
  { category: 'Trousers', path: '/collections/mens/apparel/trousers' },
];

export const mensShoeLinks = [
  {
    title: "Men's Shoes",
    path: '/collection/mens-shoes/',
    collection: 'mens-shoes',
    category: null
  },
  {
    title: 'Everyday Sneakers',
    path: '/collection/mens-shoes/everyday-sneakers',
    collection: 'mens-shoes',
    category: 'everyday-sneakers'

  },
  {
    title: 'Hi Tops',
    path: '/collection/mens-shoes/hi-tops',
    collection: 'mens-shoes',
    category: 'hi-tops'
  },
];

export const mensCollectionLinks = [
  { category: 'Featured Collections', path: '/collections/mens/collections' },
  {
    category: 'Denim Collection',
    path: '/collections/mens/denim-collection',
    img: denim,
  },
  {
    category: 'Premium Knitwear',
    path: '/collections/mens/premium-knitwear',
    img: knits,
  },
];

// Womens Links

export const womensApparelLinks = [
  { category: "Women's Apparel", path: '/collections/womens/apparel' },
  { category: 'T-Shirts', path: '/collections/womens/apparel/t-shirts' },
  { category: 'Sweaters', path: '/collections/womens/apparel/sweaters' },
  {
    category: 'Coats & Jackets',
    path: '/collections/womens/apparel/coats&jackets',
  },
  { category: 'Trousers', path: '/collections/womens/apparel/trousers' },
];

export const womensShoeLinks = [
  { category: "Women's Shoes", path: '/collections/womens/shoes' },
  { category: 'Casual', path: '/collections/womens/shoes/casual' },
  { category: 'Boots', path: '/collections/womens/shoes/boots' },
];

export const womensCollectionLinks = [
  { category: 'Featured Collections', path: '/collections/womens/collections' },
  {
    category: 'Denim Collection',
    path: '/collections/womens/denim-collection',
    img: denim,
  },
  {
    category: 'Premium Knitwear',
    path: '/collections/womens/premium-knitwear',
    img: knits,
  },
];
