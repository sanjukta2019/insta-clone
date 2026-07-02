import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDWoXkq4s_3fR_g5g7iPfrwkjO7OdQ5Pf8",
  authDomain: "insta-clone-6e16d.firebaseapp.com",
  projectId: "insta-clone-6e16d",
  storageBucket: "insta-clone-6e16d.firebasestorage.app",
  messagingSenderId: "12312629090",
  appId: "1:12312629090:web:7fd120b9ac614fa1ab263b",
  measurementId: "G-G17K7PRSCZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
//const storage = getStorage(app);

export { app, auth, firestore };
