import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb__yIqBPpWOFT4k6ISEb7EG4q2dpGWkk",
  authDomain: "mega-store-e-commerce.firebaseapp.com",
  projectId: "mega-store-e-commerce",
  storageBucket: "mega-store-e-commerce.appspot.com",
  messagingSenderId: "925632275601",
  appId: "1:925632275601:web:4030f0577f982fd8244b30",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocument = async (userAuth,additionalData = {}) => {
    if(!userAuth) return

  const userDocRef = doc(db, "users", userAuth?.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
displayName,
        email,
        createdAt,
...additionalData
      });

    } catch (error) {
        console.log(error)
    }

  }
      return userDocRef
};
// console.log(auth)
export const createAuthUserWithEmailAndPassword = async(email,password,name)=>{
    if(!email||!password) return
    
    const response = await createUserWithEmailAndPassword(auth,email,password)
    // console.log(name)
    updateProfile(auth.currentUser, { displayName:  name});
    // console.log(response)
    return response
}


export const  signInAuthWithEmailAndPassword=async(email,password)=>{
        if(!email||!password) return
    const response = await signInWithEmailAndPassword(auth,email,password)

    return response
}

export const signOutUser=async()=> await signOut(auth)
export const onAuthStateChangedListner = (callBack)=>onAuthStateChanged(auth,callBack)

export const getCurrentUser = ()=>{
  return new Promise((resolve,reject)=>{
    const unsubscribe = onAuthStateChanged(auth,(userAuth)=>{
      unsubscribe()
      resolve(userAuth)
    },reject)
  })
}

export const getUserData = async () => {
  try {
    const userRef = doc(collection(db, 'users'), auth.currentUser.uid);
    const docSnapshot = await getDoc(userRef);

    if (docSnapshot.exists()) {
      // Update data logic (consider using updateDoc for specific fields)
      const userData = docSnapshot.data();
      // console.log("User data:", userData); 
      // ...
      return userData
    } else {
      console.warn("User document not found");
    }
  } catch (error) {
    console.error("Error fetching or updating user data:", error);
  }
};

export const updateSpecificFields = async (dataName,dataToUpdate) => {
  try {
await updateDoc(doc(db, "users", auth.currentUser.uid), {
    [dataName]:dataToUpdate
  });
    console.log("User data updated successfully!");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};