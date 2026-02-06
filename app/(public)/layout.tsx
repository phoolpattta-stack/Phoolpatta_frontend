import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/TopBar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phool Patta : Best for Flowers & Bouquets",
  description: "A beautiful e-commerce website for flowers and bouquets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    
      <div
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          font-sans
          min-h-screen
          flex
          flex-col
          bg-gray-100
        `}
      >
        <TopBar/>
        <Header />

        {/* MAIN CONTENT */}
        
          
        <main className="flex-1 pb-10 bg-white">
          {children}
        </main>

        <Footer />
      </div>
    // {/* </html> */}
  );
}
