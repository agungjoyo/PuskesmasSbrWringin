const initState = {};

const datacocReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_DATA_COC":
      console.log("Created Data COC", action.dataCoc);
      return state;
    case "ADD_DATA_COC_ERROR":
      console.log("Data COC Error", action.dataCoc);
      return state;
    case "DATA_COC_REMOVED":
      console.log("Data COC REMOVED", action.id);
      return state;
    case "DATA_COC_REMOVED_ERROR":
      console.log("Data COC Error", action.id);
      return state;
    case "DATA_COC_EDITED":
      console.log("Data COC Edited", action.dataCoc);
      return state;
    case "DATA_COC_EDITED_ERROR":
      console.log("Data COC Error", action.dataCoc);
      return state;
    case "ADD_DATA_KB":
      console.log("Created Data KB", action.dataKB);
      return state;
    case "ADD_DATA_KB_ERROR":
      console.log("Data KB Error", action.dataKB);
      return state;
    case "DATA_KB_REMOVED":
      console.log("Data KB REMOVED", action.id);
      return state;
    case "DATA_KB_REMOVED_ERROR":
      console.log("Data KB Error", action.id);
      return state;
    case "DATA_KB_EDITED":
      console.log("Data KB Edited", action.dataKB);
      return state;
    case "DATA_KB_EDITED_ERROR":
      console.log("Data KB Error", action.dataKB);
      return state;
    case "ADD_DATA_BULIN":
      console.log("Created Data KB", action.dataKB);
      return state;
    case "ADD_DATA_BULIN_ERROR":
      console.log("Data KB Error", action.dataKB);
      return state;
    case "DATA_BULIN_REMOVED":
      console.log("Data KB REMOVED", action.id);
      return state;
    case "DATA_BULIN_REMOVED_ERROR":
      console.log("Data KB Error", action.id);
      return state;
    case "DATA_BULIN_EDITED":
      console.log("Data KB Edited", action.dataKB);
      return state;
    case "DATA_BULIN_EDITED_ERROR":
      console.log("Data KB Error", action.dataKB);
      return state;
    case "ADD_DATA_COC_KIA":
      console.log("Created Data COC KIA", action.dataKIACoc);
      return state;
    case "ADD_DATA_COC_KIA_ERROR":
      console.log("Data COC KIA Error", action.dataKIACoc);
      return state;
    case "DATA_COC_KIA_REMOVED":
      console.log("Data COC KIA REMOVED", action.id);
      return state;
    case "DATA_COC_KIA_REMOVED_ERROR":
      console.log("Data COC KIA Error", action.id);
      return state;
    case "DATA_COC_KIA_EDITED":
      console.log("Data COC KIA Edited", action.dataKIACoc);
      return state;
    case "DATA_COC_KIA_EDITED_ERROR":
      console.log("Data COC KIA Error", action.dataKIACoc);
      return state;
    case "ADD_DATA_COC_K1":
      console.log("Tambah data Indikator Ibu", action.dataK1Coc);
      return state;
    case "ADD_DATA_COC_K1_ERROR":
      console.log("Tambah data Indikator Ibu Error", action.dataK1Coc);
      return state;
    case "DATA_COC_K1_REMOVED":
      console.log("Data COC K1 REMOVED", action.id);
      return state;
    case "DATA_COC_K1_REMOVED_ERROR":
      console.log("Data COC K1 Error", action.id);
      return state;
    case "DATA_COC_K1_EDITED":
      console.log("Data COC K1 Edited", action.dataK1Coc);
      return state;
    case "DATA_COC_K1_EDITED_ERROR":
      console.log("Data COC K1 Error", action.dataK1Coc);
      return state;
    default:
      return state;
  }
};

export default datacocReducer;
