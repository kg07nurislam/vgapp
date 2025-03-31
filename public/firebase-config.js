import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGeTpv7...",
  authDomain: "vgapp-db.firebaseapp.com",
  projectId: "vgapp-db",
  storageBucket: "vgapp-db.appspot.com",
  messagingSenderId: "246581465852",
  appId: "1:246581465852:web:a29e323c2409e5e1e73d79",
  measurementId: "G-NP3MFTQ8KN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
