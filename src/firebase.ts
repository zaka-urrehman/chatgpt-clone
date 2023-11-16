// Import the functions you need from the SDKs you need
import {getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNPuyBtDppEkX9xsgegqi60e3tTnAtHZI",
  authDomain: "chatgpt-clone-d838b.firebaseapp.com",
  projectId: "chatgpt-clone-d838b",
  storageBucket: "chatgpt-clone-d838b.appspot.com",
  messagingSenderId: "644764685396",
  appId: "1:644764685396:web:710828e93146f8878709c1"
};

// Initialize Firebase
const app = getApps().length ? getApp():  initializeApp(firebaseConfig);
const db = getFirestore(app)


export {db}