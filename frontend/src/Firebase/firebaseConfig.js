import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8CbUzFV_neu5E1hKDf2iKkT6pLbgA23s",
  authDomain: "techlabs-38d70.firebaseapp.com",
  projectId: "techlabs-38d70",
  storageBucket: "techlabs-38d70.appspot.com",
  messagingSenderId: "305264153203",
  appId: "1:305264153203:web:97c09759e3b708261c1006",
  measurementId: "G-0FJD6HCD3Z",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
