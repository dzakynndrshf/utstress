import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

// 🔹 Firebase Config
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

// 🔹 Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Fungsi untuk menambahkan rating ke Firestore
export async function addRating(rating) {
  try {
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      throw new Error("❌ Rating harus berupa angka antara 1 hingga 5");
    }

    const docRef = await addDoc(collection(db, "ratings"), {
      ratingsId1: rating, // Pastikan rating disimpan sebagai Number
      timestamp: serverTimestamp(), // Menggunakan serverTimestamp() untuk waktu yang akurat
    });

    console.log("✅ Rating berhasil ditambahkan dengan ID:", docRef.id);
    return { id: docRef.id, ratingsId1: rating };
  } catch (error) {
    if (error.code === "permission-denied") {
      console.error("❌ Gagal menambahkan rating: Tidak memiliki izin akses.");
    } else {
      console.error("🔥 Error saat menambahkan rating:", error.message);
    }
    throw new Error("⚠ Gagal menambahkan rating. Periksa aturan Firestore.");
  }
}

// ✅ Fungsi untuk mengambil semua rating dan menghitung rata-rata
export async function getRatings() {
  try {
    const querySnapshot = await getDocs(collection(db, "ratings"));
    
    if (querySnapshot.empty) {
      console.warn("⚠ Tidak ada rating dalam database.");
      return { ratings: [], averageRating: 0, totalVotes: 0 };
    }

    const ratings = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ratingsId1: data.ratingsId1 ?? 0, // Gunakan default jika data kosong
        timestamp: data.timestamp?.toDate() || new Date(), // Konversi timestamp
      };
    });

    // 🔹 Menghitung rata-rata rating
    const totalVotes = ratings.length;
    const totalRatings = ratings.reduce((sum, r) => sum + (r.ratingsId1 || 0), 0);
    const averageRating = totalVotes > 0 ? totalRatings / totalVotes : 0;

    return { 
      ratings, 
      averageRating: parseFloat(averageRating.toFixed(1)), 
      totalVotes 
    };
  } catch (error) {
    if (error.code === "permission-denied") {
      console.error("❌ Gagal mengambil rating: Tidak memiliki izin akses.");
    } else {
      console.error("🔥 Error saat mengambil rating:", error.message);
    }
    return { ratings: [], averageRating: 0, totalVotes: 0 };
  }
}