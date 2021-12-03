export const addDataCocImun = (dataCocImun) => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("Imunisasi")
      .add({
        ...dataCocImun,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "ADD_DATA_COC_IMUN", dataCocImun });
      })
      .catch((err) => {
        dispatch({ type: "ADD_DATA_COC_IMUN_ERROR", err });
      });
  };
};
