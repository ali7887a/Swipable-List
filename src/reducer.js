import {
  ONE_ORDERS_FAILED,
  ONE_ORDERS_REQUEST,
  ONE_ORDERS_SUCCESS,
} from "./Constant";

//get One order
export const OneOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case ONE_ORDERS_REQUEST:
      return { Loading: true, ...state };
    case ONE_ORDERS_SUCCESS:
      return { Loading: false, OneOrders: action.payload };
    case ONE_ORDERS_FAILED:
      return { Loading: false, error: action.payload };
    default:
      return { ...state };
  }
};