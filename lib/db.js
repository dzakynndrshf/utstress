import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";


// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDCx0CvCvWTmn1dwxjP4Fd3KQK6Zj-CwOs",
    authDomain: "uts-mobile-8dcd2.firebaseapp.com",
    databaseURL: "https://uts-mobile-8dcd2-default-rtdb.firebaseio.com",
    projectId: "uts-mobile-8dcd2",
    storageBucket: "uts-mobile-8dcd2.firebasestorage.app",
    messagingSenderId: "13948660111",
    appId: "1:13948660111:web:743a0aa2997dc8e09283fa",
    measurementId: "G-ZHYD6CHX4P"
  };

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Fungsi untuk menambahkan komentar ke Firestore
export async function addComment(name, comment) {
  try {
    const docRef = await addDoc(collection(db, "comments"), {
      name: name,
      comment: comment,
      timestamp: new Date(),
    });

    return { id: docRef.id, name, comment };
  } catch (error) {
    console.error("Gagal menambahkan komentar:", error);
    throw new Error("Gagal menambahkan komentar");
  }
}

// ✅ Fungsi untuk mendapatkan semua komentar dari Firestore
export async function getComments() {
  try {
    const querySnapshot = await getDocs(collection(db, "comments"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}