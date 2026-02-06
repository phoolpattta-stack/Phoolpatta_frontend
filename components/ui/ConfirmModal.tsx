"use client";

import React from "react";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Yes, Confirm",
  cancelText = "No",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg text-center">
        
        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-center gap-4">
        {/* NO */}
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border hover:cursor-pointer"
          >
            {cancelText}
          </button>
          {/* YES */}
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 rounded-lg border hover:cursor-pointer text-black disabled:opacity-60"
          >
            {loading ? "Cancelling..." : confirmText}
          </button>

          
        </div>
      </div>
    </div>
  );
}
