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

export const removeDataCocGizi = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("Gizi")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DATA_COC_GIZI_REMOVED", id });
      })
      .catch((err) => {
        dispatch({ type: "DATA_COC_GIZI_REMOVED_ERROR", err });
      });
  };
};
export const DataCocEditGizi = (id, dataCocGizi) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("Gizi")
      .doc(id)
      .delete()
      .then(() => {
        firestore
          .collection("Gizi")
          .add({
            ...dataCocGizi,
            createdAt: new Date(),
          })
          .then(() => {
            dispatch({ type: "DATA_COC_GIZI_EDITED", dataCocGizi });
          })
          .catch((err) => {
            dispatch({ type: "DATA_COC_GIZI_EDITED_ERROR", err });
          });
      })
      .catch((err) => {
        dispatch({ type: "DATA_COC_GIZI_REMOVED_ERROR", err });
      });
  };
};

export const addFinalDataCocGizi = (finalDataCoc) => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("Gizi")
      .add({
        ...finalDataCoc,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "ADD_DATA_COC_GIZI", finalDataCoc });
      })
      .catch((err) => {
        dispatch({ type: "ADD_DATA_COC_GIZI_ERROR", err });
      });
  };
};

// export const removeFinalDataCocGizi = (id) => {
//   return (dispatch, getState, { getFirestore }) => {
//     const firestore = getFirestore();
//     firestore
//       .collection("Gizi")
//       .doc(id)
//       .delete()
//       .then(() => {
//         dispatch({ type: "DATA_COC_GIZI_REMOVED", id });
//       })
//       .catch((err) => {
//         dispatch({ type: "DATA_COC_GIZI_REMOVED_ERROR", err });
//       });
//   };
// };
// export const FinalDataCocEditGizi = (id, finalDataCocGizi) => {
//   return (dispatch, getState, { getFirestore }) => {
//     const firestore = getFirestore();
//     firestore
//       .collection("Gizi")
//       .doc(id)
//       .delete()
//       .then(() => {
//         firestore
//           .collection("Gizi")
//           .add({
//             ...finalDataCocGizi,
//             createdAt: new Date(),
//           })
//           .then(() => {
//             dispatch({ type: "DATA_COC_GIZI_EDITED", finalDataCocGizi });
//           })
//           .catch((err) => {
//             dispatch({ type: "DATA_COC_GIZI_EDITED_ERROR", err });
//           });
//       })
//       .catch((err) => {
//         dispatch({ type: "DATA_COC_GIZI_REMOVED_ERROR", err });
//       });
//   };
// };
