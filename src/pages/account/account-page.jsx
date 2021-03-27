import React from "react";
import "./account-page.scss";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signOut } from "../../redux/actions/accountActions";
import { getAllOrders } from "../../redux/actions/orderActions";
import { format } from "date-fns";

class AccountPage extends React.Component {
  componentDidMount() {
    this.props.getAllOrders();
  }
  render() {
    const {
      location,
      history,
      authenticated,
      credentials,
      signOut,
      previousOrders,
    } = this.props;

    if (!authenticated) {
      return <Redirect to={"/"} />;
    }
    return (
      <div className="account-page">
        <h1>Account</h1>
        <button
          className="account-page__btn account-page__btn--signout"
          onClick={() => signOut(history)}
        >
          Sign out
        </button>
        <div className="account-page__section  account-page__section--address">
          <h2>Address</h2>
          <div className="account-page__address">
            {Object.keys(credentials.address).length > 0 ? (
              <React.Fragment>
                <p>
                  {credentials.firstName} {credentials.lastName}
                </p>
                <p>{credentials.address.line1}</p>
                <p>{credentials.address.city}</p>
                <p>{credentials.address.country}</p>
                <p>{credentials.address.postcode}</p>
                <button
                  className="account-page__btn account-page__btn--add-address"
                  onClick={() =>
                    history.push(`${location.pathname}/manage-address`)
                  }
                >
                  Edit address
                </button>
              </React.Fragment>
            ) : (
              <div className="account-page__no-address">
                <p className="account-page__msg">
                  You haven't added an address yet.
                </p>
                <button
                  className="account-page__btn account-page__btn--add-address"
                  onClick={() =>
                    history.push(`${location.pathname}/manage-address`)
                  }
                >
                  Add address
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="account-page__section  account-page__section--orders">
          <h2>Orders</h2>
          <div className="account-page__orders">
            {previousOrders && previousOrders.length === 0 && (
              <p className="account-page__msg">
                You haven't placed any orders yet.
              </p>
            )}
            {previousOrders &&
              previousOrders.map((order, i) => {
                return (
                  <div key={i} className="account-page__order">
                    <div className="account-page__order-details">
                      <p>Order reference: {order.id}</p>
                      <p>
                        Date ordered: {format(new Date(order.created), "d/M/y")}
                      </p>
                      <p>Subtotal: £{order.totalPrice}</p>
                      <p>
                        Shipping:{" "}
                        {order.shipping === 0 ? "Free" : "£ " + order.shipping}
                      </p>
                      <p>Total: £{order.amount}</p>
                    </div>
                    <div className="account--page__order-lineitems">
                      {order.lineItems.map((lineItem, i) => (
                        <div key={i} className="account-page__order-lineitem">
                          <img src={lineItem.image} alt="product" />
                          <div className="account-page__order-lineitem-details">
                            <p>{lineItem.name}</p>
                            <p>Quantity: {lineItem.qty}</p>
                            <p>Size: {lineItem.size}</p>
                            <p>Price: £{lineItem.price}</p>
                            {lineItem.reviewed ? (
                              <p className="account-page__reviewed">Reviewed</p>
                            ) : (
                              <button
                                onClick={() =>
                                  history.push({
                                    pathname: `/leave-review/${lineItem.collection}/${lineItem.category}/${order.id}/${lineItem.id}`,
                                    state: {
                                      orderItem: {
                                        id: lineItem.id,
                                        name: lineItem.name,
                                        size: lineItem.size,
                                        image: lineItem.image,
                                        price: lineItem.price,
                                      },
                                      orderDetails: {
                                        customerName: credentials.firstName,
                                        date: Date.now(),
                                        orderReference: order.id,
                                        email: credentials.email,
                                      },
                                    },
                                  })
                                }
                                className="account-page__btn account-page__btn--review"
                              >
                                Leave Review
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated,
  credentials: state.account.credentials,
  previousOrders: state.orders.previousOrders,
});

const mapActionsToProps = {
  signOut,
  getAllOrders,
};

export default connect(mapStateToProps, mapActionsToProps)(AccountPage);
