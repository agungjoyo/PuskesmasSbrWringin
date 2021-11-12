export const addDataCoc = (dataCoc) => {
  // return (dispatch, getState) => {}
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("KIA")
      .add({
        ...dataCoc,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "ADD_DATA_COC", dataCoc });
      })
      .catch((err) => {
        dispatch({ type: "ADD_DATA_COC_ERROR", err });
      });
  };
};
