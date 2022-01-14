// Menambahkan Data KIA Pada database
export const addDataCoc = (dataCoc) => {
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
//Menghapus Data KIA
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
//Replace Data KIA
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

export const addDataKIACoc = (dataKIACoc) => {
  // return (dispatch, getState) => {}
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("COCKIA")
      .add({
        ...dataKIACoc,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "ADD_DATA_COC_KIA", dataKIACoc });
      })
      .catch((err) => {
        dispatch({ type: "ADD_DATA_COC_KIA_ERROR", err });
      });
  };
};
export const removeDataKIACoc = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("COCKIA")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DATA_COC_KIA_REMOVED", id });
      })
      .catch((err) => {
        dispatch({ type: "DATA_COC_REMOVED_KIA_ERROR", err });
      });
  };
};
export const DataCocKIAEdit = (id, dataKIACoc) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("COCKIA")
      .doc(id)
      .delete()
      .then(() => {
        firestore
          .collection("COCKIA")
          .add({
            ...dataKIACoc,
            createdAt: new Date(),
          })
          .then(() => {
            dispatch({ type: "DATA_COC_KIA_EDITED", dataKIACoc });
          })
          .catch((err) => {
            dispatch({ type: "DATA_COC_KIA_EDITED_ERROR", err });
          });
      })
      .catch((err) => {
        dispatch({ type: "DATA_COC_KIA_EDITED_ERROR", err });
      });
  };
};

export const addDataK1Coc = (dataK1Coc) => {
  // return (dispatch, getState) => {}
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("K1")
      .add({
        ...dataK1Coc,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "ADD_DATA_COC_K1", dataK1Coc });
      })
      .catch((err) => {
        dispatch({ type: "ADD_DATA_COC_K1_ERROR", err });
      });
  };
};
export const removeDataK1Coc = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("K1")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DATA_COC_K1_REMOVED", id });
      })
      .catch((err) => {
        dispatch({ type: "DATA_COC_REMOVED_K1_ERROR", err });
      });
  };
};
export const DataCocK1Edit = (id, dataK1Coc) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("K1")
      .doc(id)
      .delete()
      .then(() => {
        firestore
          .collection("K1")
          .add({
            ...dataK1Coc,
            createdAt: new Date(),
          })
          .then(() => {
            dispatch({ type: "DATA_COC_K1_EDITED", dataK1Coc });
          })
          .catch((err) => {
            dispatch({ type: "DATA_COC_K1_EDITED_ERROR", err });
          });
      })
      .catch((err) => {
        dispatch({ type: "DATA_COC_K1_EDITED_ERROR", err });
      });
  };
};
export const addDataKB = (dataKB) => {
  // return (dispatch, getState) => {}
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("KB")
      .add({
        ...dataKB,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "ADD_DATA_KB", dataKB });
      })
      .catch((err) => {
        dispatch({ type: "ADD_DATA_KB_ERROR", err });
      });
  };
};
export const removeDataKB = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("KB")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DATA_KB_REMOVED", KB });
      })
      .catch((err) => {
        dispatch({ type: "DATA_KB_REMOVED_ERROR", err });
      });
  };
};
export const DataKBEdit = (id, dataKB) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("KB")
      .doc(id)
      .delete()
      .then(() => {
        firestore
          .collection("KB")
          .add({
            ...dataKB,
            createdAt: new Date(),
          })
          .then(() => {
            dispatch({ type: "DATA_KB_EDITED", dataKB });
          })
          .catch((err) => {
            dispatch({ type: "DATA_KB_EDITED_ERROR", err });
          });
      })
      .catch((err) => {
        dispatch({ type: "DATA_KB_EDITED_ERROR", err });
      });
  };
};
export const removeDataTripleCoc = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("TripleEliminasi")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DATA_COC_KIA_TRIPLE_REMOVED", id });
      })
      .catch((err) => {
        dispatch({ type: "DATA_COC_KIA_TRIPLE_REMOVED_ERROR", err });
      });
  };
};
export const addDataTripleCoc = (FinalData) => {
  // return (dispatch, getState) => {}
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("TripleEliminasi")
      .add({
        ...FinalData,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "ADD_DATA_COC_TRIPLE_KIA", FinalData });
      })
      .catch((err) => {
        dispatch({ type: "ADD_DATA_COC_TRIPLE_KIA_ERROR", err });
      });
  };
};

export const DataCocTripleKIAEdit = (id, FinalData) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("TripleEliminasi")
      .doc(id)
      .delete()
      .then(() => {
        firestore
          .collection("TripleEliminasi")
          .add({
            ...FinalData,
            createdAt: new Date(),
          })
          .then(() => {
            dispatch({ type: "DATA_COC_TRIPLE_KIA_EDITED", FinalData });
          })
          .catch((err) => {
            dispatch({ type: "DATA_COC_TRIPLE_KIA_EDITED_ERROR", err });
          });
      })
      .catch((err) => {
        dispatch({ type: "DATA_COC_KIA_EDITED_ERROR", err });
      });
  };
};
