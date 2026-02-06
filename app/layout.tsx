// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { AuthProvider } from "@/context/AuthContext";
// import Script from "next/script";
// import { ToastContainer } from "react-toastify/unstyled";
// import { CartProvider } from "@/context/CartContext";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "PhoolPatta - Online Flower Shop",
//   description: "Your one-stop shop for fresh flowers and bouquets.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body
//   suppressHydrationWarning
//   className={`${geistSans.variable} ${geistMono.variable} antialiased`}
// >

//         {/* Razorpay SDK – SAFE & OFFICIAL */}
//         <Script
//           src="https://checkout.razorpay.com/v1/checkout.js"
//           strategy="afterInteractive"
//         />

//         <AuthProvider>
//           <CartProvider>
//             {children}
//           </CartProvider>
//         </AuthProvider>

//         {/* Global toaster – ONLY ONCE */}
//         <ToastContainer
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar
//           closeOnClick
//           pauseOnHover
//           newestOnTop
//         />
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import { ToastContainer } from "react-toastify/unstyled";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

/* -------------------- Fonts -------------------- */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* -------------------- Global SEO Metadata -------------------- */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.phoolpatta.com"), // 🔴 change to your real domain

  title: {
    default: "PhoolPatta – Fresh Flowers Delivered with Love",
    template: "%s | PhoolPatta",
  },

  description:
    "Order fresh flowers, bouquets, and floral arrangements online from PhoolPatta. Same-day delivery, premium quality, perfect for every occasion.",

  keywords: [
    "online flower delivery",
    "buy flowers online",
    "fresh flowers",
    "flower shop online",
    "flowers for every occasion",
    "bouquet delivery",
    "PhoolPatta",
  ],

  authors: [{ name: "PhoolPatta" }],
  creator: "PhoolPatta",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "PhoolPatta – Fresh Flowers Delivered with Love",
    description:
      "Send fresh flowers to your loved ones with PhoolPatta. Fresh flowers and floral arrangements delivered with love by PhoolPatta.",
    url: "https://www.phoolpatta.com",
    siteName: "PhoolPatta",
    images: [
      {
        url: "/phoolpatta-og.png", // 🔴 image must exist in /public
        width: 1200,
        height: 630,
        alt: "PhoolPatta Online Flower Shop",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PhoolPatta – Fresh Flowers Delivered with Love",
    description:
      "Order fresh flowers online from PhoolPatta. Perfect for every occasion.",
    images: ["/phoolpatta-og.png"],
  },
};

/* -------------------- Root Layout -------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Razorpay SDK – Official & Safe */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {/* App Providers */}
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>

        {/* Global Toast (only once) */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          newestOnTop
        />
      </body>
    </html>
  );
}
