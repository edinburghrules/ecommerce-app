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
import Signin from './pages/auth/sign-in';
import Register from './pages/auth/register';

const App = () => {
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
        <Route path='/signin' component={Signin} />
        <Route path='/register' component={Register} />
      </Switch>
    </div>
  );
};

export default App;
