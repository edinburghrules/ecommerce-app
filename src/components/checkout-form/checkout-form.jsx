import React from "react";
import "./checkout-form.scss";
import { withFormik } from "formik";
import { connect } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import { CardElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { submitOrder } from "../../redux/actions/checkoutoutActions";

class CheckoutForm extends React.Component {
  render() {
    const {
      handleBlur,
      handleChange,
      handleSubmit,
      values,
      errors,
      touched,
      isSubmitting,
      authenticated,
      submittingPayment,
    } = this.props;

    return (
      <div className="checkout-form">
        <div className="checkout-form__container">
          <form
            disabled={submittingPayment}
            className="checkout-form__form"
            onSubmit={handleSubmit}
          >
            <div className="checkout-form__title">
              <h3>Contact Information</h3>
            </div>
            {!authenticated && (
              <React.Fragment>
                <span>Already have an account?</span>
                <Link
                  to={{
                    pathname: "/signin",
                    state: { fromCheckout: true },
                  }}
                >
                  Sign in
                </Link>
              </React.Fragment>
            )}
            <div className="checkout-form__inputs">
              <div className="checkout-form__input-container">
                <label className="checkout-form__label" htmlFor="email">
                  Email
                </label>
                <input
                  className="checkout-form__input"
                  id="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name="email"
                />
                {errors.email && touched.email && (
                  <div className="checkout-form__feedback">{errors.email}</div>
                )}
              </div>
            </div>
            <div className="checkout-form__title">
              <h3>Delivery address</h3>
            </div>
            <div className="checkout-form__inputs">
              <div className="checkout-form__input-container">
                <label className="checkout-form__label" htmlFor="name">
                  Name
                </label>
                <input
                  className="checkout-form__input"
                  id="name"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  name="name"
                />
                {errors.name && touched.name && (
                  <div className="checkout-form__feedback">{errors.name}</div>
                )}
              </div>
              <div className="checkout-form__input-container">
                <label className="checkout-form__label" htmlFor="street">
                  street
                </label>
                <input
                  className="checkout-form__input"
                  id="street"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  name="street"
                />
                {errors.street && touched.street && (
                  <div className="checkout-form__feedback">{errors.street}</div>
                )}
              </div>
              <div className="checkout-form__input-container">
                <label className="checkout-form__label" htmlFor="city">
                  City
                </label>
                <input
                  className="checkout-form__input"
                  id="city"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  name="city"
                />
                {touched.city && (
                  <div className="checkout-form__feedback">
                    <p>{errors.city}</p>
                  </div>
                )}
              </div>
              <div className="checkout-form__input-container">
                <label className="checkout-form__label" htmlFor="country">
                  Country
                </label>
                <input
                  disabled={true}
                  className="checkout-form__input"
                  id="country"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                  name="country"
                />
                {errors.country && touched.country && (
                  <div className="checkout-form__feedback">
                    {errors.country}
                  </div>
                )}
              </div>
              <div className="checkout-form__input-container">
                <label className="checkout-form__label" htmlFor="postcode">
                  Postcode
                </label>
                <input
                  className="checkout-form__input"
                  id="postcode"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.postcode}
                  name="postcode"
                />
                {errors.postcode && touched.postcode && (
                  <div className="checkout-form__feedback">
                    {errors.postcode}
                  </div>
                )}
              </div>
              <div className="checkout-form__input-container">
                <label className="checkout-form__label" htmlFor="phone">
                  Phone (optional)
                </label>
                <input
                  className="checkout-form__input"
                  id="phone"
                  type="text"
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                />
                {errors.phone && touched.phone && (
                  <div className="checkout-form__feedback">{errors.phone}</div>
                )}
              </div>
              {/* ////CARD///// */}
              <div className="checkout-form__input-container">
                <label className="checkout-form__label" htmlFor="card">
                  Credit or debit card
                </label>
                <CardElement name="card" />
              </div>
            </div>
            <button
              disabled={isSubmitting || submittingPayment}
              className="checkout-form__submit-btn"
              type="submit"
            >
              {isSubmitting ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "PAY"
              )}
            </button>
          </form>
          <hr className="checkout-form__divider" />
        </div>
      </div>
    );
  }
}

const CheckoutFormFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      email: (props.credentials && props.credentials.email) || "",
      name: (props.credentials && props.credentials.firstName) || "",
      street: (props.credentials && props.credentials.address.street) || "",
      city: (props.credentials && props.credentials.address.city) || "",
      country: "GB",
      postcode:
        (props.credentials && props.credentials.address.postal_code) || "",
      phone: (props.credentials && props.credentials.address.phone) || "",
      card: "",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    name: Yup.string().required("Required"),
    street: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    postcode: Yup.string().required("Required"),
    phone: Yup.number(),
  }),
  handleSubmit: async (
    values,
    {
      resetForm,
      props: {
        elements,
        stripe,
        totalPrice,
        submitOrder,
        credentials,
        authenticated,
        lineItems,
        history,
      },
    }
  ) => {
    const amount = totalPrice * 100;
    const {
      data: { clientSecret },
    } = await axios.post("/payment-intents", {
      amount,
    });

    const cardElement = elements.getElement(CardElement);

    const billing_details = {
      address: {
        city: values.city,
        country: values.country,
        line1: values.street,
        postal_code: values.postcode,
      },
      email: values.email,
      name: values.name,
    };

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details,
    });

    if (!error) {
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (!error) {
        const orderId = await submitOrder({
          created: Date.now(),
          name: authenticated
            ? credentials.firstName + " " + credentials.lastName
            : values.name,
          email: authenticated ? credentials.email : values.email,
          shippingAddress: authenticated
            ? credentials.address
            : billing_details.address,
          lineItems,
          totalPrice,
          cardUsed: {
            brand: paymentMethod.card.brand,
            last4: paymentMethod.card.last4,
          },
        }, authenticated);
        resetForm();
        history.push(`/order-confirmation/${orderId.data}`);
      } else {
        console.log(error);
      }
    } else {
      console.log(error);
    }
  },
})(CheckoutForm);

const mapStateToProps = (state) => ({
  submittingPayment: state.async.submittingPayment,
});

const mapActionsToProps = {
  submitOrder,
};

export default connect(mapStateToProps, mapActionsToProps)(CheckoutFormFormik);
