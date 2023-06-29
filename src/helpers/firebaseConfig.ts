import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || "");

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
