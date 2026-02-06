"use client";

import Link from "next/link";
import { useEffect } from "react";
import { WHATSAPP_PHONE_NUMBER } from "@/utils/constants";

export default function Error({
  
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error later to monitoring (Sentry, etc.)
    // console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-5">
        
        {/* ICON / EMOJI */}
        <div className="text-5xl">🌸</div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Oops! Something went wrong
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-sm">
          Don’t worry — it’s not you.  
          Something didn’t load correctly. Please try again.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <button
            onClick={reset}
            className="bg-pink-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-pink-700 transition"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="border border-pink-600 text-pink-600 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-pink-50 transition"
          >
            Go to Home
          </Link>
        </div>

        {/* SUPPORT LINE */}
        <p className="text-xs text-gray-400 mt-4">
          If the issue continues, you can order directly via WhatsApp.
        </p>

        <a
          href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-green-600 font-medium hover:underline"
        >
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
