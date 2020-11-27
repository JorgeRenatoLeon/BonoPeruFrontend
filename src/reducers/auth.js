import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
? { isLoggedIn: true, user }
: { isLoggedIn: false, user: null };

function exportar (state = initialState, action) {
    const { type, payload } = action;

    if(type === REGISTER_SUCCESS) return { ...state, isLoggedIn: false}
    else if(type === REGISTER_FAIL) return { ...state, isLoggedIn: false}
    else if(type === LOGIN_SUCCESS) return { ...state, isLoggedIn: true, user: payload.user}
    else if(type === LOGIN_FAIL) return { ...state, isLoggedIn: false, user: null}
    else if(type === LOGOUT) return { ...state, isLoggedIn: false, user: null}
    else return state
}  

export default exportar;