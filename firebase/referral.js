import { db } from "./firebase-config.js";
import { doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

let tg = window.Telegram.WebApp;
let user = tg.initDataUnsafe.user;
const urlParams = new URLSearchParams(window.location.search);
const referralId = urlParams.get("ref");

async function registerUser() {
    if (!user) return;
    
    const userRef = doc(db, "users", user.id.toString());
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            username: user.username || "No Username",
            referral_id: referralId || null,
            invited_count: 0,
            timestamp: new Date()
        });

        if (referralId) {
            const referrerRef = doc(db, "users", referralId);
            const referrerSnap = await getDoc(referrerRef);

            if (referrerSnap.exists()) {
                let currentCount = referrerSnap.data().invited_count || 0;
                await updateDoc(referrerRef, {
                    invited_count: currentCount + 1
                });
            }
        }
    }
}

async function loadReferralData() {
    if (!user) return;

    document.getElementById("username").innerText = `Салам, ${user.username || "Колдонуучу"}!`;
    let referralLink = `https://yourapp.com/?ref=${user.id}`;
    document.getElementById("referralLink").value = referralLink;

    const userRef = doc(db, "users", user.id.toString());
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        document.getElementById("invitedList").innerHTML = `Чакырган адамдар: ${userSnap.data().invited_count || 0}`;
    }
}

registerUser().then(loadReferralData);
