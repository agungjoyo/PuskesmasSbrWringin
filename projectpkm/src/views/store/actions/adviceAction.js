export const addAdvice = (advice) => {
  // return (dispatch, getState, { getFirebase, getFirestore }) => {}
  return (dispatch, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("Advice")
      .add({
        ...advice,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "ADD_ADVICE", advice });
      })
      .catch((err) => {
        dispatch({ type: "ADD_ADVICE_ERROR", err });
      });
  };
};
