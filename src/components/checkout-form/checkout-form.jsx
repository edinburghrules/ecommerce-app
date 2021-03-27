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
import warningIcon from "../../assets/warning.svg";

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      fontWeight: "300",
      color: "#888",
      "::placeholder": {
        color: "#8e8e8e",
        fontWeight: "300",
      },
    },
    invalid: {
      color: "#e74c3c",
      iconColor: "#e74c3c",
    },
  },
  hidePostalCode: true,
};

class CheckoutForm extends React.Component {
  state = {
    cardComplete: false,
  };

  componentDidMount = () => {};

  render() {
    const { cardComplete } = this.state;

    const {
      dirty,
      isValid,
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

    this.handleCardChange = (e) => {
      if (e.complete) {
        this.setState({
          cardComplete: true,
        });
      }
    };

    return (
      <div className="checkout-form">
        <div className="checkout-form__container">
          <form
            disabled={submittingPayment}
            className="checkout-form__form"
            onSubmit={handleSubmit}
          >
            <div className="checkout-form__section">
              <div className="checkout-form__contact-container">
                <div className="checkout-form__title">
                  <h3>Contact Information</h3>
                </div>
                {!authenticated && (
                  <div>
                    <span>Already have an account?</span>
                    <Link
                      to={{
                        pathname: "/signin",
                        state: { fromCheckout: true },
                      }}
                    >
                      Sign in
                    </Link>
                  </div>
                )}
              </div>

              <div className="checkout-form__email-address">
                <div className="checkout-form__inputs">
                  <div className="checkout-form__input-container">
                    <input
                      placeholder="Email"
                      className="checkout-form__input"
                      id="email"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      name="email"
                    />
                    {errors.email && touched.email && (
                      <div className="checkout-form__feedback">
                        <img src={warningIcon} alt="warning" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="checkout-form__section">
              <div className="checkout-form__title">
                <h3>Delivery address</h3>
              </div>
              <div className="checkout-form__delivery-address">
                <div className="checkout-form__inputs">
                  <div className="checkout-form__input-container">
                    <input
                      placeholder="Name"
                      className="checkout-form__input"
                      id="name"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      name="name"
                    />
                    {errors.name && touched.name && (
                      <div className="checkout-form__feedback">
                        <img src={warningIcon} alt="warning" />
                      </div>
                    )}
                  </div>
                  <div className="checkout-form__input-container">
                    <input
                      placeholder="Address"
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
                        <img src={warningIcon} alt="warning" />
                      </div>
                    )}
                  </div>
                  <div className="checkout-form__input-container">
                    <input
                      placeholder="Town or City"
                      className="checkout-form__input"
                      id="city"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      name="city"
                    />
                    {touched.city && errors.city && (
                      <div className="checkout-form__feedback">
                        <img src={warningIcon} alt="warning" />
                      </div>
                    )}
                  </div>
                  <div className="checkout-form__input-container">
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
                        <img src={warningIcon} alt="warning" />
                      </div>
                    )}
                  </div>
                  <div className="checkout-form__input-container">
                    <input
                      placeholder="Postcode"
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
                        <img src={warningIcon} alt="warning" />
                      </div>
                    )}
                  </div>
                  <div className="checkout-form__input-container">
                    <input
                      placeholder="Phone (optional)"
                      className="checkout-form__input"
                      id="phone"
                      type="text"
                      onChange={handleChange}
                      value={values.phone}
                      name="phone"
                    />
                    {errors.phone && touched.phone && (
                      <div className="checkout-form__feedback">
                        <img src={warningIcon} alt="warning" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ////CARD///// */}
            <div className="checkout-form__section">
              <div className="checkout-form__card-container">
                <div className="checkout-form__title">
                  <h3>Payment</h3>
                </div>
                <div className="checkout-form__input-container checkout-form__input-container--card">
                  <CardElement
                    onChange={(e) => this.handleCardChange(e)}
                    options={cardElementOptions}
                  />
                </div>
              </div>
            </div>
            <button
              disabled={
                authenticated
                  ? (dirty && !isValid) ||
                    isSubmitting ||
                    submittingPayment ||
                    !cardComplete
                  : !(dirty && isValid) ||
                    isSubmitting ||
                    submittingPayment ||
                    !cardComplete
              }
              className="checkout-form__submit-btn"
              type="submit"
            >
              {isSubmitting ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                "PAY NOW"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const CheckoutFormFormik = withFormik({
  mapPropsToValues: (props) => {
    if (props.credentials) {
      return {
        email: (props.credentials && props.credentials.email) || "",
        name:
          (props.credentials &&
            props.credentials.firstName + " " + props.credentials.lastName) ||
          "",
        address: (props.credentials && props.credentials.address.line1) || "",
        city: (props.credentials && props.credentials.address.city) || "",
        country: "GB",
        postcode:
          (props.credentials && props.credentials.address.postcode) || "",
        phone: (props.credentials && props.credentials.address.phone) || "",
        card: "",
      };
    } else {
      return {
        email: "",
        name: "",
        address: "",
        city: "",
        country: "GB",
        postcode: "",
        phone: "",
        card: "",
      };
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required("Please provide your email address"),
    name: Yup.string().required("Please provide your name"),
    address: Yup.string().required("Please provide your address"),
    city: Yup.string().required("Please provide your town or city"),
    postcode: Yup.string().required("Please provide your postcode"),
    phone: Yup.string().matches(
      new RegExp("[0-9]{7}"),
      "Please provide a valid phone number"
    ),
  }),
  handleSubmit: async (
    values,
    {
      resetForm,
      props: {
        elements,
        stripe,
        shipping,
        totalPrice,
        submitOrder,
        credentials,
        authenticated,
        lineItems,
        history,
      },
    }
  ) => {
    const amount = (totalPrice + shipping) * 100;

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
        postal_code: values.postcode,
      },
      email: values.email,
      name: values.name,
      ...(values.phone.length > 0 && { phone: values.phone }),
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
        try {
          const orderId = await submitOrder(
            {
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
              amount: amount / 100,
              shipping,
              cardUsed: {
                brand: paymentMethod.card.brand,
                last4: paymentMethod.card.last4,
              },
            },
            authenticated
          );
  
          history.push({
            pathname: `/order-confirmation/${orderId.data}`,
            state: { fromCheckout: true },
          });
        } catch (err) {
          console.log(err);
        }

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
