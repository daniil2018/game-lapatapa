// Инициализация Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVUwzS5Qub1DcStW2h_zdh0bnyHGhMUg4",
  authDomain: "lapatapa-game.firebaseapp.com",
  projectId: "lapatapa-game",
  storageBucket: "lapatapa-game.firebasestorage.app",
  messagingSenderId: "352151750568",
  appId: "1:352151750568:web:633a974cb5408e64047f9d"
};

// Вход анонимного пользователя
signInAnonymously(auth)
  .then(() => {
    loadUserData();
  })
  .catch((error) => {
    console.error("Ошибка входа:", error);
  });

async function loadUserData() {
  const userId = auth.currentUser.uid;
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    updateUI(userData);
  } else {
    await setDoc(userRef, { coins: 0, lastAction: null });
    updateUI({ coins: 0, lastAction: null });
  }
}

function updateUI(data) {
  document.getElementById('coins').textContent = `Монеты: ${data.coins}`;
}

// Действия с питомцем
window.feedPet = async function() {
  const today = new Date().toISOString().split('T')[0];
  const userId = auth.currentUser.uid;
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  if (userData.lastAction === today) {
    alert("Вы уже кормили питомца сегодня!");
    return;
  }

  await setDoc(userRef, { 
    coins: userData.coins + 10,
    lastAction: today 
  }, { merge: true });

  loadUserData();
};
