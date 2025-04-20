"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "./components/Navbar";
import SkillBar from "./component2/SkillBar";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaDatabase } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import ContactCard from './component3/ContactCard'; // pastikan path-nya sesuai
import { Moon, Sun } from "lucide-react";
import { addComment, getComments } from "../../lib/db";
import { collection, addDoc, getDocs } from "../../lib/ratingsdb";
import { addRating, getRatings } from "../../lib/ratingsdb";
import axios from 'axios';


export default function Home() {
  const [theme, setTheme] = useState("light");
  const [selectedProject, setSelectedProject] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
const [comment, setComment] = useState("");
const [comments, setComments] = useState([]);
const [selectedRating, setSelectedRating] = useState(0);
const [averageRating, setAverageRating] = useState(0);
const [totalVotes, setTotalVotes] = useState(0);
const [ratings, setRatings] = useState([]);
const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [loading, setLoading] = useState(false);

const handleQuestionChange = (e) => {
  setQuestion(e.target.value);
};

const askQuestion = async () => {
  setLoading(true);
  try {
    const response = await axios.post('/api/question/route', { question });
    setAnswer(response.data.answer);
  } catch (error) {
    console.error(error);
    setAnswer("An Error has occurred");
  } finally {
    setLoading(false);
  }
};


  // ✅ Fungsi untuk mengirim rating
  const handleRate = async (rating) => {
    try {
      if (selectedRating === rating) return; // Mencegah rating ganda dari user yang sama dalam satu sesi
      
      setSelectedRating(rating);
      await addRating(rating);
      
      await fetchRatings(); // Refresh data rating setelah menambah rating
    } catch (error) {
      console.error("🔥 Error submitting rating:", error.message);
    }
  };

  // ✅ Fungsi untuk mengambil data rating dari Firestore
  const fetchRatings = async () => {
    try {
      const { ratings, averageRating, totalVotes } = await getRatings();

      setRatings(ratings);
      setAverageRating(averageRating);
      setTotalVotes(totalVotes);
    } catch (error) {
      console.error("🔥 Error fetching ratings:", error.message);
    }
  };

    // ✅ Ambil data rating saat komponen pertama kali dirender
    useEffect(() => {
      fetchRatings();
    }, []);
  
useEffect(() => {
  const fetchComments = async () => {
    try {
      const data = await getComments();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  fetchComments();
}, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert("Nama dan komentar tidak boleh kosong!");
      return;
    }
    try {
      await addComment(name, comment);
      const updatedComments = await getComments();
      setComments(updatedComments);
      setName("");
      setComment("");
    } catch (error) {
      console.error("Error saat menambahkan komentar:", error);
      alert("Terjadi kesalahan saat menambahkan komentar");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode); // This will toggle the state between true and false
  };
  

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const projects = [
    {
      id: 1,
      title: "Manajemen Class",
      slug: "manajemen-class",
      description: "Sebuah halaman Manajemen untuk kelas di Universitas.",
      image: "/manajemen.jpg",
      details:
        "Aplikasi ini memungkinkan dosen atau admin untuk mengelola pembagian kelas, menambahkan/menghapus peserta, dan melihat data secara real-time. Fitur unggulan termasuk drag-and-drop antar kelas, UI yang responsif, serta integrasi penyimpanan menggunakan database. Cocok digunakan untuk kebutuhan akademik skala kecil hingga menengah.",
    },
    {
      id: 2,
      title: "E-Commerce UI",
      slug: "ecommerce-ui",
      description: "Desain antarmuka toko online dengan fitur keranjang.",
      image: "/online.jpg",
      details:
        "UI ini dirancang untuk menampilkan produk, memudahkan pengguna menambahkan barang ke keranjang, dan mengelola pesanan. Menggunakan desain responsif dan interaktif berbasis Tailwind CSS dengan alur checkout yang sederhana dan intuitif.",
    },
    {
      id: 3,
      title: "Dashboard Admin",
      slug: "dashboard-admin",
      description: "Dashboard interaktif untuk analisis data dan manajemen pengguna.",
      image: "/admin.jpg",
      details:
        "Dashboard ini menampilkan statistik visual dengan grafik interaktif, fitur manajemen pengguna (CRUD), autentikasi admin, dan filter data berdasarkan waktu. Cocok untuk admin aplikasi berbasis data.",
    },
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
<main className={`${theme === "dark" ? "dark" : ""}`}>
  <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 scroll-smooth font-sans transition-colors duration-500 ease-in-out">
     {/* Tombol Toggle Tema */}
      {/* <div className="fixed bottom-4 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          {theme === "dark" ? <><span>🌞</span> Light Mode</> : <><span>🌙</span> Dark Mode</>}
        </button>
      </div> */}

      <Navbar />

      {/* About Section */}
      {/* ... (bagian About tetap sama) */}
      <motion.section
  id="about"
  className={`min-h-screen relative flex items-center justify-center px-6 md:px-16 py-24 overflow-hidden transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 0.8 }}
>
  <img
    src="dzaky.JPG"
    alt="Dzaky Anand Rashif"
    className="w-40 h-40 md:w-60 md:h-60 object-cover rounded-full shadow-md border-4 border-purple-200 dark:border-purple-700"
  />
  <div>
    <h2 className="text-5xl font-bold text-purple-600 dark:text-white mb-6">
      About Me
    </h2>
    <p className="text-xl mb-4">
      <strong>👋 Hello! I'm Dzaky Anand Rashif</strong>
    </p>
    <p className="text-xl leading-relaxed max-w-3xl">
      A creative web developer who loves building stylish, fast, and accessible websites using <strong>Next.js</strong>, <strong>Tailwind CSS</strong>, and <strong>Framer Motion</strong>.
    </p>
  </div>
</motion.section>




      {/* Skills Section */}
      {/* ... (bagian Skills tetap sama) */}

      <motion.section
  id="skills"
  className={`min-h-screen relative flex items-center justify-center px-6 md:px-16 py-24 overflow-hidden transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-purple-500 text-black"}`}
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 0.8, delay: 0.2 }}
>
  <h2 className="text-5xl font-bold text-black-700 dark:text-purple-300 mb-6">Keahlian Saya</h2>
  <p className="text-center text-lg mb-10 max-w-2xl text-gray-700 dark:text-gray-700">
    Berikut adalah keterampilan utama saya dalam pengembangan web:
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
    <SkillBar icon={<FaHtml5 />} name="HTML" percent={90} />
    <SkillBar icon={<FaCss3Alt />} name="CSS & Tailwind" percent={85} />
    <SkillBar icon={<FaJs />} name="JavaScript" percent={60} />
    <SkillBar icon={<FaReact />} name="React.js" percent={55} />
    <SkillBar icon={<TbBrandNextjs />} name="Next.js" percent={40} />
    <SkillBar icon={<FaDatabase />} name="Database / PL/SQL" percent={80} />
  </div>
</motion.section>


      {/* Portfolio Section */}
      <motion.section
  id="portfolio"
  className={`min-h-screen relative flex flex-col items-center justify-center px-6 md:px-16 py-24 overflow-hidden transition-all duration-300 ${darkMode ? "bg-gray-900 text-black" : "bg-white text-black"}`}
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 0.8, delay: 0.4 }}
>
  <div className="text-center mb-12">
    <h2 className="text-5xl font-bold text-purple-600 dark:text-white-400 mb-6">Portfolio</h2>
    <p className="text-xl text-gray-600 mb-6">Here's a sneak peek of some recent projects:</p>
  </div>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map((project) => (
      <motion.div
        key={project.id}
        whileHover={{ scale: 1.03 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-indigo-200 dark:hover:shadow-purple-900 transition duration-300"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-purple-700 transition"
          onClick={() => handleProjectClick(project)}
        >
          Lihat Detail
        </motion.button>
      </motion.div>
    ))}
  </div>
</motion.section>


      {/* Pop-up Detail */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: popupVisible ? 1 : 0 }}
          exit={{ opacity: 0 }}
          onClick={handleClosePopup}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg max-w-lg w-full relative"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: popupVisible ? 0 : 100, opacity: popupVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
              {selectedProject.title}
            </h3>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <p className="text-gray-700 dark:text-gray-300 mb-2">{selectedProject.description}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{selectedProject.details}</p>
          </motion.div>
        </motion.div>
      )}

      {/* Contact Section */}
      {/* ... (bagian Contact tetap sama) */}
      <motion.section
  id="contact"
  className={`min-h-screen relative flex flex-col items-center justify-center px-6 md:px-16 py-24 overflow-hidden transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-purple-500 text-black"}`}
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 0.8, delay: 0.6 }}
>
  <div className="text-center mb-12">
    <h2 className="text-5xl font-bold mb-4 text-gray-800 dark:text-white">Hubungi Saya</h2>
    <p className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-200">
      Tertarik bekerja sama atau punya pertanyaan? Hubungi saya atau kirim pesan langsung.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-5xl">
    <ContactCard icon="📧" title="Email" value="dzakyanandrashif@gmail.com" />
    <ContactCard icon="📞" title="Telepon" value="0838-2928-2472" />
    <ContactCard icon="📍" title="Lokasi" value="Bandung, Indonesia" />
  </div>
</motion.section>

<motion.section 
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className={`py-16 px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-center text-center gap-8 transition-all duration-300 ${
    darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
  }`}
> 
  <div className="w-full max-w-3xl flex flex-col items-center bg-transparent p-6 sm:p-10">
    <motion.h2 
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-4xl sm:text-5xl font-extrabold text-blue-700 dark:text-blue-300 mb-4"
    >
      Get in Touch
    </motion.h2>
    
    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-xl">
      Let's create something amazing together!
    </p>

    {/* Form Komentar */}
    <motion.form 
      onSubmit={handleCommentSubmit}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`w-full max-w-md p-6 rounded-2xl shadow-xl border transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'
      }`}
    >
      <h3 className="text-2xl font-semibold mb-5 text-blue-600 dark:text-blue-300">Leave a Comment</h3>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`w-full p-3 mb-4 border rounded-xl bg-transparent focus:outline-none focus:ring-2 ${
          darkMode ? 'border-gray-600 text-white focus:ring-blue-500' : 'border-gray-300 text-black focus:ring-blue-600'
        }`}
        required
      />

      <textarea
        placeholder="Your Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className={`w-full p-3 mb-4 border rounded-xl bg-transparent resize-none h-32 focus:outline-none focus:ring-2 ${
          darkMode ? 'border-gray-600 text-white focus:ring-blue-500' : 'border-gray-300 text-black focus:ring-blue-600'
        }`}
        required
      ></textarea>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
      >
        Submit
      </motion.button>
    </motion.form>

    {/* Daftar Komentar */}
    <div className="mt-10 w-full flex flex-col items-center">
      <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-300">Comments</h3>
      
      <motion.ul 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full space-y-4`}
      >
        {comments.map((comment, index) => (
          <motion.li 
            key={index} 
            whileHover={{ scale: 1.02 }}
            className={`w-full p-4 rounded-xl shadow border transition-all duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'
            }`}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{new Date().toLocaleDateString()}</p>
            <p><strong className="text-blue-700 dark:text-blue-300">{comment.name}</strong></p>
            <p>{comment.comment}</p>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </div>
</motion.section>
<motion.section>
  <div className="p-8">
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">
          Ask a Question: 
        </label>
        <textarea className="shadow text-bold appearance-none border rounded w-full py-2"
        rows={4}
        value={question}
        onChange={handleQuestionChange}
        >
        </textarea>
      </div>
      <button className="bg-purple-500 text-white font-bold py-2"
      onClick={askQuestion}
      disabled={loading}
      >
        Ask
      </button>
      {loading && <div className="text-purple-500 mt-4">loading...</div>}
      {answer &&(
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <strong className="text-black">Answer</strong>
          <p className="text-black text-semibold">{answer}</p>
        </div>
      )}
  </div>
</motion.section>

<section className={`py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center gap-6 transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} animate-fadeIn`}> 
  <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-3 sm:mb-4 animate-slideUp">
    Rate In Website
  </h2>

  {/* Bintang Rating */}
  <div className="flex justify-center gap-2 mb-4 animate-scaleIn">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        onClick={() => handleRate(star)}
        className={`text-3xl transition-all duration-300 transform ${
          star <= selectedRating 
            ? "text-yellow-400 scale-125 drop-shadow-lg" 
            : "text-gray-400 dark:text-gray-300 hover:text-yellow-300 dark:hover:text-yellow-400 hover:scale-110"
        }`}
      >
        ★
      </button>
    ))}
  </div>

  {/* Teks Rating */}
  <p className="text-lg font-semibold text-gray-800 dark:text-white transition-all animate-fadeIn">
    Rating <span className="text-blue-600 dark:text-blue-400">{averageRating.toFixed(1)}</span> 
    ({totalVotes} votes)
  </p>
</section>

      <button
  onClick={toggleTheme}
  className="fixed bottom-4 right-4 p-3 rounded-full shadow-md text-lg font-semibold transition-all duration-300 ease-in-out z-50"
  style={{
    backgroundColor: darkMode ? "#4A5568" : "#E2E8F0",
    color: darkMode ? "white" : "black",
  }}
>
  {darkMode ? <Sun size={24} /> : <Moon size={24} />}
</button>

</div>
</main>
  );
}
