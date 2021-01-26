import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  UNSET_FAVOURITES,
} from '../types';
import axios from 'axios';

export const register = (registerData, history) => {
  return async (dispatch) => {
    try {
      const registerResponse = await axios.post('/register', registerData);
      setAuthorizationHeader(registerResponse.data);
      dispatch(getAccountData());
      history.push('/');
    } catch (err) {
      return err.response.data;
    }
  };
};

const setAuthorizationHeader = (token) => {
  const firebaseToken = `Bearer ${token}`;
  localStorage.setItem('firebaseToken', firebaseToken);
  axios.defaults.headers.common['Authorization'] = firebaseToken;
};

export const getAccountData = () => {
  return async (dispatch) => {
    try {
      const accountDataResponse = await axios.get('/account');
      dispatch({ type: SET_AUTHENTICATED, payload: accountDataResponse.data });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const signIn = (signInData, history) => {
  return async (dispatch) => {
    try {
      const signInResponse = await axios.post('/signin', signInData);
      setAuthorizationHeader(signInResponse.data);
      dispatch(getAccountData());
      history.push('/');
    } catch (err) {
      return err.response.data;
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    localStorage.removeItem('firebaseToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
    dispatch({ type: UNSET_FAVOURITES });
  };
};
