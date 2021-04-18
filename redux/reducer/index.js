import { combineReducers } from "redux";
import store from "./store";
import isLogged from "./isLogged";

const allReducer = combineReducers({
    store,
    isLogged
})

export default allReducer