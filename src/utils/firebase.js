
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interview-ai-7c6ee.firebaseapp.com",
  projectId: "interview-ai-7c6ee",
  storageBucket: "interview-ai-7c6ee.firebasestorage.app",
  messagingSenderId: "637100986909",
  appId: "1:637100986909:web:10458a64b0975f4b2eacf4",
  measurementId: "G-5VTF2NM8DB"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}