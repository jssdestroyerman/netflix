// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEECAbGdn2Dx014NizUtixChuQbVMKfNo",
    authDomain: "netflix-ce971.firebaseapp.com",
    projectId: "netflix-ce971",
    storageBucket: "netflix-ce971.appspot.com",
    messagingSenderId: "944367397308",
    appId: "1:944367397308:web:9f4dc35568d4ff4c9fa3b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
