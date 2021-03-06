import React from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { register } from "../../../redux/actions/accountActions";

class Register extends React.Component {
  render() {
    const {
      handleSubmit,
      handleChange,
      values,
      errors,
      touched,
      isSubmitting,
    } = this.props;
    return (
      <div className="register">
        <div className="register__container">
          <form className="register__form" onSubmit={handleSubmit}>
            <div className="register__signin">
              <h1>Create your account</h1>
              <span>Already have an account?</span>
              <Link to="/signin">Sign in here</Link>
            </div>
            <div className="register__inputs">
              <div className="register__input-container">
                <label className="register__label" htmlFor="first-name">
                  First name
                </label>
                <input
                  className="register__input"
                  id="first-name"
                  type="text"
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                />
                {errors.firstName && touched.firstName && (
                  <div className="register__feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="register__input-container">
                <label className="register__label" htmlFor="last-name">
                  Last name
                </label>
                <input
                  className="register__input"
                  id="last-name"
                  type="text"
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                />
                {errors.lastName && touched.lastName && (
                  <div className="register__feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="register__input-container">
                <label className="register__label" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="register__input"
                  id="email"
                  type="email"
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                />
                {errors.email && touched.email && (
                  <div className="register__feedback">{errors.email}</div>
                )}
              </div>
              <div className="register__input-container">
                <label className="register__label" htmlFor="password">
                  Password
                </label>
                <input
                  className="register__input"
                  id="password"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                />
                {errors.password && touched.password && (
                  <div className="register__feedback">{errors.password}</div>
                )}
              </div>
              <div className="register__input-container">
                <label className="register__label" htmlFor="confirm-password">
                  Confirm password
                </label>
                <input
                  className="register__input"
                  id="confirm-password"
                  type="password"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="register__feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>
            <button className="register__submit-btn" type="submit">
              {isSubmitting ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "REGISTER"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const RegisterFormik = withFormik({
  mapPropsToValues: () => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().required("Required"),
  }),
  handleSubmit: async (values, { setErrors, props: { register, history } }) => {
    const registerData = {
      ...values,
    };

    const error = await register(registerData, history);
    setErrors(error);
  },
})(Register);

const mapStateToProps = (state) => {
  return {
    authenticated: state.account,
  };
};

const mapActionsToProps = {
  register,
};

export default connect(mapStateToProps, mapActionsToProps)(RegisterFormik);
