const initState = {};

const datacocReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_DATA_COC":
      console.log("Created Data COC", action.dataCoc);
      return state;
    case "ADD_DATA_COC_ERROR":
      console.log("Data COC Error", action.dataCoc);
      return state;
    default:
      return state;
  }
};

export default datacocReducer;
