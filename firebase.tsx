// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW4OywLuJIBR0zWRHb2Vq_iSd3vue4dLA",
  authDomain: "todolist-9345f.firebaseapp.com",
  projectId: "todolist-9345f",
  storageBucket: "todolist-9345f.appspot.com",
  messagingSenderId: "110105486293",
  appId: "1:110105486293:web:20637283288440db5dd35c",
  measurementId: "G-56T7VDV9R4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth: any = getAuth(app);
export const db: any = getFirestore(app);
