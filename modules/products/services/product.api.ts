import api from "@/lib/axios";

/* ================= PRODUCTS ================= */

/* GET ALL PRODUCTS */
export const getAllProducts = (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}) => api.get("/api/products", { params });


/* GET SINGLE PRODUCT */
export const getProductById = (id: string) =>
  api.get(`/api/products/${id}`);

/* ================= REVIEWS ================= */

/* GET PRODUCT REVIEWS (PUBLIC) */
export const getProductReviews = (productId: string) =>
  api.get(`/api/reviews/${productId}`);

/* ADD REVIEW (Purchased users only) */
export const addProductReview = (payload: {
  productId: string;
  rating: number;
  review: string;
  images?: string[];
}) =>
  api.post("/api/reviews", payload);

/* EDIT REVIEW */
export const updateProductReview = (
  reviewId: string,
  payload: {
    rating: number;
    review: string;
  }
) =>
  api.put(`/api/reviews/${reviewId}`, payload);

/* DELETE REVIEW */
export const deleteProductReview = (reviewId: string) =>
  api.delete(`/api/reviews/${reviewId}`);
