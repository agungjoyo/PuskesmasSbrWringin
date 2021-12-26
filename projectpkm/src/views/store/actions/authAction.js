export const signIn = (credentials, showResultSuccess, showResultFailed) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
        showResultSuccess();
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
        showResultFailed();
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(data.Email, data.Password)
      .then((resp) => {
        firestore.collection("Auth").doc(resp.user.uid).set({
          Name: data.Name,
          Email: data.Email,
          Password: data.Password,
          Address: data.Address,
          NIP: data.NIP,
          PhoneNumber: data.Nomor,
          Position: data.Position,
          //initials: newUser.firstName[0] + newUser.lastName[0],
        });
      })
      .then(() => {
        dispatch({ type: "REGIS_SUCCESS", data });
      })
      .catch((err) => {
        dispatch({ type: "REGIS_ERROR", err });
      });
  };
};
