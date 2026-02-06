"use client";

import { useEffect, useState } from "react";

export default function PaymentProcessingOverlay({
  status,
  onDone,
}: {
  status: "processing" | "success";
  onDone: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(5);

  // ⏱ countdown after success
  useEffect(() => {
    if (status !== "success") return;

    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    const timeout = setTimeout(onDone, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [status, onDone]);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="w-[90%] max-w-sm bg-white rounded-2xl p-6 text-center shadow-xl animate-fadeIn">
        {status === "processing" ? (
          <>
            <div className="mx-auto mb-4 h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
            <h2 className="text-lg font-semibold text-gray-800">
              Validating your payment…
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Please don’t press back or refresh this page.
            </p>
          </>
        ) : (
          <>
            <div className="text-green-600 text-4xl mb-3 animate-scaleIn">
              ✅
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Payment successful!
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to your order in{" "}
              <span className="font-medium text-gray-700">
                {secondsLeft}s
              </span>
              …
            </p>
          </>
        )}
      </div>
    </div>
  );
}
