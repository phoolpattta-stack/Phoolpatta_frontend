"use client";

import { useEffect, useState } from "react";
import {
  getUserProfile,
  updateUserProfile,
} from "@/modules/profile/services/profile.api";
import { Pencil, Camera, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import UserAvatar from "@/components/ui/UserAvatar";

type Profile = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  gender?: string;
  createdAt?: string;
};

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    gender: "",
    createdAt: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // const memberSince = "Member since 2024"; // future: backend createdAt

  const formatMemberSince = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const memberSince = `Member since ${formatMemberSince(profile?.createdAt)}`;
  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      
      setProfile(data);
      setForm({
        name: data.name ?? "",
        phone: data.phone ?? "",
        address: data.address ?? "",
        gender: data.gender ?? "",
        createdAt: data.createdAt ?? "",
      });
    } catch (err) {
      // console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ================= SAVE PROFILE ================= */
  const handleSave = async () => {
    try {
      setSaving(true);
      await updateUserProfile(form);
      await fetchProfile();
      setEditMode(false);
      toast.success("Profile updated successfully 🌸");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ================= UI STATES ================= */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile…
      </div>
    );

  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Unable to load profile
      </div>
    );

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ================= PROFILE HEADER ================= */}
        <div className="relative mb-3 bg-white rounded-2xl shadow-sm border border-pink-100 p-6 mb-8 flex items-center gap-5">
          {/* AVATAR */}
          <div className="relative">
            {/* <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-2xl font-semibold shadow">
              
            </div> */}
            <UserAvatar
              name={profile.name}
              gender={
                (profile.gender as "MALE" | "FEMALE" | "OTHER") ?? "OTHER"
              }
              size={80}
            />

            {/* future avatar upload */}
            {/* <button
              title="Change avatar"
              className="absolute -bottom-1 -right-1 bg-white border rounded-full p-1 shadow hover:bg-gray-50"
            >
              <Camera size={14} />
            </button> */}
          </div>

          {/* INFO */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">
              {profile.name}
            </h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-xs text-grey-400 px-1 py-0.5  ">
                <ShieldCheck size={14} className="text-green-600" />
                Verified
              </span>

              <span className="text-xs text-gray-400"> {memberSince}</span>
            </div>
          </div>

          {/* EDIT ICON */}
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-50 text-pink-600 hover:cursor-pointer"
              title="Edit Profile"
            >
              <Pencil size={18} />
            </button>
          )}
        </div>

        {/* ================= DETAILS CARD ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 md:p-8">
          {/* EMAIL (READ ONLY) */}
          <div className="mb-6">
            <label className="text-xs font-medium text-gray-500">
              Email Address
            </label>
            <input
              value={profile.email}
              disabled
              className="mt-1 w-full rounded-lg border bg-gray-100 px-4 py-3 text-sm"
            />
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* NAME */}
            <div>
              <label className="text-xs font-medium text-gray-500">
                Full Name
              </label>
              <input
                value={form.name}
                disabled={!editMode}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm transition ${
                  editMode
                    ? "bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                    : "bg-gray-100"
                }`}
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="text-xs font-medium text-gray-500">
                Phone Number
              </label>
              <input
                value={form.phone?.replace("+91", "")}
                disabled={!editMode}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm transition ${
                  editMode
                    ? "bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                    : "bg-gray-100"
                }`}
              />
            </div>
    
            {/* GENDER */}
            <div>
              <label className="text-xs font-medium text-gray-500">
                Gender
              </label>
              <select
                value={form.gender}
                disabled={!editMode}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm transition ${
                  editMode
                    ? "bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                    : "bg-gray-100"
                }`}
              >
                <option value="">Select</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="mt-5">
            <label className="text-xs font-medium text-gray-500">Address</label>
            <textarea
              value={form.address}
              disabled={!editMode}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={3}
              className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm transition ${
                editMode
                  ? "bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                  : "bg-gray-100"
              }`}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3 mt-8">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="px-6 py-3 mt-4 rounded-xl bg-pink-600 text-white text-sm font-medium hover:bg-pink-700 hover:cursor-pointer transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 rounded-xl bg-grey-600 text-black border text-sm font-medium hover:bg-green-500 hover:cursor-pointer transition"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={() => setEditMode(false)}
                  className="px-6 py-3 rounded-xl border text-sm font-medium hover:cursor-pointer hover:bg-gray-50"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
