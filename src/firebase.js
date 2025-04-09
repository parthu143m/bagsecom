import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyApPONlkYtTb8gEaq2y7dSuttUPTK51lU0",
    authDomain: "bags-b06bb.firebaseapp.com",
    databaseURL: "https://bags-b06bb-default-rtdb.firebaseio.com/",
    projectId: "bags-b06bb",
    storageBucket: "bags-b06bb.firebasestorage.app",
    messagingSenderId: "917890685626",
    appId: "1:917890685626:web:1e0b477402725492f84083",
    measurementId: "G-GJ7YJ6F4Q3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);