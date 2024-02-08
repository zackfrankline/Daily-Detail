import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

//User Sign In with email and password;
export const signInUserWithEmailAndPassword = async(email,password) => await signInWithEmailAndPassword(auth,email,password); 

//Create User Sign Up with email and password
export const signUpUserWithEmailAndPassword = async(email,password) => await createUserWithEmailAndPassword(auth,email,password);

//user sign out
export const signOutUser = async()=> await signOut(auth);

//Auth observer Listener
export const onAuthStateChangedUser = (callback) => onAuthStateChanged(auth,callback);