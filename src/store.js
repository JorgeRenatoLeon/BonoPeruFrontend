import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const middleware = [thunk];

const store = createStore(
  rootReducer, //Para el reducer
  composeWithDevTools(applyMiddleware(...middleware)) //para el middleware
);

export default store;