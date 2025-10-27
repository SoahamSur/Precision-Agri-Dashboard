// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe5kG6QyalZnIttfYNpbJB9eWLCwSynkI",
  authDomain: "iot-in-precision-agri.firebaseapp.com",
  databaseURL: "https://iot-in-precision-agri-default-rtdb.firebaseio.com/",
  projectId: "iot-in-precision-agri",
  storageBucket: "iot-in-precision-agri.firebasestorage.app",
  messagingSenderId: "1052358672269",
  appId: "1:1052358672269:web:7c49ca47402467ab9147c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);