import React, { Component } from "react";
import "./address-form.scss";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { addAddress } from "../../redux/actions/accountActions";
import { Spinner } from "react-bootstrap";

class AddressForm extends Component {
  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      handleBlur,
      match,
      isSubmitting,
    } = this.props;

    return (
      <div className="address-form">
        <div className="address-form__container">
          <form className="address-form__form" onSubmit={handleSubmit}>
            <Link to={`/account/${match.params.accountId}`}>
              {"< "}Go back to account
            </Link>
            <h1>Address</h1>
            <div className="address-form__inputs">
              <div className="address-form__input-container">
                <label className="address-form__label" htmlFor="firstName">
                  First name
                </label>
                <input
                  className="address-form__input"
                  id="firstName"
                  type="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  name="firstName"
                />
                {errors.firstName && touched.firstName && (
                  <div className="address-form__feedback">
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="address-form__input-container">
                <label className="address-form__label" htmlFor="lastName">
                  Surname
                </label>
                <input
                  className="address-form__input"
                  id="lastName"
                  type="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  name="lastName"
                />
                {errors.lastName && touched.lastName && (
                  <div className="address-form__feedback">
                    {errors.lastName}
                  </div>
                )}
              </div>
              <div className="address-form__input-container">
                <label className="address-form__label" htmlFor="line1">
                  Address
                </label>
                <input
                  className="address-form__input"
                  id="line1"
                  type="line1"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.line1}
                  name="line1"
                />
                {errors.line1 && touched.line1 && (
                  <div className="address-form__feedback">{errors.line1}</div>
                )}
              </div>
              <div className="address-form__input-container">
                <label className="address-form__label" htmlFor="city">
                  Town or City
                </label>
                <input
                  className="address-form__input"
                  id="city"
                  type="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  name="city"
                />
                {errors.city && touched.city && (
                  <div className="address-form__feedback">{errors.city}</div>
                )}
              </div>
              <div className="address-form__input-container">
                <label className="address-form__label" htmlFor="country">
                  Country
                </label>
                <input
                  className="address-form__input"
                  id="country"
                  type="country"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                  name="country"
                />
                {errors.country && touched.country && (
                  <div className="address-form__feedback">{errors.country}</div>
                )}
              </div>
              <div className="address-form__input-container">
                <label className="address-form__label" htmlFor="postcode">
                  Postcode
                </label>
                <input
                  className="address-form__input"
                  id="postcode"
                  type="postcode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.postcode}
                  name="postcode"
                />
                {errors.postcode && touched.postcode && (
                  <div className="address-form__feedback">
                    {errors.postcode}
                  </div>
                )}
              </div>
              <div className="address-form__input-container">
                <label className="address-form__label" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="address-form__input"
                  id="phone"
                  type="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  name="phone"
                />
                {errors.phone && touched.phone && (
                  <div className="address-form__feedback">{errors.phone}</div>
                )}
              </div>
            </div>
            <button className="address-form__submit-btn" type="submit">
              {isSubmitting ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Add address"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const AddressFormFormik = withFormik({
  mapPropsToValues: (props) => ({
    firstName: props.firstName ? props.firstName : "",
    lastName: props.lastName ? props.lastName : "",
    city: props.address.city ? props.address.city : "",
    country: props.address.country ? props.address.country : "",
    line1: props.address.line1 ? props.address.line1 : "",
    postcode: props.address.postcode ? props.address.postcode : "",
    phone: props.address.phone ? props.address.phone : "",
  }),
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("Please add your first name"),
    lastName: Yup.string().required("Please add your last name"),
    city: Yup.string().required("Please add your city"),
    country: Yup.string().required("Please add your country"),
    line1: Yup.string().required("Please add your first line of address"),
    postcode: Yup.string().required("Please add your postcode"),
  }),
  handleSubmit: (values, { props }) => {
    console.log(props);
    // axios request to add/ update address
    props.addAddress(values, props.match.params.accountId, props.history);
  },
})(AddressForm);

const mapStateToProps = (state) => ({
  address: state.account.credentials.address
    ? state.account.credentials.address
    : null,
  firstName: state.account.credentials.firstName,
  lastName: state.account.credentials.lastName,
});

const mapActionsToProps = {
  addAddress,
};

export default connect(mapStateToProps, mapActionsToProps)(AddressFormFormik);
