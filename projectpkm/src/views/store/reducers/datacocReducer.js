const initState = {
  CocExemplar: [
    {
      id: "1",
      monthYear: "Januari 2021",
      pkm: "Sumber Wringin",
      target: "59",
      babyLive: "4",
      babyDead: "0",
      kn1: "4",
      kn2: "4",
      fullKn: "4",
      complicationNeotal: "0",
      perfectBaby: "4",
    },
    {
      id: "2",
      monthYear: "February 2021",
      pkm: "Sumber Wringin",
      target: "59",
      babyLive: "4",
      babyDead: "0",
      kn1: "4",
      kn2: "4",
      fullKn: "4",
      complicationNeotal: "0",
      perfectBaby: "7",
    },
  ],
};

const datacocReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_DATA_COC":
      console.log("Created Data COC", action.dataCoc);
      return state;
    case "ADD_DATA_COC_ERROR":
      console.log("Data COC Error", action.dataCoc);
      return state;
    default:
      return state;
  }
};

export default datacocReducer;
