// CONECCION A FIREBASE
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPUEfkvcJTp04nFHttAyP68T3mp_dtV4k",
  authDomain: "plataforma-ei.firebaseapp.com",
  projectId: "plataforma-ei",
  storageBucket: "plataforma-ei.appspot.com",
  messagingSenderId: "956314325252",
  appId: "1:956314325252:web:d32e56b376d09b601e4051",
  measurementId: "G-H1EQTVZH0R"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);