import { createContext, useEffect, useState } from "react";
import {
  createUserDocFromAuth,
  onAuthStateChangedUser,
} from "../config/fireabse.utils";

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  

  useEffect(() => {
    const unsubscribe = onAuthStateChangedUser((user) => {
      setCurrentUser(user);
      if (user) {
        console.log("UnSubscribe onAuthStateChange Message:", user.uid);
        createUserDocFromAuth(user);
      }
    });
    return unsubscribe;
  }, []);
  
  const storeUserDetail = async (userPersonalDetails) => {
      setCurrentUser({ ...currentUser, userPersonalDetails });
    try {
      await createUserDocFromAuth(currentUser, userPersonalDetails);
    } catch (e) {
      console.log("Storing User Detail Error:" + e);
    }
  };

  const value = { currentUser, setCurrentUser, storeUserDetail };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
