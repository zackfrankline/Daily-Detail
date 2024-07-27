import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { FIREBASE_DB } from "./firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

//User Sign In with email and password;
export const signInUserWithEmailAndPassword = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);

//Create User Sign Up with email and password
export const signUpUserWithEmailAndPassword = async (email, password) =>
  await createUserWithEmailAndPassword(auth, email, password);

//user sign out
export const signOutUser = async () => await signOut(auth);

//Auth observer Listener
export const onAuthStateChangedUser = (callback) =>
  onAuthStateChanged(auth, callback);

//Storing user uid in database
export const createUserDocFromAuth = async (userAuth, defaultData = {}) => {
  const userDocRef = doc(FIREBASE_DB, "Users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        subscription_start_date:null,
        subscription_end_date:null,
        active_subscription:false,
      });
    } catch (err) {
      console.log("set User Doc error:" + err);
    }
  } else if (defaultData) {
    try {
      await setDoc(userDocRef, defaultData, { merge: true });
    } catch (e) {
      console.log("error in Updating User in FireStore" + e);
    }
  }
  return userDocRef;
};

export const getUserDocFirestore = async (userDocRef) => {
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    try {
      const userDoc = userDocSnap.data();
      return userDoc;
    } catch (e) {
      console.log("Error Fetching User Doc:", e);
    }
  } else {
    console.log("No Documents Exists!");
  }
};
