import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB3UzwnKON0iRmsexG10W4TaeVlwkJZpsQ",
    authDomain: "universe-store-a0127.firebaseapp.com",
    projectId: "universe-store-a0127",
    storageBucket: "universe-store-a0127.appspot.com",
    messagingSenderId: "413815838619",
    appId: "1:413815838619:web:41aa4540e41bbff995733e",
    measurementId: "G-XJ5Z0Q4BBH"
};

export const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app)
