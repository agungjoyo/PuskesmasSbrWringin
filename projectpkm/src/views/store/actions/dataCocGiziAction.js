export const addDataCocGizi = (dataCocGizi) => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("Gizi")
      .add({
        ...dataCocGizi,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "ADD_DATA_COC_GIZI", dataCocGizi });
      })
      .catch((err) => {
        dispatch({ type: "ADD_DATA_COC_GIZI_ERROR", err });
      });
  };
};
