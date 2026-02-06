// import api from "@/lib/axios";

// export const getCart = () => api.get("/api/cart");

// export const addToCart = (data: {
//   productId: string;
//   quantity: number;
// }) => api.post("/api/cart", data);

// export const updateCartItem = (data: {
//   productId: string;
//   quantity: number;
// }) => api.put("/api/cart", data);

// export const removeFromCart = (productId: string) =>
//   api.delete(`/api/cart/${productId}`);


// import api from "@/lib/axios";

// /** Add item (or increase quantity if exists) */
// export const addItemToCart = (data: {
//   productId: string;
//   quantity: number;
// }) => api.post("/api/cart/add", data);

// /** Update quantity explicitly */
// export const updateCartItem = (data: {
//   productId: string;
//   quantity: number;
// }) => api.put("/api/cart/update", data);

// /** Fetch user cart */
// export const getCart = () => api.get("/api/cart");



import api from "@/lib/axios";

/** Add item (or increase quantity if exists) */
export const addItemToCart = (data: {
  productId: string;
  quantity: number;
}) => api.post("/api/cart/add", data);

/** Update quantity */
export const updateCartItem = (data: {
  productId: string;
  quantity: number;
}) => api.put("/api/cart/update", data);

/** Fetch cart */
export const getCart = () => api.get("/api/cart");

/** ✅ REMOVE ITEM */
export const removeCartItem = (productId: string) =>
  api.delete(`/api/cart/remove/${productId}`);
