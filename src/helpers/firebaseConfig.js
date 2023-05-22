
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAPZJB1h2HJYaQIxjAPbS3QTeLSsVGyxKM",
  authDomain: "solidity-scan.firebaseapp.com",
  databaseURL: "https://solidity-scan-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "solidity-scan",
  storageBucket: "solidity-scan.appspot.com",
  messagingSenderId: "94183586059",
  appId: "1:94183586059:web:1c4bee5c793cb732174a0e",
  measurementId: "G-38ZKBZ975G"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
