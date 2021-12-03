import { combineReducers } from "redux";
import authReducer from "views/store/reducers/authReducer";
import datacocReducer from "views/store/reducers/datacocReducer";
import adviceReducer from "views/store/reducers/adviceReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import datacocimunReducer from "./datacocimunReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  dataCoc: datacocReducer,
  dataCocImun: datacocimunReducer,
  advice: adviceReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
