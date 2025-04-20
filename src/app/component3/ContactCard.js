// components/ContactCard.jsx
export default function ContactCard({ icon, title, value }) {
    return (
      <div className="bg-white dark:bg-purple-800 text-purple-800 dark:text-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <span className="text-3xl mb-2">{icon}</span>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-200">{value}</p>
      </div>
    );
  }
  