const initState = {
  advices: [
    { id: "1", name: "Admin", email: "Admin@pkm.com", message: "Testing" },
  ],
};

const adviceReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_ADVICE":
      console.log("Created Advice", action.advice);
      return state;
    case "ADD_ADVICE_ERROR":
      console.log("Created Advice Error", action.error);
      return state;
    default:
      return state;
  }
};

export default adviceReducer;
