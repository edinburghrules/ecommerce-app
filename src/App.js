import './App.scss';
import { Route, Switch } from 'react-router-dom';
import {
  mensApparelLinks,
  mensShoeLinks,
  mensCollectionLinks,
  womensApparelLinks,
  womensShoeLinks,
  womensCollectionLinks,
} from './navigation-links/navigation-links';
import NavigationBar from './components/navigation-bar/navigation-bar';
import Home from './pages/home/home';

function App() {
  return (
    <div className='App'>
      <NavigationBar
        mensApparelLinks={mensApparelLinks}
        mensShoeLinks={mensShoeLinks}
        mensCollectionLinks={mensCollectionLinks}
        womensApparelLinks={womensApparelLinks}
        womensShoeLinks={womensShoeLinks}
        womensCollectionLinks={womensCollectionLinks}
      />
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
