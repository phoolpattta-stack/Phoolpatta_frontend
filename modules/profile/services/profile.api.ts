import api from "@/lib/axios";

/* ================= GET PROFILE ================= */
export const getUserProfile = async () => {
  const res = await api.get("/api/users/profile");
  return res.data;
};

/* ================= UPDATE PROFILE ================= */
export const updateUserProfile = async (payload: {
  name?: string;
  phone?: string;
  address?: string;
  gender?: string;
}) => {
  const res = await api.put("/api/users/profile", payload);
  return res.data;
};
