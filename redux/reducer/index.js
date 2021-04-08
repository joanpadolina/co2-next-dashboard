import { combineReducers } from "redux";
import user from "./user";
import isLogged from "./isLogged";

const allReducer = combineReducers({
    user,
    isLogged
})

export default allReducer