import React, { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import firebase from "firebase/compat/app";
import { auth } from "../Firebase/firebaseConfig";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
