/* ===============================
   PHONE VALIDATION (SIMPLE)
================================ */

/**
 * Remove everything except digits
 * Limit to 10 characters
 */
export const sanitizePhone = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 10);
};

/**
 * Exactly 10 digits
 * Nothing else
 */
export const isValidPhone = (phone: string): boolean => {
  return /^\d{10}$/.test(phone);
};

/**
 * Convert to backend-safe format
 */
export const toE164Phone = (phone: string): string => {
  return `+91${phone}`;
};
