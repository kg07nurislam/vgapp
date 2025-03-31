import { db } from "./firebase-config.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

let tg = window.Telegram.WebApp;
tg.expand(); // Веб-аппты экранды толук камтыш үчүн

let userId = tg.initDataUnsafe?.user?.id || "unknown";
let referrerId = tg.initDataUnsafe?.start_param?.replace("ref_", "");

// Рефералдык шилтеме түзүү
let referralLink = `https://t.me/VGApp_bot?start=ref_${userId}`;
document.getElementById("referralLink").value = referralLink;

// Шилтемени көчүрүү функциясы
function copyLink() {
    let link = document.getElementById("referralLink");
    link.select();
    document.execCommand("copy");
    alert("Шилтеме көчүрүлдү!");
}

// Досторго бөлүшүү функциясы
function shareLink() {
    let link = document.getElementById("referralLink").value;
    Telegram.WebApp.openTelegramLink(link);
}

window.copyLink = copyLink;
window.shareLink = shareLink;

// Рефералды Firebase'ге сактоо
if (referrerId && referrerId !== userId) {
    let userRef = doc(db, "VG_Users", userId);
    getDoc(userRef).then((docSnap) => {
        if (!docSnap.exists()) {
            setDoc(userRef, { referrer: referrerId })
                .then(() => console.log("Реферал сакталды!"))
                .catch((error) => console.error("Ката:", error));
        }
    });
}
