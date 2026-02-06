/* -------------------------------------------------
   DELIVERY CONFIG
-------------------------------------------------- */

// Only Delhi pincodes are serviceable
// Delhi pincodes usually start from 110xxx
const DELHI_PINCODE_REGEX = /^110\d{3}$/;




/* -------------------------------------------------
   CHECK IF PINCODE IS DELIVERABLE
-------------------------------------------------- */

export const isDelhiDeliverable = (pincode: string): boolean => {
  if (!pincode) return false;
  return DELHI_PINCODE_REGEX.test(pincode);
};


/* -------------------------------------------------
   ESTIMATED DELIVERY DATE
-------------------------------------------------- */

export const getEstimatedDeliveryDate = (): string => {
  const now = new Date();
  const hour = now.getHours();

  // Business rule:
  // Order before 2 PM → same day delivery
  // Order after 2 PM → next day delivery
  const deliveryDate = new Date(now);

  if (hour >= 14) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  }

  return deliveryDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};


/* -------------------------------------------------
   DELIVERY CHARGE CALCULATOR
-------------------------------------------------- */

// export const getDeliveryCharge = (orderTotal: number): number => {
//   if (orderTotal >= FREE_DELIVERY_MIN_ORDER) {
//     return 0;
//   }
//   return DELIVERY_CHARGE;
// };
