import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { FIREBASE_DB } from "./firebaseConfig"; 
import { doc, getDoc, setDoc } from "firebase/firestore";

//User Sign In with email and password;
export const signInUserWithEmailAndPassword = async(email,password) => await signInWithEmailAndPassword(auth,email,password); 

//Create User Sign Up with email and password
export const signUpUserWithEmailAndPassword = async(email,password) => await createUserWithEmailAndPassword(auth,email,password);

//user sign out
export const signOutUser = async()=> await signOut(auth);

//Auth observer Listener
export const onAuthStateChangedUser = (callback) => onAuthStateChanged(auth,callback);

//Storing user uid in database
export const createUserDocFromAuth = async(userAuth,defaultData={}) => {
    const userDocRef = doc(FIREBASE_DB,"Users",userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);

    if(!userSnapShot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...defaultData
            });
        }
        catch(err){
            console.log("set User Doc error:"+err);
        }
    }
    else if(defaultData){
        try{
            await setDoc(userDocRef,defaultData,{merge:true})
        }
        catch(e){
            console.log("error in Updating User in FireStore"+e)
        }
    }
    return userDocRef;
} 