// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB-634D2QkI1T8aHnGvK8UnOzUOmbnnRY",
  authDomain: "netflix-4f586.firebaseapp.com",
  projectId: "netflix-4f586",
  storageBucket: "netflix-4f586.appspot.com",
  messagingSenderId: "188756576469",
  appId: "1:188756576469:web:049a814524eb1660737a5c",
  measurementId: "G-TNS8KNQ67N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
