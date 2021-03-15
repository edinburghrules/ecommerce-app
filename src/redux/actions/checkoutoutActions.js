import axios from "axios";

export const submitOrder = (orderDetails) => {
  const orderDetailsData = {
    orderDetails,
  };
  return async (dispatch) => {
    try {
      await axios.post("submit-order", orderDetailsData);
    } catch (err) {
      console.log(err);
    }
  };
};
