import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyAKjOar1_ny1d-s4MOM_CJYbST5fUlsKjY",
  authDomain: "todolist-833e5.firebaseapp.com",
  projectId: "todolist-833e5",
  storageBucket: "todolist-833e5.appspot.com",
  messagingSenderId: "716250277692",
  appId: "1:716250277692:web:5209e41fd938c8d850e039"
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };