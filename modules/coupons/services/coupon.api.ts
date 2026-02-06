import api from "@/lib/axios";

export const applyCoupon = (code: string) =>
  api.post("/api/coupons/apply", { code });
