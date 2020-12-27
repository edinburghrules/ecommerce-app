import { SET_ACCOUNT } from '../types';
import axios from 'axios';

export const signIn = (signInData, history, setErrors) => {
  return async (dispatch) => {
    try {
      const signInResponse = await axios.post('/signin', signInData);
      const firebaseToken = `Bearer ${signInResponse.data}`;
      axios.defaults.headers.common.Authorization = firebaseToken;
      localStorage.setItem('firebaseToken', firebaseToken);
      dispatch(getAccountData());
      history.push('/');
    } catch (err) {
      console.log(err.response.data);
      setErrors(err.response.data);
    }
  };
};

export const getAccountData = () => {
  return async (dispatch) => {
    try {
      const accountDataResponse = await axios.get('/account');
      dispatch({ type: SET_ACCOUNT, payload: accountDataResponse.data });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
