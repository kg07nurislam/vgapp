import { db } from "./firebase-config.js";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

let tg = window.Telegram.WebApp;
tg.expand();

let userId = tg.initDataUnsafe?.user?.id || "unknown";
let referrerId = tg.initDataUnsafe?.start_param?.replace("ref_", "");

let referralLink = `https://t.me/VGApp_bot?start=ref_${userId}`;
document.getElementById("referralLink").value = referralLink;

// Шилтемени көчүрүү
function copyLink() {
    let link = document.getElementById("referralLink");
    link.select();
    document.execCommand("copy");
    alert("Шилтеме көчүрүлдү!");
}

// Досторго жөнөтүү
function shareLink() {
    let link = document.getElementById("referralLink").value;
    let text = `👋 Салам! VG App'ка кошулуп, белектерди утуп ал! 🎁\n\n🔗 Шилтеме: ${link}`;

    if (tg.isVersionAtLeast("6.1")) {
        tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`);
    } else {
        alert("Бул функция Telegram'дын акыркы версиясында гана иштейт.");
    }
}

window.copyLink = copyLink;
window.shareLink = shareLink;

// Firebase'ге рефералды кошуу
if (referrerId && referrerId !== userId) {
    let userRef = doc(db, "VG_Users", userId);
    let referrerRef = doc(db, "VG_Users", referrerId);

    getDoc(userRef).then((docSnap) => {
        if (!docSnap.exists()) {
            setDoc(userRef, { referrer: referrerId });

            updateDoc(referrerRef, {
                referrals: arrayUnion(userId)
            }).catch(() => {
                setDoc(referrerRef, { referrals: [userId] }, { merge: true });
            });
        }
    });
}

// Достордун санын жана тизмесин жүктөө
async function loadReferrals() {
    let referrerRef = doc(db, "VG_Users", userId);
    let docSnap = await getDoc(referrerRef);

    if (docSnap.exists() && docSnap.data().referrals) {
        let referrals = docSnap.data().referrals;
        document.getElementById("referralCount").textContent = referrals.length;

        let list = document.getElementById("referralList");
        list.innerHTML = "";
        referrals.forEach((ref) => {
            let li = document.createElement("li");
            li.textContent = `👤 Колдонуучу ID: ${ref}`;
            list.appendChild(li);
        });
    }
}

loadReferrals();
