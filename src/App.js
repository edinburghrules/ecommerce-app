import './App.scss';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from './components/navigation-bar/navigation-bar';
import Home from './pages/home/home';

const mensApparelLinks = [
  { category: 'Apparel', path: '/collections/mens/apparel' },
  { category: 'T-Shirts', path: 'collections/mens/apparel/t-shirts' },
  { category: 'Sweaters', path: 'collections/mens/apparel/sweaters' },
  {
    category: 'Coats & Jackets',
    path: 'collections/mens/apparel/coats&jackets',
  },
  { category: 'Trousers', path: 'collections/mens/apparel/trousers' },
];

const mensShoeLinks = [
  { category: 'Shoes', path: '/collections/mens/shoes' },
  { category: 'Casual', path: '/collections/mens/shoes/casual' },
  { category: 'Boots', path: '/collections/mens/shoes/boots' },
];

const mensCollectionLinks = [
  { category: 'Collections', path: '/collections/mens/collections' },
  {
    category: 'The Denim Collection',
    path: '/collections/mens/denim-collection',
  },
  { category: 'Premium Knitwear', path: '/collections/mens/premium-knitwear' },
];

function App() {
  return (
    <div className='App'>
      <NavigationBar
        mensApparelLinks={mensApparelLinks}
        mensShoeLinks={mensShoeLinks}
        mensCollectionLinks={mensCollectionLinks}
      />
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
