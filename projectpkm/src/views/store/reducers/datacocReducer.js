const initState = {};

const datacocReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_DATA_COC":
      console.log("Created Data COC", action.dataCoc);
      return state;
    case "ADD_DATA_COC_ERROR":
      console.log("Data COC Error", action.dataCoc);
      return state;
    case "DATA_COC_REMOVED":
      console.log("Data COC REMOVED", action.id);
      return state;
    case "DATA_COC_REMOVED_ERROR":
      console.log("Data COC Error", action.id);
      return state;
    case "DATA_COC_EDITED":
      console.log("Data COC Edited", action.dataCoc);
      return state;
    case "DATA_COC_EDITED_ERROR":
      console.log("Data COC Error", action.dataCoc);
      return state;
    default:
      return state;
  }
};

export default datacocReducer;
