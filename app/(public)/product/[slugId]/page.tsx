"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/modules/products/services/product.api";
import {
  getProductReviews,
  addProductReview,
  updateProductReview,
  deleteProductReview,
} from "@/modules/products/services/product.api";

import { useAuthContext } from "@/context/AuthContext";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { addItemToCart } from "@/modules/cart/services/cart.api";
import { isDelhiDeliverable, getEstimatedDeliveryDate } from "@/utils/delivery";
import { WHATSAPP_PHONE_NUMBER } from "@/utils/constants";
import ToastMessage from "@/components/ui/ToastMessage";
import { toast } from "react-toastify/unstyled";
import { useCartContext } from "@/context/CartContext";
import { getCart } from "@/modules/cart/services/cart.api";

type Review = {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  rating: number;
  review: string;
  createdAt: string;
};

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number; // final price from backend
  discount?: number;
  images: string[];
  category: string;
  stock?: number;
  rating?: number;
  reviewCount?: number;
};

const ProductPage = () => {
  const { slugId } = useParams();
  const router = useRouter();
  const { isAuthenticated, user } = useAuthContext();

  /* ---------------- STATE ---------------- */
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const [pincode, setPincode] = useState("");
  const [pinMessage, setPinMessage] = useState("");
  const [isDeliverable, setIsDeliverable] = useState(false);

  const { refreshCart } = useCartContext();

  const [toastState, setToastState] = useState<{
    title: string;
    description?: string;
    type?: "success" | "error" | "cart";
  } | null>(null);

  // review states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [submittingReview, setSubmittingReview] = useState(false);

  // review helper function
  const getReviewUserId = (review: Review): string | null => {
    if (!review.userId) return null;

    if (typeof review.userId === "string") {
      return review.userId;
    }

    return review.userId._id;
  };
  // reviews fetch function

  const fetchReviews = async () => {
  if (!product?._id) return;

  try {
    const res = await getProductReviews(product._id);
    setReviews(res.data);
  } catch {
    // optional error handling
  }
};

  // pincode fetch

  useEffect(() => {
    const savedPincode = localStorage.getItem("deliveryPincode");

    if (!savedPincode) return;

    setPincode(savedPincode);

    if (isDelhiDeliverable(savedPincode)) {
      const deliveryDate = getEstimatedDeliveryDate();
      setPinMessage(`✔ Delivery available by ${deliveryDate}`);
      setIsDeliverable(true);
    } else {
      setPinMessage("❌ Sorry, delivery is available only in Delhi");
      setIsDeliverable(false);
    }
  }, []);

  useEffect(() => {
    if (!toastState) return;
    const t = setTimeout(() => setToastState(null), 2000);
    return () => clearTimeout(t);
  }, [toastState]);

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    if (!slugId) return;

    const productId = slugId.toString().split("-").pop();
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getProductById(productId);
       

        setProduct(res.data);
        setSelectedImage(res.data.images?.[0]);
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slugId]);

  /* ---------------- HANDLERS ---------------- */

  const finalPrice = product?.price;

  const originalPrice =
    product?.discount && product.discount > 0
      ? Math.round(product.price / (1 - product.discount / 100))
      : null;

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (!product?.stock) return;

    if (type === "inc" && quantity < product.stock) {
      setQuantity((q) => q + 1);
    }

    if (type === "dec" && quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  // reviews fetch
  // useEffect(() => {
  //   if (!product?._id) return;

  //   const fetchReviews = async () => {
  //     try {
  //       const res = await getProductReviews(product._id);
  //       setReviews(res.data);
  //     } catch (err) {}
  //   };

  //   fetchReviews();
  // }, [product?._id]);

  useEffect(() => {
  fetchReviews();
}, [product?._id]);


  // cart handler

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!product) return;

    try {
      await addItemToCart({
        productId: product._id,
        quantity,
      });
      // cart context update later
      await refreshCart();

      // toast(
      //   <ToastMessage
      //     type="cart"
      //     title="Added to cart"
      //     description="Your flowers are safe in your cart 🌸"
      //   />,
      //   {
      //     closeButton: false,
      //     autoClose: 2000,
      //   },
      // );

      setToastState({
        type: "cart",
        title: "Added to cart",
        description: "Your flowers are safe in your cart 🌸",
      });

      // later: show toast / update cart badge
    } catch (error) {}
  };

  //  buy now handler

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!product) return;

    if (product.stock !== undefined && quantity > product.stock) {
      setToastState({
        title: "Limited stock",
        description: `Only ${product.stock} item(s) available`,
        type: "error",
      });

      return;
    }

    // if same product already in cart, then directly go to cartno add item again
    try {
      await addItemToCart({
        productId: product._id,
        quantity,
      });

      router.push("/cart");
    } catch (err: any) {}
  };

  // Pincode check handler

  const handlePincodeCheck = () => {
    // Invalid format → show message, but DO NOT hard block
    if (!/^\d{6}$/.test(pincode)) {
      setPinMessage("Enter a valid 6-digit pincode");
      setIsDeliverable(true); // keep Buy Now enabled
      return;
    }

    // Save pincode once user explicitly checks
    localStorage.setItem("deliveryPincode", pincode);

    // Delhi check
    if (isDelhiDeliverable(pincode)) {
      const deliveryDate = getEstimatedDeliveryDate();
      setPinMessage(`✔ Delivery available by ${deliveryDate}`);
      setIsDeliverable(true);
    } else {
      setPinMessage("❌ Sorry, delivery is available only in Delhi");
      setIsDeliverable(false); // explicit NOT deliverable
    }
  };

  /* ---------------- UI STATES ---------------- */

  if (loading) return <p className="p-6">Loading product…</p>;
  if (error || !product)
    return <p className="p-6 text-red-500">{error || "Product not found"}</p>;

  // whatsapp message (template)
  const whatsappMessage = encodeURIComponent(
    `Hi, I want to order this product:\n\n` +
      `🪷 Product: ${product?.name}\n` +
      `💰 Price: ₹${finalPrice}\n` +
      `📦 Quantity: ${quantity}\n` +
      `📍 Delivery Pincode: ${pincode || "Not provided"}\n` +
      `🖼️ Product Image: ${product?.images?.[0]}\n` +
      `🔗 Product Link: ${typeof window !== "undefined" ? window.location.href : ""}\n\n` +
      `Please let me know the next steps.`,
  );

  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <span key={`full-${i}`}>⭐</span>
        ))}

        {hasHalfStar && <span>⭐</span>}

        {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map(
          (_, i) => (
            <span key={`empty-${i}`} className="text-gray-300">
              ☆
            </span>
          ),
        )}
      </div>
    );
  };

  // review states
//   const handleSubmitReview = async () => {
//     if (!product || !reviewText.trim()) return;

//     try {
//       setSubmittingReview(true);

//       if (editingReviewId) {
//         await updateProductReview(editingReviewId, {
//           rating: reviewRating,
//           review: reviewText,
//         });

//         setReviews((prev) =>
//           prev.map((r) =>
//             r._id === editingReviewId
//               ? { ...r, rating: reviewRating, review: reviewText }
//               : r,
//           ),
//         );
//       } else {
//         // const res = await addProductReview({
//         //   productId: product._id,
//         //   rating: reviewRating,
//         //   review: reviewText,
//         // });

//         // // 🔥 FIX: ensure only review object is inserted
//         // const newReview = res.data?.data || res.data;
//         // // setReviews((prev) => [res.data, ...prev]);
//         // setReviews((prev) => [newReview, ...prev]);
//         const res = await addProductReview({
//           productId: product._id,
//           rating: reviewRating,
//           review: reviewText,
//         });

//         const rawReview = res.data?.data || res.data;

// const normalizedReview: Review = {
//   _id: rawReview._id,
//   rating: rawReview.rating,
//   review: rawReview.review,

//   // ✅ guarantee date
//   createdAt: rawReview.createdAt || new Date().toISOString(),

//   // ✅ guarantee populated user
//   userId:
//     typeof rawReview.userId === "string"
//       ? {
//           _id: user!.id,
//           name: "You",
//         }
//       : rawReview.userId,
// };

// setReviews((prev) => [normalizedReview, ...prev]);

//       }

//       setReviewText("");
//       setReviewRating(5);
//       setEditingReviewId(null);
//     } catch (err: any) {
//       // Business rule failure (ex: not delivered) → silent
//       if (err?.response?.status === 403) {
//         return;
//       }

//       // Unexpected error only
//       setToastState({
//         title: "Unable to submit review",
//         description: "Please try again later",
//         type: "error",
//       });
//     } finally {
//       setSubmittingReview(false);
//     }
//   };
const handleSubmitReview = async () => {
  if (!product || !reviewText.trim()) return;

  try {
    setSubmittingReview(true);

    if (editingReviewId) {
      await updateProductReview(editingReviewId, {
        rating: reviewRating,
        review: reviewText,
      });
    } else {
      await addProductReview({
        productId: product._id,
        rating: reviewRating,
        review: reviewText,
      });
    }

    // reset form
    setReviewText("");
    setReviewRating(5);
    setEditingReviewId(null);

    // ✅ AUTO UPDATE UI (NO REFRESH)
    await fetchReviews();

  } catch (err: any) {
    
    
      setToastState({
        title: "Unable to submit review",
        description: "Please try again later",
        type: "error",
      });
    
  } finally {
    setSubmittingReview(false);
  }
};

  //  delete review handler
  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteProductReview(reviewId);
      // setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      await fetchReviews();

    } catch {
      toast.error("Unable to delete review");
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  /* ---------------- RENDER ---------------- */
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* ================= LEFT : IMAGE GALLERY ================= */}
      <div>
        <div className=" bg-white  p-4 flex rounded-xl items-center  overflow-hidden mb-4">
          <img
            src={selectedImage}
            alt={product.name}
            className="max-h-[420px] w-full  object-contain  "
          />
        </div>

        <div className="flex gap-3">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                selectedImage === img ? "border-pink-500" : "border-gray-200"
              }`}
              alt="thumb"
            />
          ))}
        </div>
      </div>

      {/* ================= RIGHT : PRODUCT INFO ================= */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>

        {/* RATING */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          {renderStars(averageRating)}

          {product.reviewCount && product.reviewCount > 0 ? (
            <>
              <span className="font-medium text-gray-700">
                {averageRating % 1 === 0
                  ? averageRating
                  : averageRating.toFixed(1)}
                /5
              </span>

              <span className="text-gray-400">·</span>

              <button
                onClick={() =>
                  document
                    .getElementById("reviews-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-pink-600 hover:underline"
              >
                {/* {product.reviewCount} Reviews */}
                {reviews.length} Reviews
              </button>
            </>
          ) : (
            <span className="text-gray-400">
              No reviews yet — be the first ✨
            </span>
          )}
        </div>

        <p className="text-gray-600 mb-4">{product.description}</p>

        {/* PRICE */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-pink-600">
            ₹{finalPrice}
          </span>

          {product.discount && originalPrice && (
            <>
              <span className="line-through text-gray-400">
                ₹{originalPrice}
              </span>
              <span className="text-green-600 font-medium">
                {product.discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* PINCODE CHECK */}
        <div className="mb-5">
          <div className="flex gap-2">
            <input
              value={pincode}
              // onChange={(e) => setPincode(e.target.value)}
              onChange={(e) => {
                setPincode(e.target.value);
                setPinMessage("");
                setIsDeliverable(true);
              }}
              placeholder="Enter delivery pincode"
              className="border px-3 py-2 rounded w-48"
            />
            <button
              onClick={handlePincodeCheck}
              className="px-4 hover:cursor-pointer py-2 border rounded hover:bg-gray-50"
            >
              Check
            </button>
          </div>
          {pinMessage && (
            <p className="text-sm mt-1 text-green-600">{pinMessage}</p>
          )}
        </div>

        {/* QUANTITY */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-medium">Quantity</span>

          <div className="flex items-center border rounded">
            <button
              onClick={() => handleQuantityChange("dec")}
              className="px-3 py-2 hover:cursor-pointer"
            >
              <Minus size={16} />
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("inc")}
              className="px-3 py-2 hover:cursor-pointer"
              disabled={
                product.stock !== undefined && quantity >= product.stock
              }
            >
              <Plus size={16} />
            </button>
          </div>

          {product.stock !== undefined && product.stock <= 0 && (
            <span className="text-red-500">Out of stock</span>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleAddToCart}
            className="flex-1 border hover:cursor-pointer border-pink-600 text-pink-600 py-3 rounded-xl hover:bg-pink-50 flex items-center justify-center gap-2 hover:cursor-pointer"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          <button
            disabled={!isDeliverable}
            onClick={handleBuyNow}
            className={`flex-1 py-3 rounded-xl text-white font-medium transition
              ${
                isDeliverable
                  ? "bg-pink-600 hover:bg-pink-700 cursor-pointer"
                  : "bg-pink-600 opacity-50 cursor-not-allowed"
              }
            `}
          >
            {isDeliverable ? "Buy Now" : "Delivery Not Available"}
          </button>
        </div>

        {/* WHATSAPP */}

        <a
          href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 w-full py-4 border border-pink-600 rounded-2xl
             bg-grey-50 text-green-400 font-semibold text-lg
             hover:bg-pink-50 transition shadow-md mb-4"
        >
          <img
            src="/icons/whatsapp-icon.svg"
            alt="WhatsApp"
            className="w-5 h-5 object-contain"
          />
          Order via WhatsApp →
        </a>

        {/* ================= REVIEWS ================= */}
        <div id="reviews-section" className="mt-12 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

          {/* WRITE / EDIT REVIEW */}
          {isAuthenticated && (
            <div className="border rounded-xl p-4 mb-6 bg-">
              <p className="font-medium mb-2">
                {editingReviewId ? "Edit your review" : "Write a review"}
              </p>

              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="border rounded px-2 py-1 mb-2"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} ★
                  </option>
                ))}
              </select>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience..."
                className="w-full border rounded p-3 mt-2"
              />

              <button
                onClick={handleSubmitReview}
                disabled={submittingReview}
                className="mt-3 px-4 py-2 bg-pink-600 text-white rounded-md"
              >
                {submittingReview
                  ? "Submitting..."
                  : editingReviewId
                    ? "Update Review"
                    : "Submit Review"}
              </button>
            </div>
          )}

          {/* REVIEW LIST */}
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No reviews yet. Be the first 🌸
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r._id } className="border rounded-xl p-4 bg-white">
                  <div className="flex justify-between items-start">
                    
                    <div>
                      {/* <p className="font-medium">{r.user.name}</p> */}
                      {/* <p className="text-sm">{"★".repeat(r.rating)}</p> */}
                      <p className="font-medium text-gray-800">
                        {r.userId?.name || "Anonymous"}
                      </p>

                      <p className="text-sm text-yellow-500 tracking-wide">
                        {"★".repeat(Number(r.rating))}
                      </p>
                    </div>

                    {/* EDIT / DELETE (OWN REVIEW ONLY) */}
                    {isAuthenticated && user?.id === getReviewUserId(r) && (
                      <div className="flex gap-2 text-sm">
                        <button
                          onClick={() => {
                            setEditingReviewId(r._id);
                            setReviewText(r.review);
                            setReviewRating(r.rating);
                          }}
                          className="text-black-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(r._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mt-2">
                    {typeof r.review === "string" ? r.review : ""}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* ================= TOAST ================= */}
      {toastState && (
        <div className="fixed top-5 right-5 z-[10000]">
          <ToastMessage
            title={toastState.title}
            description={toastState.description}
            type={toastState.type}
          />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
