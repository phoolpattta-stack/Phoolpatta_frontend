// src/modules/auth/services/auth.api.ts
import api from "@/lib/axios";

/* ================= SIGNUP ================= */

export const sendSignupOtp = (data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  password: string;
}) => {
  return api.post("/api/auth/signup", data);
};

export const verifySignupOtp = (data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  password: string;
  otp: string;
}) => {
  return api.post("/api/auth/signup/verify", data);
};

/* ================= LOGIN ================= */

export const loginUser = (data: {
  emailOrPhone: string;
  password: string;
}) => {
  return api.post("/api/auth/login", data);
};

/* ================= GOOGLE ================= */

export const googleLogin = (token: string) => {
  return api.post("/api/auth/google", { token });
};

/* ================= FORGOT PASSWORD ================= */

export const sendForgotOtp = (data: {
  emailOrPhone: string;
}) => {
  return api.post("/api/auth/forgot-password", data);
};

export const resetPassword = (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  return api.post("/api/auth/reset-password", data);
};
