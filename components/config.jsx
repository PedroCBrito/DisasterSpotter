// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import{getAuth} from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDT5wqmKISkTrgIyMFVlSR0kfG7-b9RT7A",
  authDomain: "itemm-bda8b.firebaseapp.com",
  projectId: "itemm-bda8b",
  storageBucket: "itemm-bda8b.appspot.com",
  messagingSenderId: "969051362783",
  appId: "1:969051362783:web:7453400cf9fd5b0546e06a",
  measurementId: "G-H8V9QPZ4NN"
};




// Initialize Firebase
export const firebase_app = firebase.initializeApp(firebaseConfig);
export const firebase_auth = getAuth(firebase_app);
export const analytics = getAnalytics(firebase_app);


//initialize firestore
export const db = getFirestore(firebase_app);