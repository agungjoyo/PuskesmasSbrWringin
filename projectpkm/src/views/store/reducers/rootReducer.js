import { combineReducers } from "redux";
import authReducer from "views/store/reducers/authReducer";
import datacocReducer from "views/store/reducers/datacocReducer";
import adviceReducer from "views/store/reducers/adviceReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  dataCoc: datacocReducer,
  advice: adviceReducer,
});

export default rootReducer;
