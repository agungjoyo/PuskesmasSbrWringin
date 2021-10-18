import authReducer from "views/store/reducers/authReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
