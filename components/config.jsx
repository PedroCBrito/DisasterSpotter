// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import{getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getDatabase} from "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD7FHRSz2yVTjfk357dn7jilGNv3yAHkxY",
  authDomain: "disasterspotter.firebaseapp.com",
  projectId: "disasterspotter",
  storageBucket: "disasterspotter.appspot.com",
  messagingSenderId: "622933777676",
  appId: "1:622933777676:web:042ae42b02ca5d9a8e3d29",
  measurementId: "G-5D4ELS77HK"
};



// Initialize Firebase
export const firebase_app = firebase.initializeApp(firebaseConfig);
export const firebase_auth = getAuth(firebase_app);
export const analytics = getAnalytics(firebase_app);


//initialize firestore
export const app = getDatabase(firebase_app)
export const db = getFirestore(firebase_app);
export const storage = getStorage(firebase_app);
export {firebase};