import axios from "axios";
import { startSubmittingPayment, stopSubmittingPayment } from "./asyncActions";
import { getCart } from "./cartActions";

export const submitOrder = (orderDetails, authenticated) => {
  const orderDetailsData = {
    orderDetails,
  };
  return async (dispatch) => {
    try {
      dispatch(startSubmittingPayment());
      const orderId = await axios.post("submit-order", orderDetailsData);
      dispatch(stopSubmittingPayment());
      if (authenticated) {
        // clear cart in firestore
      } else {
        // clear cart in localStorage
        localStorage.removeItem("cart");
        dispatch(getCart(authenticated));
      }
      return orderId;
    } catch (err) {
      console.log(err);
      dispatch(stopSubmittingPayment());
    }
  };
};
