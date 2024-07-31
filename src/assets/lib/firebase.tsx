// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFAXAdmejIhJBik4RkaQppd9rtU_Xggsk",
  authDomain: "kine-moe.firebaseapp.com",
  projectId: "kine-moe",
  storageBucket: "kine-moe.appspot.com",
  messagingSenderId: "548712519193",
  appId: "1:548712519193:web:0b9ae944c65141c2097c88",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

googleAuthProvider.setCustomParameters({
  prompt: "select_account ",
});

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleAuthProvider);
