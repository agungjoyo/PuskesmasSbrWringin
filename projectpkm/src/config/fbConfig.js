import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRWpsaX3aL3Ujg59Hvh4oPUoQHgGWXpok",
  authDomain: "projectpuskesmas.firebaseapp.com",
  projectId: "projectpuskesmas",
  storageBucket: "projectpuskesmas.appspot.com",
  messagingSenderId: "230992065016",
  appId: "1:230992065016:web:b812d9ad1676fa5ec2660d",
  measurementId: "G-TNV7F2KWN0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
