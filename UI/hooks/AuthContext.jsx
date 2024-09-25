import { createContext, useEffect, useMemo, useState } from "react";
import {
  createUserDocFromAuth,
  getUserDocFirestore,
  onAuthStateChangedUser,
} from "../services/fireabse.utils";

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  userData: null,
  setUserData: () => null,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedUser(async (user) => {
      if (user) {
        console.log("UnSubscribe onAuthStateChange Message:", user.uid);
        setCurrentUser(user);
        const userDocRef = await createUserDocFromAuth(user);

        //check user Data reference exists in firestore
        const userDoc = await getUserDocFirestore(userDocRef);
        //Todo: if the user doesnt have subscription details add them.(by checking userDoc)
        setUserData(userDoc);
      }
    });
    return unsubscribe;
  }, []);

  const storeUserDetail = async (userPersonalDetails) => {
    setUserData(userPersonalDetails);
    try {
      await createUserDocFromAuth(currentUser, userPersonalDetails);
    } catch (e) {
      console.log("Storing User Detail Error:" + e);
    }
  };

  const value = useMemo(
    () => ({ currentUser, userData, setCurrentUser, storeUserDetail }),
    [currentUser, userData]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
