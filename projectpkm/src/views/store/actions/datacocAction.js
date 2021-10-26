export const addDataCoc = (dataCoc) => {
  // return (dispatch, getState) => {}
  return (dispatch) => {
    // make async call to database
    dispatch({ type: "ADD_DATA_COC", dataCoc });
  };
};
