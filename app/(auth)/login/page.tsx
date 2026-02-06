"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/modules/auth/components/LoginForm";
import { useAuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
    const [secondsLeft, setSecondsLeft] = useState(10);

  // Optional: auto redirect after 2 seconds
  useEffect(() => {
    if (isAuthenticated) {

      // countdown timer
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

      const timer = setTimeout(() => {
        router.push("/");
      }, 10000);

      return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
    }
  }, [isAuthenticated, router]);

  // 🔐 Already logged in
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          You are already logged in ✅
        </h1>
         <p className="text-sm text-gray-500">
          Redirecting you to home in{" "}
          <span className="font-medium text-gray-700">
            {secondsLeft}s
          </span>
          …
        </p>
      </div>
    );
  }

  // 🔓 Not logged in → show login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm />
    </div>
  );
}
