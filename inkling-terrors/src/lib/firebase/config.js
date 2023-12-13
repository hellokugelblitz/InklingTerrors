// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-2dXBnj8fyw49tki8KyEVz0C6j2o3T5w",
  authDomain: "inkling-terrors.firebaseapp.com",
  projectId: "inkling-terrors",
  storageBucket: "inkling-terrors.appspot.com",
  messagingSenderId: "505532011958",
  appId: "1:505532011958:web:250026a6c8c91c83781d17",
  measurementId: "G-EYWH08GDM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);