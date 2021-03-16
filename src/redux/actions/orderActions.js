import axios from "axios";
import { GET_ORDER } from "../types";

export const getOrder = (orderId) => {
  const orderIdData = {
    orderId,
  };
  return async (dispatch) => {
    try {
      const orderDetails = await axios.post("/get-order", orderIdData);
      console.log(orderDetails.data);
      dispatch({ type: GET_ORDER, payload: orderDetails.data });
    } catch (err) {
      console.log(err);
    }
  };
};
