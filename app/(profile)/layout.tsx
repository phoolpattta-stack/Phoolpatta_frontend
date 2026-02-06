"use client";

import Header from "@/components/layout/Header";
import { ReactNode } from "react";

export default function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      
      {/* Header should NOT be wrapped */}
      <Header />

      {/* Page content container */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

    </div>
  );
}
