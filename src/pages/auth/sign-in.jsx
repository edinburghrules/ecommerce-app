import React from 'react';
import './sign-in.scss';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import googleIcon from '../../assets/search.png';

class SignIn extends React.Component {
  render() {
    const { handleSubmit, handleChange, values, errors, touched } = this.props;
    console.log(values);
    return (
      <div className='signin'>
        <div className='signin__container'>
          <form className='signin__form' onSubmit={handleSubmit}>
            <div className='signin__register'>
              <h1>Sign in to your account</h1>
              <span>No account?</span>
              <Link to='/register'>Register here</Link>
            </div>
            <div className='signin__inputs'>
              <div className='signin__input-container'>
                <label className='signin__label' htmlFor='email'>
                  E-mail
                </label>
                <input
                  className='signin__input'
                  id='email'
                  type='email'
                  onChange={handleChange}
                  value={values.email}
                  name='email'
                />
                {errors.email && touched.email && (
                  <div className='signin__feedback'>{errors.email}</div>
                )}
              </div>
              <div className='signin__input-container'>
                <label className='signin__label' htmlFor='password'>
                  Password
                </label>
                <input
                  className='signin__input'
                  id='password'
                  type='password'
                  onChange={handleChange}
                  value={values.password}
                  name='password'
                />
                {errors.password && touched.password && (
                  <div className='signin__feedback'>{errors.password}</div>
                )}
              </div>
            </div>
            <button className='signin__submit-btn' type='submit'>
              SIGN IN
            </button>
            <div className='signin__forgot-password'>
              <Link to='/password-reset'>Forgot password?</Link>
            </div>
          </form>
          <hr className='signin__divider' />
          <button className='signin__withGoogle'>
            <img src={googleIcon} alt='google logo' />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }
}

const SignInFormik = withFormik({
  mapPropsToValues: () => {
    return {
      email: '',
      password: '',
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  }),
  handleSubmit: () => {
    console.log('submitting!');
  },
})(SignIn);

export default SignInFormik;
