// import api from "@/lib/axios";

// export const checkoutOrder = (data: {
//   addressId: string;
//   paymentMethod: string;
// }) => api.post("/api/checkout", data);




import api from "@/lib/axios";

/**
 * Get Checkout Summary
 * POST /api/checkout/summary
 * 
 * This is MANDATORY before any payment
 * 
 * Backend will:
 * - Fetch user's current cart from database
 * - Validate address
 * - Apply coupon if provided
 * - Calculate subtotal, discount, finalAmount
 * - Return complete checkout summary
 * 
 * Frontend must ONLY display backend values
 * NO frontend price calculation allowed
 */
export const getCheckoutSummary = async (payload: {
  address: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  couponCode?: string;
}) => {
  const res = await api.post("/api/checkout/summary", payload);
  return res.data.summary;
};