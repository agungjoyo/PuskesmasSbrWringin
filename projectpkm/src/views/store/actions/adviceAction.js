export const addAdvice = (advice) => {
  // return (dispatch, getState, { getFirebase, getFirestore }) => {}
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    // firebase
    //   .push("Advice", advice)
    //   .then(() => {
    //     dispatch({ type: "ADD_ADVICE", advice });
    //   })
    //   .catch((err) => {
    //     dispatch({ type: "ADD_ADVICE_ERROR", err });
    //   });
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
