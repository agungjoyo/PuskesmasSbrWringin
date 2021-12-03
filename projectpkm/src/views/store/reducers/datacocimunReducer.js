const initState = {};

const datacocimunReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_DATA_COC_IMUN":
      console.log("Created Data COC Imunisasi", action.dataCocImun);
      return state;
    case "ADD_DATA_COC_IMUN_ERROR":
      console.log("Data COC Imunisasi Error", action.dataCocImun);
      return state;
    default:
      return state;
  }
};

export default datacocimunReducer;
