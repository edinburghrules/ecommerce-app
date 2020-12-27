import './App.scss';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/private-route/PrivateRoute';
// import jwtDecode from 'jwt-decode';
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

// let authenticated;
// const token = localStorage.firebaseToken;
// if (token) {
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     window.location.href = '/signin';
//     authenticated = false;
//   } else {
//     authenticated = true;
//   }
// }
// console.log(authenticated);

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
        <PrivateRoute path='/signIn' component={Signin} authenticated={true} />
        <PrivateRoute
          path='/register'
          component={Register}
          authenticated={true}
        />
      </Switch>
    </div>
  );
};

export default App;
