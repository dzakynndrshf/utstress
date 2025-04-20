import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import './globals.css'

export const metadata = {
  title: 'Dzaky Anand Rashif - Portfolio',
  description: 'Portfolio website showcasing my skills and projects',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors duration-500 ease-in-out bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">{children}</body>
    </html>
  );
}
