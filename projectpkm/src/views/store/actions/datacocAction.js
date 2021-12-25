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
export const removeDataCoc = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("KIA")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DATA_COC_REMOVED", id });
      })
      .catch((err) => {
        dispatch({ type: "DATA_COC_REMOVED_ERROR", err });
      });
  };
};
export const DataCocEdit = (id, dataCoc) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("KIA")
      .doc(id)
      .delete()
      .then(() => {
        firestore
          .collection("KIA")
          .add({
            ...dataCoc,
            createdAt: new Date(),
          })
          .then(() => {
            dispatch({ type: "DATA_COC_EDITED", dataCoc });
          })
          .catch((err) => {
            dispatch({ type: "DATA_COC_EDITED_ERROR", err });
          });
      })
      .catch((err) => {
        dispatch({ type: "DATA_COC_REMOVED_ERROR", err });
      });
  };
};
