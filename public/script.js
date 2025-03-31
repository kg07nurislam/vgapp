import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Telegram Web App'ти иштетүү
const tg = window.Telegram.WebApp;
tg.expand(); // Толук экранга чыгарат

// Реферал кошуу функциясы
document.getElementById("referralBtn").addEventListener("click", async () => {
  try {
    const user = tg.initDataUnsafe.user; // Telegram колдонуучусу
    const docRef = await addDoc(collection(db, "VG_Users"), {
      userId: user.id,
      username: user.username,
      coins: 100,
      referrer: "None",
      createdAt: new Date()
    });
    alert("Реферал кошулду! Документ ID: " + docRef.id);
  } catch (e) {
    console.error("Ката чыкты:", e);
  }
});
