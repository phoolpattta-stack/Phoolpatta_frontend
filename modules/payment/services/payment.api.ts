// not fully completed


// import api from "@/lib/axios";

// export const createPayment = (data: any) =>
//   api.post("/api/payment", data);





// import api from "@/lib/axios";

// /* ===============================
//    RAZORPAY PAYMENT FLOW
// ================================ */

// /**
//  * Step 1: Create Razorpay Order
//  * Backend: POST /api/payment/create-order
//  */
// export const createRazorpayOrder = (data: {
//   address: any;
//   couponCode?: string;
// }) => {
//   return api.post("/api/payment/create-order", data);
// };

// /**
//  * Step 2: Verify Razorpay Payment
//  * Backend: POST /api/payment/verify
//  */
// export const verifyRazorpayPayment = (data: {
//   razorpay_order_id: string;
//   razorpay_payment_id: string;
//   razorpay_signature: string;
// }) => {
//   return api.post("/api/payment/verify", data);
// };

// /**
//  * Step 3: Create Order AFTER payment verified
//  * Backend: POST /api/orders/create
//  */
// export const createOnlineOrder = (data: {
//   checkoutSummary: any;
//   razorpay_order_id: string;
//   razorpay_payment_id: string;
// }) => {
//   return api.post("/api/orders/create", data);
// };

// /* ===============================
//    CASH ON DELIVERY (COD)
// ================================ */

// /**
//  * Create COD Order
//  * Backend: POST /api/orders/create-cod
//  */
// export const createCodOrder = (checkoutSummary: any) => {
//   return api.post("/api/orders/create-cod", {
//     checkoutSummary,
//   });
// };
import api from "@/lib/axios";

/* ===============================
   RAZORPAY PAYMENT FLOW
================================ */

/**
 * Step 1: Create Razorpay Order
 * POST /api/payment/create-order
 * 
 * Backend will:
 * - Fetch user's current cart
 * - Apply coupon if provided
 * - Create Razorpay order
 * - Return razorpayOrderId + checkoutSummary
 */
export const createRazorpayOrder = (data: {
  address: any;
  couponCode?: string;
}) => {
  return api.post("/api/payment/create-order", data);
};

/**
 * Step 2: Verify Razorpay Payment
 * POST /api/payment/verify
 * 
 * This verifies the payment signature from Razorpay
 */
export const verifyRazorpayPayment = (data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  return api.post("/api/payment/verify", data);
};

/**
 * Step 3: Create Order AFTER payment verified
 * POST /api/orders/create
 * 
 * Creates the order in database after successful payment
 * Backend expects the full checkoutSummary from step 1
 */
// export const createOnlineOrder = (data: {
//   checkoutSummary: any;
//   razorpay_order_id: string;
//   razorpay_payment_id: string;
// }) => {
//   return api.post("/api/orders/create", data);
// };

export const createOnlineOrder = (data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
}) => {
  return api.post("/api/orders/create", {
    razorpay_order_id: data.razorpay_order_id,
    razorpay_payment_id: data.razorpay_payment_id,
  });
};

/* ===============================
   CASH ON DELIVERY (COD)
================================ */

/**
 * Create COD Order
 * POST /api/orders/create-cod
 * 
 * Backend expects:
 * - Full checkoutSummary object (with items, address, amounts)
 * 
 * Backend will:
 * - Create order immediately
 * - Clear user's cart
 * - Reduce stock
 * - Set paymentStatus: PENDING, paymentMethod: COD
 */
// export const createCodOrder = (data: {
//   address: any;
//   checkoutSummary: any;
//   couponCode?: string;
// }) => {
//   return api.post("/api/orders/create-cod", data);
// };

export const createCodOrder = (data: {
  checkoutSummary: {
    items: any[];
    subtotal: number;
    discount: number;
    finalAmount: number;
    deliveryAddress: any;
    couponCode?: string;
  };
}) => {
  return api.post("/api/orders/create-cod", data);
};
