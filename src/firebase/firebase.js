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


// const firebaseConfig = {
// 	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// 	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// 	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
// 	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: import.meta.env.VITE_FIREBASE_APP_ID,
// 	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
//const storage = getStorage(app);

export { app, auth, firestore };