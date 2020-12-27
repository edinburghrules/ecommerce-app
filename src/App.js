import './App.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
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
    <Provider store={store}>
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
          <PrivateRoute
            path='/signIn'
            component={Signin}
            authenticated={false}
          />
          <PrivateRoute
            path='/register'
            component={Register}
            authenticated={false}
          />
        </Switch>
      </div>
    </Provider>
  );
};

export default App;
