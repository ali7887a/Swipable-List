import axios from "axios";
import { ONE_ORDERS_FAILED, ONE_ORDERS_REQUEST, ONE_ORDERS_SUCCESS } from "./Constant";
//get one order
export const ActionGetApi = () => async (dispatch) => {
  try {
    dispatch({type: ONE_ORDERS_REQUEST});
    const {data} = await axios.get('https://api.instantwebtools.net/v1/passenger?page=0&size=10');
    dispatch({ type: ONE_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ONE_ORDERS_FAILED, payload: error });
  }
};
export const ActionArray = (a)=>(dispatch)=>{
  dispatch({type:"getArray" , payload:a})
}