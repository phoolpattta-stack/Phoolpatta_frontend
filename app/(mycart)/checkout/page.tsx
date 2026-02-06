"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

import { getCart } from "@/modules/cart/services/cart.api";
import { getUserProfile } from "@/modules/profile/services/profile.api";
import { getCheckoutSummary } from "@/modules/checkout/services/checkout.api";

import {
  isDelhiDeliverable,
  getEstimatedDeliveryDate,
} from "@/utils/delivery";
import { getCityStateFromPincode } from "@/utils/pincode";

type Address = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};
const CHECKOUT_INPUT_KEY = "checkoutInput";


const CheckoutPage = () => {
  const router = useRouter();

  /* ---------------- STATE ---------------- */
  const [address, setAddress] = useState<Address>({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [summary, setSummary] = useState<any>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pinMessage, setPinMessage] = useState("");
  const [isDeliverable, setIsDeliverable] = useState(true);
  const [summaryLocked, setSummaryLocked] = useState(false);


  /* ---------------- BLOCK DIRECT CHECKOUT ---------------- */
  useEffect(() => {
  const checkCart = async () => {
    try {
      const res = await getCart(); // axios response
      const items = res.data?.items || [];

      if (items.length === 0) {
        router.replace("/cart");
      }
    } catch {
      router.replace("/cart");
    }
  };

  checkCart();
}, [router]);


  /* ---------------- LOAD USER PROFILE ---------------- */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await getUserProfile();
        setAddress((prev) => ({
          ...prev,
          fullName: user.name || "",
          phone: user.phone || "",
          street: user.address || "",
        }));
      } catch {
        // silent fail
      }
    };
    loadProfile();
  }, []);

  /* ---------------- AUTO SAVE ADDRESS TO SESSION ---------------- */
    useEffect(() => {
      const raw = sessionStorage.getItem(CHECKOUT_INPUT_KEY);
      const existing = raw ? JSON.parse(raw) : {};
  
      sessionStorage.setItem(
        CHECKOUT_INPUT_KEY,
        JSON.stringify({
          ...existing,
          address,
          appliedCoupon: existing.appliedCoupon ?? null,
          updatedAt: Date.now(),
        })
      );
    }, [address]);
  

  /* ---------------- PINCODE AUTO ---------------- */
  const handleAutoPincode = async (pincode: string) => {
    setAddress((prev) => ({ ...prev, pincode }));

    const location = await getCityStateFromPincode(pincode);
    if (location) {
      setAddress((prev) => ({
        ...prev,
        city: location.city,
        state: location.state,
      }));
    }

    if (isDelhiDeliverable(pincode)) {
      setPinMessage(`✔ Delivery by ${getEstimatedDeliveryDate()}`);
      setIsDeliverable(true);
    } else {
      setPinMessage("❌ Delivery available only in Delhi");
      setIsDeliverable(false);
    }
  };

  /* ---------------- LOAD SAVED PINCODE ---------------- */
  useEffect(() => {
    const savedPincode = localStorage.getItem("deliveryPincode");
    if (savedPincode) {
      handleAutoPincode(savedPincode);
    }
  }, []);

  /* ---------------- INPUT CHANGE ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  /* ---------------- PINCODE CHECK ---------------- */
  const handlePincodeCheck = async () => {
    if (!/^\d{6}$/.test(address.pincode)) {
      setPinMessage("Enter a valid 6-digit pincode");
      setIsDeliverable(false);
      return;
    }

    localStorage.setItem("deliveryPincode", address.pincode);
    await handleAutoPincode(address.pincode);
  };


   /* ---------------- FETCH SUMMARY (APPLY COUPON) ---------------- */
const fetchSummary = async () => {
  try {
    setCouponError("");
    setError("");

    const payload: any = { address };

    // ✅ Only send coupon if user actually entered one
    const appliedCoupon = couponCode.trim()
      ? { code: couponCode.trim() }
      : null;
      if (appliedCoupon) {
      payload.couponCode = appliedCoupon.code;
    }


    // if (couponCode.trim()) {
    //   payload.couponCode = couponCode.trim();
    // }

    const res = await getCheckoutSummary(payload);
    setSummary(res);
    setSummaryLocked(true);

    // Save to sessionStorage
     // ✅ ALWAYS save coupon (null or applied)
    sessionStorage.setItem(
      CHECKOUT_INPUT_KEY,
      JSON.stringify({
        address,
        appliedCoupon,
        updatedAt: Date.now(),
      })
    );


  } catch (err: any) {
    setCouponError(
      err?.response?.data?.message || "Invalid or expired coupon"
    );
  }
};

  
    /* ---------------- REMOVE COUPON ---------------- */
    const removeCoupon = () => {
      setCouponCode("");
      setSummary(null);
      setSummaryLocked(false);
  
      const raw = sessionStorage.getItem(CHECKOUT_INPUT_KEY);
      if (!raw) return;
  
      const parsed = JSON.parse(raw);
      parsed.appliedCoupon = null;
      parsed.updatedAt = Date.now();
  
      sessionStorage.setItem(
        CHECKOUT_INPUT_KEY,
        JSON.stringify(parsed)
      );
    };


    
  /* ---------------- PROCEED ---------------- */
  const handleCheckout = async () => {
    const phoneRegex = /^[6-9]\d{9}$/;

if (!phoneRegex.test(address.phone)) {
  setError("Enter a valid 10-digit mobile number");
  return;
}

    if (!address.fullName || !address.phone || !address.pincode||!address.street) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      // Ensure checkoutInput ALWAYS exists
      if (!summary) {
      await fetchSummary();
    }
      
      router.push("/payment");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* ================= LEFT : ADDRESS ================= */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-200">
        <h2 className="text-lg font-semibold text-pink-600 mb-4">
          Delivery Address
        </h2>

        {error && (
          <p className="mb-3 text-sm text-red-600">{error}</p>
        )}

        <div className="space-y-3">
          <input
            name="fullName"
            placeholder="Full Name *"
            className="w-full border  rounded-lg px-3 py-2
           focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={address.fullName}
            onChange={handleChange}
          />
          

          <input
            name="phone"
            placeholder="Mobile Number *"
            className="w-full border  rounded-lg px-3 py-2
           focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={address.phone}
            onChange={handleChange}
          />

          <textarea
            name="street"
            placeholder="Street Address *"
            className="w-full border  rounded-lg px-3 py-2
           focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={address.street}
            onChange={handleChange}
          />

          <input
            placeholder="City"
            value={address.city}
            readOnly
            className="w-full border  rounded-lg px-3 py-2
           focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            placeholder="State"
            value={address.state}
            readOnly
            className="w-full border  rounded-lg px-3 py-2
           focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <div className="flex gap-2">
            <input
              name="pincode"
              placeholder="Pincode *"
              value={address.pincode}
              className="w-full border  rounded-lg px-3 py-2
           focus:outline-none focus:ring-2 focus:ring-pink-500"
              onChange={(e) => {
                handleChange(e);
                setPinMessage("");
                setIsDeliverable(true);
              }}
            />

            <button
              type="button"
              onClick={handlePincodeCheck}
              className="px-4 rounded-lg border border-pink-500 text-pink-600
           hover:bg-pink-50 transition hover:cursor-pointer"
            >
              Check
            </button>
          </div>

          {pinMessage && (
            <p
              className={`text-sm ${
                isDeliverable
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {pinMessage}
            </p>
          )}
        </div>
      </div>

      {/* ================= RIGHT : SUMMARY ================= */}
      <div className="bg-white p-6 rounded-xl shadow-sm border h-fit border-pink-200">
  <h2 className="text-lg font-semibold text-pink-600 mb-4">
    Order Summary
  </h2>

  {/* COUPON */}
  <div className="mb-4">
    <label className="text-sm font-medium text-gray-700">
      Apply Coupon
    </label>

    <div className="flex gap-2 mt-1">
      <input
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Enter coupon code"
        className="w-full border rounded-lg px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <button
        type="button"
        onClick={() => {
          // 🔒 Prevent empty coupon API calls
          if (!couponCode.trim()) return;
          fetchSummary();
        }}
        className="px-4 rounded-lg border border-pink-500 text-pink-600
        hover:bg-pink-50 transition hover:cursor-pointer"
      >
        Apply
      </button>
    </div>

    {couponError && (
      <p className="text-sm text-red-600 mt-1">
        {couponError}
      </p>
    )}
  </div>

  {summary ? (
    <>
      <div className="space-y-2 mb-4">
        {summary.items.map((item: any) => (
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

      <div className="space-y-2 text-sm mb-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{summary.subtotal}</span>
        </div>

        {summary.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Coupon Discount</span>
            <span>- ₹{summary.discount}</span>
          </div>
        )}
      </div>

      <div className="border-t pt-3 flex justify-between font-semibold mb-3">
        <span>Total</span>
        <span className="text-pink-600 font-semibold">
          ₹{summary.finalAmount}
        </span>
      </div>
    </>
  ) : (
    <p className="text-sm text-gray-500 mb-4">
      Fill address to continue
    </p>
  )}

  <Button
    onClick={handleCheckout}
    disabled={loading || !isDeliverable}
    className="w-full mt-6"
  >
    {loading
      ? "Processing..."
      : summary
      ? `Pay ₹${summary.finalAmount}`
      : "Proceed to Payment"}
  </Button>
</div>

    </div>
  );
};

export default CheckoutPage;