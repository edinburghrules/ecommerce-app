import axios from "axios";
import { startSubmittingPayment, stopSubmittingPayment } from "./asyncActions";

export const submitOrder = (orderDetails) => {
  const orderDetailsData = {
    orderDetails,
  };
  return async (dispatch) => {
    try {
      dispatch(startSubmittingPayment());
      const orderId = await axios.post("submit-order", orderDetailsData);
      dispatch(stopSubmittingPayment());
      return orderId;
    } catch (err) {
      console.log(err);
    }
  };
};
