import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import cronograma from "./cronograma";
// Declaracion de Reductores
export default combineReducers({
  auth,
  message,
  cronograma
});