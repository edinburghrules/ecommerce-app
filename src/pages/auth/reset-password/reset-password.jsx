import React from "react";
import "./reset-password.scss";
import { Link } from "react-router-dom";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Spinner } from "react-bootstrap";
import axios from "axios";

class ResetPassword extends React.Component {
  componentDidMount = () => {
    this.props.setStatus(false);
  };
  render() {
    const {
      handleSubmit,
      errors,
      values,
      handleChange,
      touched,
      isSubmitting,
      status,
    } = this.props;
    return (
      <div className="reset-password">
        <div className="reset-password__container">
          <form className="reset-password__form" onSubmit={handleSubmit}>
            <div className="reset-password__register">
              <h1>Reset Password</h1>
              <span>No account?</span>
              <Link to="/register">Register here</Link>
            </div>
            {status ? (
              <p className="reset-password__success-msg">
                Thank you, a password reset email has been sent
              </p>
            ) : (
              <React.Fragment>
                <div className="reset-password__instruction">
                  <p>
                    Please enter the email address you used to create your
                    account, and we'll send you a link to reset your password.
                  </p>
                </div>
                <div className="reset-password__inputs">
                  <div className="reset-password__input-container">
                    <label className="reset-password__label" htmlFor="email">
                      E-mail
                    </label>
                    <input
                      className="reset-password__input"
                      id="email"
                      type="email"
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                    />
                    {errors.email && touched.email && (
                      <div className="reset-password__feedback">
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>
                <button className="reset-password__submit-btn" type="submit">
                  {isSubmitting ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    "RESET PASSWORD"
                  )}
                </button>
              </React.Fragment>
            )}
          </form>
          <hr className="reset-password__divider" />
        </div>
      </div>
    );
  }
}

const FormikResetPassword = withFormik({
  mapPropsToValues: () => ({
    email: "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required("Required"),
  }),
  handleSubmit: async (values, { setSubmitting, setErrors, setStatus }) => {
    const emailData = { email: values.email };
    console.log(emailData);
    try {
      await axios.post("/reset-password", emailData);
      setStatus(true);
    } catch (err) {
      setErrors(err.response);
    }

    setSubmitting(false);
  },
})(ResetPassword);

export default FormikResetPassword;
