
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendSignupOtp } from "@/modules/auth/services/auth.api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthCard from "@/components/ui/AuthCard";
import {  sanitizePhone,isValidPhone, toE164Phone } from "@/utils/validators";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";






export default function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "MALE" as "MALE" | "FEMALE" | "OTHER",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuthContext();
  const { isAuthenticated } = useAuthContext();
  const [secondsLeft, setSecondsLeft] = useState(10);



  // Optional: auto redirect after 10 seconds
 useEffect(() => {
    if (!isAuthenticated) return;

    // countdown timer
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    // redirect after countdown
    const timeout = setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isAuthenticated, router]);

// 🔐 Already logged in
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          You are already signed in ✅
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);
  //   setLoading(true);

  //   try {
  //     const payload = {
  //       ...formData,
  //       phone: formData.phone.startsWith("+")
  //         ? formData.phone
  //         : `+91${formData.phone}`,
  //     };

  //     await sendSignupOtp(payload);

  //     sessionStorage.setItem("signupData", JSON.stringify(payload));
  //     router.push("/signup/verify-otp");
  //   } catch (err: any) {
  //     setError(err?.response?.data?.message || "Signup failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  // 1️⃣ Sanitize phone (digits only)
  const cleanedPhone = sanitizePhone(formData.phone);

  // 2️⃣ Validate phone (exactly 10 digits)
  if (!isValidPhone(cleanedPhone)) {
    setError("Phone number must be exactly 10 digits");
    setLoading(false);
    return;
  }

  try {
    // 3️⃣ Build safe payload
    const payload = {
      ...formData,
      phone: toE164Phone(cleanedPhone),
    };

    await sendSignupOtp(payload);

    sessionStorage.setItem("signupData", JSON.stringify(payload));
    router.push("/signup/verify-otp");
  } catch (err: any) {
    setError(err?.response?.data?.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <AuthCard title="Create your PhoolPatta account">
      {error && (
        <p className="mb-3 text-sm text-red-600 text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleChange}
          required
          name="name"
        />

        <Input
          placeholder="10 Digits Phone Number *"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value, // allow anything
            })
          }
          required
          name="phone"
        />

        <Input
          placeholder="Email *"
          value={formData.email}
          onChange={handleChange}
          required
          name="email"
        />

        <Input
          placeholder="Address (optional)"
          value={formData.address}
          onChange={handleChange}
          name="address"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded focus:ring-2 focus:ring-pink-500"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <Input
          type="password"
          placeholder="Password *"
          value={formData.password}
          onChange={handleChange}
          required
          name="password"
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </form>
    </AuthCard>
  );
}
