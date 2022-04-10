import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { OneOrdersReducer } from "./reducer";

const reducers = combineReducers({
OneOrder: OneOrdersReducer,
});
const initialStates = {};
const middlewares = [thunk];
export const store = createStore(
  reducers,
  initialStates,
  composeWithDevTools(applyMiddleware(...middlewares))
);
