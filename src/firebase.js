import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJNfD6iqYe5-C56NJu2ZymWD-1c9z5CIk",
  authDomain: "receitai-da952.firebaseapp.com",
  projectId: "receitai-da952",
  storageBucket: "receitai-da952.firebasestorage.app",
  messagingSenderId: "644553546074",
  appId: "1:644553546074:web:7e5ae141b3eca80f6b3b63"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);