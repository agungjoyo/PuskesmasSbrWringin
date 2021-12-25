const initState = {};

const datacocimunReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_DATA_COC_IMUN":
      console.log("Created Data COC Imunisasi", action.dataCocImun);
      return state;
    case "ADD_DATA_COC_IMUN_ERROR":
      console.log("Data COC Imunisasi Error", action.dataCocImun);
      return state;
    case "DATA_COC_IMUN_REMOVED":
      console.log("Data COC REMOVED", action.id);
      return state;
    case "DATA_COC_IMUN_REMOVED_ERROR":
      console.log("Data COC Error", action.id);
      return state;
    case "DATA_COC_IMUN_EDITED":
      console.log("Data COC Edited", action.dataCoc);
      return state;
    case "DATA_COC_IMUN_EDITED_ERROR":
      console.log("Data COC Error", action.dataCoc);
      return state;
    default:
      return state;
  }
};

export default datacocimunReducer;
