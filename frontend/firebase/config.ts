// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKEqifx1Madi2-88MDgMWfl8Og8xUHDs0",
  authDomain: "finance-flutter.firebaseapp.com",
  projectId: "finance-flutter",
  storageBucket: "finance-flutter.appspot.com",
  messagingSenderId: "1050081315473",
  appId: "1:1050081315473:web:5b4b8717a647aad66ecd30",
  measurementId: "G-PYHLXDTEDH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
