"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendForgotOtp } from "@/modules/auth/services/auth.api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthCard from "@/components/ui/AuthCard";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await sendForgotOtp({ emailOrPhone });

      // store identifier for reset-password step
      sessionStorage.setItem("resetIdentifier", emailOrPhone);

      setSuccess("OTP sent successfully");

      // redirect to reset password page
      setTimeout(() => {
        router.push("/reset-password");
      }, 800);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Forgot Password">
      <p className="text-sm text-gray-500 text-center mb-4">
        Enter your registered email or phone number. We’ll send you an OTP.
      </p>

      {error && (
        <p className="mb-3 text-sm text-red-600 text-center">{error}</p>
      )}

      {success && (
        <p className="mb-3 text-sm text-green-600 text-center">{success}</p>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Email or Phone"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </form>
    </AuthCard>
  );
};

export default ForgotPasswordForm;
