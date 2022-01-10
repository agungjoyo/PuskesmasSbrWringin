const initState = {
  authError: null,
  absoluteLogin: [{ id: "1", email: "test@pkmsb.com", password: "test-pkmsb" }],
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("Login Error");
      return {
        ...state,
        authError:
          "Login Gagal Silakan Periksa Kembali Username dan Password Anda",
      };
    case "LOGIN_SUCCESS":
      console.log("Login Sukses");
      return {
        ...state,
        authError: null,
      };
    case "SIGNOUT_SUCCESS":
      console.log("Signout Success");
      return state;
    case "REGIS_SUCCESS":
      console.log("Pendaftaran Berhasil");
      return {
        ...state,
        authError: null,
      };
    case "REGIS_ERROR":
      console.log("Pendaftaran Gagal", action.err);
      window.alert(action.err.message);
      return {
        ...state,
        authError: "Pendaftaran Gagal",
      };
    default:
      return state;
  }
};

export default authReducer;
