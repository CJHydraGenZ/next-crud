// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqXy9gLDvlFD33WO9TYnlMZT55fWBW-KM",
  authDomain: "database-nextjs-fdb60.firebaseapp.com",
  projectId: "database-nextjs-fdb60",
  storageBucket: "database-nextjs-fdb60.appspot.com",
  messagingSenderId: "374348282881",
  appId: "1:374348282881:web:d9052ea21b2e0261981400",
  measurementId: "G-T94GFR5KDF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
