"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/modules/auth/services/auth.api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthCard from "@/components/ui/AuthCard";

const ResetPasswordForm = () => {
  const router = useRouter();

  const [identifier, setIdentifier] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load identifier (email or phone) from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("resetIdentifier");
    if (!stored) {
      router.push("/forgot-password");
      return;
    }
    setIdentifier(stored);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!identifier) return;

    setLoading(true);

    try {
      await resetPassword({
        email: identifier, // backend accepts email OR phone
        otp,
        newPassword,
      });

      setSuccess("Password reset successful");

      // cleanup
      sessionStorage.removeItem("resetIdentifier");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Reset Password">
      <p className="text-sm text-gray-500 text-center mb-4">
        Enter the OTP sent to your email or phone and set a new password.
      </p>

      {error && (
        <p className="mb-3 text-sm text-red-600 text-center">{error}</p>
      )}

      {success && (
        <p className="mb-3 text-sm text-green-600 text-center">{success}</p>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </AuthCard>
  );
};

export default ResetPasswordForm;
