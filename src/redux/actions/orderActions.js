import axios from "axios";
import { GET_ORDER, GET_PREVIOUS_ORDERS } from "../types";

export const getOrder = (orderId) => {
  const orderIdData = {
    orderId,
  };
  return async (dispatch) => {
    try {
      const orderDetails = await axios.post("/get-order", orderIdData);
      dispatch({ type: GET_ORDER, payload: orderDetails.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllOrders = () => {
  return async (dispatch) => {
    try {
      // get orders with axios
      const orders = await axios.get("/get-all-orders");
      dispatch({ type: GET_PREVIOUS_ORDERS, payload: orders.data.orders });
    } catch (err) {
      console.log(err);
    }
  };
};
