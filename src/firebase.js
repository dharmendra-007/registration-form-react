import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDMjUI4Hsu__DZe08oNnJX8s3END2ggmPc",
  authDomain: "login-info-enigma.firebaseapp.com",
  projectId: "login-info-enigma",
  storageBucket: "login-info-enigma.appspot.com",
  messagingSenderId: "827843552649",
  appId: "1:827843552649:web:48f8cbdc81c273fd05ad58"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);