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
    } = this.props;

    return (
      <div className="checkout-form">
        <div className="checkout-form__container">
          <form className="checkout-form__form" onSubmit={handleSubmit}>
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
                <label className="checkout-form__label" htmlFor="address">
                  Address
                </label>
                <input
                  className="checkout-form__input"
                  id="address"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  name="address"
                />
                {errors.address && touched.address && (
                  <div className="checkout-form__feedback">
                    {errors.address}
                  </div>
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
                <CardElement />
              </div>
            </div>
            <button
              disabled={isSubmitting}
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
      address: (props.credentials && props.credentials.address.street) || "",
      city: (props.credentials && props.credentials.address.city) || "",
      country: "GB",
      postcode:
        (props.credentials && props.credentials.address.postal_code) || "",
      phone: (props.credentials && props.credentials.address.phone) || "",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    postcode: Yup.string().required("Required"),
    phone: Yup.number(),
  }),
  handleSubmit: async (
    values,
    {
      props: {
        elements,
        stripe,
        totalPrice,
        submitOrder,
        credentials,
        authenticated,
        lineItems,
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
        line1: values.address,
        line2: null,
        postal_code: values.postcode,
        state: null,
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
        submitOrder({
          created: Date.now(),
          name: authenticated
            ? credentials.firstName + " " + credentials.lastName
            : values.name,
          email: authenticated ? credentials.email : values.email,
          shippingAddress: authenticated
            ? credentials.address
            : billing_details,
          lineItems,
          totalPrice,
          cardUsed: {
            brand: paymentMethod.card.brand,
            last4: paymentMethod.card.last4,
          },
        });
        // Create action that saves order to orders collection
        // and then returns the order document to put in to redux store
        // redirect to order confirmation screen
        // order_doc: customer name, delivery address, billing address, line-items
      } else {
        console.log(error);
      }
    } else {
      console.log(error);
    }
  },
})(CheckoutForm);

const mapActionsToProps = {
  submitOrder,
};

export default connect(null, mapActionsToProps)(CheckoutFormFormik);
