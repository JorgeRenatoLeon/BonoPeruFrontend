import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import prueba from "./prueba";
// Declaracion de Reductores
export default combineReducers({
  auth,
  message,
  prueba
});