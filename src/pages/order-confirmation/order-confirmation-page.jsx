import React from "react";
import "./order-confirmation-page.scss";
import { connect } from "react-redux";
import { getOrder } from "../../redux/actions/orderActions";
import { capitaliseFirstLetter } from "../../utils/text-formatting/text-formatting";
import visa from "../../assets/visa.svg";

class OrderConfirmationPage extends React.Component {
  componentDidMount = () => {
    // call action to do get order request
    this.props.getOrder(this.props.match.params.orderId);
  };

  render() {
    const { match, order } = this.props;
    if (!order) return <h1 style={{ marginTop: "10rem" }}>Loading...</h1>;
    return (
      <div className="order-confirmation-page">
        <div className="order-confirmation-page__content">
          <div className="order-confirmation-page__heading">
            <h1>Your Order Confirmed!</h1>
            <h2>Hello {"Sean"},</h2>
            <p>
              Your order has been confirmed and will be shipping within two
              days.
            </p>
          </div>
          <div className="order-confirmation-page__order-details">
            <div className="order-confirmation-page__order-details-section">
              <span className="order-confirmation-page__order-details-section-header">
                Order Date
              </span>{" "}
              <span>{order.created}</span>
            </div>
            <div className="order-confirmation-page__order-details-section">
              <span className="order-confirmation-page__order-details-section-header">
                Order No.
              </span>{" "}
              <span>{match.params.orderId}</span>
            </div>
            <div className="order-confirmation-page__order-details-section">
              <span className="order-confirmation-page__order-details-section-header">
                Payment
              </span>
              <div className='order-confirmation-page__order-details-section--card'>
                <span>****{order.cardUsed.last4}</span>{" "}
                <span>
                  <img src={visa} alt="visa cart" />
                </span>
              </div>
            </div>
            <div className="order-confirmation-page__order-details-section">
              <span className="order-confirmation-page__order-details-section-header">
                Shipping Address
              </span>
              <div>
                <span>
                  {order.shippingAddress.line1}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postal_code}
                </span>
              </div>
            </div>
          </div>
          <div className="order-confirmation-page__line-items">
            {order.lineItems.map((lineItem, i) => (
              <div key={i} className="order-confirmation-page__line-item">
                <div className="order-confirmation-page__line-item-image">
                  <img src={lineItem.image} alt="line item" />
                </div>
                <div className="order-confirmation-page__line-item-details">
                  <p>{lineItem.name}</p>
                  <p>UK {lineItem.size}</p>
                  <p>{capitaliseFirstLetter(lineItem.color)}</p>
                  <p>{lineItem.qty}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-confirmation-page__cost-details">
            <span>Subtotal</span> <span>£100</span>
            <span>Shipping</span> <span>FREE</span>
            <span>Total</span> <span>£{order.totalPrice}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.orders.order,
});

const mapActionsToProps = {
  getOrder,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(OrderConfirmationPage);
