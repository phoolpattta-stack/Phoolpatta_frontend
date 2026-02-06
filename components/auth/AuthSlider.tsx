"use client";

import { X } from "lucide-react";
import Portal from "@/components/common/Portal";
import LoginForm from "@/modules/auth/components/LoginForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AuthSlider({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <Portal>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-[9999]"
        onClick={onClose}
      />

      {/* Slider */}
      <div
        className="
          fixed right-0 top-0 h-full w-full sm:w-[420px]
          bg-white z-[10000]
          shadow-2xl
          animate-slide-in
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b ">
          <h3 className="font-semibold text-lg">Login</h3>
          <button
            className="hover:cursor-pointer"
            onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto">
          <LoginForm onSuccess={onClose} />
        </div>
      </div>
    </Portal>
  );
}
