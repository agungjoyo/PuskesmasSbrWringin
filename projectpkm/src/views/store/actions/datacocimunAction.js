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

export const removeDataCocImunisasi = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("Imunisasi")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DATA_COC_IMUNISASI_REMOVED", id });
      })
      .catch((err) => {
        dispatch({ type: "DATA_COC_IMUNISASI_REMOVED_ERROR", err });
      });
  };
};
export const DataCocEditImunisasi = (id, dataCocImunisasi) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("Imunisasi")
      .doc(id)
      .delete()
      .then(() => {
        firestore
          .collection("Imunisasi")
          .add({
            ...dataCocImunisasi,
            createdAt: new Date(),
          })
          .then(() => {
            dispatch({ type: "DATA_COC_IMUNISASI_EDITED", dataCocImunisasi });
          })
          .catch((err) => {
            dispatch({ type: "DATA_COC_IMUNISASI_EDITED_ERROR", err });
          });
      })
      .catch((err) => {
        dispatch({ type: "DATA_COC_IMUNISASI_REMOVED_ERROR", err });
      });
  };
};
