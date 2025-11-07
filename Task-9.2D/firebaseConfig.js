import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBR7DMPIccinUzmRjCUVIg1jAWkG6gE9T0",
  authDomain: "finald-7346d.firebaseapp.com",
  projectId: "finald-7346d",
  storageBucket: "finald-7346d.firebasestorage.app",
  messagingSenderId: "158254179319",
  appId: "1:158254179319:web:b6367af12a809797d644f2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
