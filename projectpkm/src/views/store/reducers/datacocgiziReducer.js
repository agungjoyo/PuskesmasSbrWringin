const initState = {};

const datacocgiziReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_DATA_COC_GIZI":
      console.log("Created Data COC gizi", action.dataCocGizi);
      return state;
    case "ADD_DATA_COC_GIZI_ERROR":
      console.log("Data COC Imunisasi Error", action.dataCocGizi);
      return state;
    default:
      return state;
  }
};

export default datacocgiziReducer;
