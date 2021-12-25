const initState = {};

const datacocgiziReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_DATA_COC_GIZI":
      console.log("Created Data COC gizi", action.dataCocGizi);
      return state;
    case "ADD_DATA_COC_GIZI_ERROR":
      console.log("Data COC Imunisasi Error", action.dataCocGizi);
      return state;
    case "DATA_COC_GIZI_REMOVED":
      console.log("Data COC REMOVED", action.id);
      return state;
    case "DATA_COC_GIZI_REMOVED_ERROR":
      console.log("Data COC Error", action.id);
      return state;
    case "DATA_COC_GIZI_EDITED":
      console.log("Data COC Edited", action.dataCoc);
      return state;
    case "DATA_COC_GIZI_EDITED_ERROR":
      console.log("Data COC Error", action.dataCoc);
      return state;
    default:
      return state;
  }
};

export default datacocgiziReducer;
