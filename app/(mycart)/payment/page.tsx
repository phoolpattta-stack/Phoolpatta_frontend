
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

import {
  createCodOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
  createOnlineOrder,
} from "@/modules/payment/services/payment.api";
import { getCheckoutSummary } from "@/modules/checkout/services/checkout.api";

type SummaryItem = {
  productId: string;
  name: string;
  quantity: number;
  total: number;
};

type CheckoutSummary = {
  items: SummaryItem[];
  subtotal: number;
  discount: number;
  finalAmount: number;
  deliveryAddress: any;
};

const CHECKOUT_INPUT_KEY = "checkoutInput";


export default function PaymentPage() {
  const router = useRouter();

  const [summary, setSummary] = useState<CheckoutSummary | null>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<"COD" | "RAZORPAY">("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [couponCode, setCouponCode] = useState<string | undefined>();


  const [showOverlay, setShowOverlay] = useState(false);
const [overlayStatus, setOverlayStatus] = useState<"processing" | "success">(
  "processing"
);



  /* ---------------- LOAD SUMMARY ---------------- */
  useEffect(() => {
  const loadSummary = async () => {
    const raw = sessionStorage.getItem(CHECKOUT_INPUT_KEY);
    // console.log("Checkout Input Raw: by payment page ", raw);
    

    if (!raw) {
      // console.log("No checkout input found, redirecting to /checkout");
      router.replace("/checkout");
      return;
    }

    const { address, appliedCoupon } = JSON.parse(raw);

   if (
  !address.fullName ||
  !address.phone ||
  !address.pincode
) {
  
  sessionStorage.removeItem(CHECKOUT_INPUT_KEY);
  router.replace("/checkout");
  return;
}


    try {

      setCouponCode(appliedCoupon?.code); // ✅ STORE COUPON HERE
     

      const res = await getCheckoutSummary({
        address,
        couponCode: appliedCoupon?.code,
      });

      setSummary(res);
    } catch {
      
      router.replace("/checkout");
    }
  };

  loadSummary();
}, [router]);





  const handlePlaceOrder = async () => {
    
  if (!summary) return;

  try {
    setLoading(true);
    setError("");

    /* ================= COD ================= */
  //   // if (paymentMethod === "COD") {
  //   //   const res = await createCodOrder(summary);
  //   if (paymentMethod === "COD") {
  // const res = await createCodOrder({
  //   address: summary.deliveryAddress,
  //   // couponCode: summary.couponCode,
  // });


  //     sessionStorage.removeItem("checkoutSummary");

  //     router.push(
  //       `/order-success?orderId=${res.data.order._id}`
  //     );
  //     return;
  //   }

  if (paymentMethod === "COD") {
  const res = await createCodOrder({
    checkoutSummary: summary,
  });

  sessionStorage.removeItem(CHECKOUT_INPUT_KEY);

  router.push(`/order-success?orderId=${res.data.order._id}`);
  return;
}



    /* ================= RAZORPAY ================= */
    

    const rpOrder = await createRazorpayOrder({
      address: summary.deliveryAddress,
      // couponCode: summary.couponCode ?? undefined, // ✅ ADD THIS
      couponCode, // ✅ backend-validated coupon
       
    });

   

    const { razorpayOrderId, amount, currency } = rpOrder.data;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: amount, // paise
      currency,
      name: "PhoolPatta",
      description: "Order Payment",
      order_id: razorpayOrderId,

      handler: async (response: any) => {
        try {
          await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          const orderRes = await createOnlineOrder({
            // checkoutSummary: summary,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
          });

         // ✅ Clear checkout data after success
            sessionStorage.removeItem(CHECKOUT_INPUT_KEY);

          router.push(
            `/order-success?orderId=${orderRes.data.order._id}`
          );
        } catch {
          setError("Payment verification failed");
          setLoading(false);
        }
      },

      modal: {
        ondismiss: () => {
          setLoading(false);
        },
      },

      theme: {
        color: "#ec4899",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch (err: any) {
    setError(
      err?.response?.data?.message || "Failed to place order"
    );
    setLoading(false);
  }
};


  /* ---------------- UI STATES ---------------- */
  if (!summary) {
    return <p className="p-6">Loading payment details…</p>;
  }

  /* ---------------- RENDER ---------------- */
  return (
    
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* ================= LEFT : PAYMENT OPTIONS ================= */}
      <div className="bg-white p-6 rounded-2xl border border-pink-200 shadow-sm">
        <h2 className="text-lg font-semibold text-pink-600 mb-4">
          Choose Payment Method
        </h2>

        {/* COD */}
        
        <label
          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition
            ${
              paymentMethod === "COD"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-pink-300"
            }`}
        >
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
            className="mt-1 accent-pink-500"
          />
          <div>
            <p className="font-medium text-gray-800">
              Cash on Delivery
            </p>
            <p className="text-xs text-gray-500">
              Pay when your order is delivered
            </p>
          </div>
        </label>


        {/* RAZORPAY */}
        
        <label
          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition mt-4
            ${
              paymentMethod === "RAZORPAY"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-pink-300"
            }`}
        >
          <input
            type="radio"
            checked={paymentMethod === "RAZORPAY"}
            onChange={() => setPaymentMethod("RAZORPAY")}
            className="mt-1 accent-pink-500"
          />
          <div>
            <p className="font-medium text-gray-800">
              Online Payment
            </p>
            <p className="text-xs text-gray-500">
              UPI / Card / Net Banking
            </p>
          </div>
        </label>


        {error && (
          <p className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>

      {/* ================= RIGHT : ORDER SUMMARY ================= */}
      <div className="bg-white p-6 rounded-2xl border border-pink-200 shadow-sm">
        <h2 className="text-lg font-semibold text-pink-600 mb-4">
          Order Summary
        </h2>

        <div className="space-y-2 mb-4">
          {summary.items.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between text-sm"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.total}</span>
            </div>
          ))}
        </div>

          {/* COUPON DISCOUNT */}
          
          {Number(summary.discount) > 0 && (
            <div className="flex justify-between text-sm text-green-600 mb-2">
              <span>Coupon Discount</span>
              <span>- ₹{Number(summary.discount)}</span>
            </div>
          )}

          {/* total price */}
          <div className="border-t pt-3 flex justify-between font-semibold text-lg mb-3">
            <span>Total</span>
            <span className="text-pink-600 font-semibold text-lg">
              ₹{summary.finalAmount}
            </span>
          </div>

        <Button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full mt-6 shadow-sm hover:shadow-md transition"
        >
          {loading
            ? "Processing..."
            : `Place Order ₹${summary.finalAmount}`}
        </Button>

        <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
          <CheckCircle size={14} className="text-green-600" />
          100% Secure & Trusted Payments
        </div>
      </div>
    </div>
  );
}


