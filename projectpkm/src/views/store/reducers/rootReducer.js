import authReducer from "views/store/reducers/authReducer";
import { combineReducers } from "redux";
import datacocReducer from "views/store/reducers/datacocReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  dataCoc: datacocReducer,
});

export default rootReducer;
