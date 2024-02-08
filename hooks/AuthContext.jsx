import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedUser } from "../config/fireabse.utils";

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedUser((user) => {
      if (user) {
        console.log("UnSubscribe onAuthStateChange Message:",user.uid);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
