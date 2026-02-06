"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function OrderSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-xl w-full bg-white border rounded-lg border-pink-200 shadow-md p-8 text-center relative overflow-hidden">

        {/* SUCCESS ICON */}
        <CheckCircle size={76} className="mx-auto text-green-600 mb-4 pt-2" />

        {/* TITLE */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Your flowers are on their way 🌸
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for choosing <b>PhoolPatta</b> 💐  
          <br />
          Your order has been placed successfully and we’re already
          preparing something beautiful just for you.
        </p>

        {/* ORDER ID */}
        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            Order ID: <span className="font-medium">{orderId}</span>
          </p>
        )}

        {/* NOTE */}
        <div className="px-4">
          <div className="bg-pink-50 border border-pink-200 rounded-xl p-2 mb-5 px-4 text-sm text-pink-700">
            🌷 <b>A little note from us:</b>
            <br />
            Flowers have a way of saying what words cannot.
            We hope this order brings a smile — to you and the one receiving it.
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5 px-4">
          <Button onClick={() => router.push("/")}>
            Continue Shopping
          </Button>

          <button
            onClick={() => router.push("/orders")}
            className="
              px-6 py-3 rounded-xl
              border border-pink-600
              text-pink-600 font-medium
              hover:bg-pink-50 transition
            "
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}
