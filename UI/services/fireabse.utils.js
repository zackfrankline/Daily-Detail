import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { FIREBASE_DB } from "../config/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";

//User Sign In with email and password;
export const signInUserWithEmailAndPassword = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);

//Create User Sign Up with email and password
export const signUpUserWithEmailAndPassword = async (email, password) =>
  await createUserWithEmailAndPassword(auth, email, password);

//user sign out
export const signOutUser = async () => await signOut(auth);

//function to Write muliple documents in a new Collection
export const writeDataToCollection = async (collectionKey, objects) => {
  const collectionRef = collection(FIREBASE_DB, collectionKey);
  const batch = writeBatch(FIREBASE_DB);

  objects.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

//function to fetch all variant documents from Service Tier collection
export const fetchDatafromCollection = async (CollectionKey) => {
  console.log(CollectionKey);
  const querySnapshot = await getDocs(collection(FIREBASE_DB, CollectionKey));
  const productMap = querySnapshot.docs.reduce((accumulator, doc, index) => {
    accumulator.push(doc.data());
    return accumulator;
  }, []);
  return productMap
};

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
        active_subscription: false,
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
