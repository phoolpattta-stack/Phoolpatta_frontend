

"use client";



import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "@/modules/cart/services/cart.api";
import { Minus, Plus, Trash, TrendingDown } from "lucide-react";
import {
  DELIVERY_CHARGE,
  FREE_DELIVERY_MIN_AMOUNT,
  
} from "@/utils/pricing";
import ConfirmModal from "@/components/ui/ConfirmModal";

import { useCartContext } from "@/context/CartContext";


type CartItem = {
  productId: {
    _id: string;
    name: string;
    price: number; // FINAL price from backend
    discount?: number; // %
    images: string[];
    stock: number;
  };
  quantity: number;
  priceSnapshot: number;
};

const CartPage = () => {
  const router = useRouter();

  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);

  const { refreshCart } = useCartContext();


  /* ---------------- PRICE HELPERS ---------------- */
  const getMRP = (finalPrice: number, discount = 0) =>
    discount > 0
      ? Math.round(finalPrice / (1 - discount / 100))
      : finalPrice;

  const getDiscountAmount = (finalPrice: number, discount = 0) =>
    getMRP(finalPrice, discount) - finalPrice;

  /* ---------------- FETCH CART ---------------- */
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart();

      const map = new Map<string, CartItem>();
      (res.data.items || []).forEach((item: CartItem) => {
        const id = item.productId._id;
        if (map.has(id)) {
          const existing = map.get(id)!;
          map.set(id, {
            ...existing,
            quantity: existing.quantity + item.quantity,
          });
        } else {
          map.set(id, item);
        }
      });

      const mergedItems = Array.from(map.values());
      setItems(mergedItems);

      const newTotal = mergedItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );

      setTotal(newTotal);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  /* ---------------- UPDATE QUANTITY ---------------- */
  const handleQuantityChange = async (
    productId: string,
    newQty: number,
    stock: number
  ) => {
    if (newQty < 1 || newQty > stock) return;

    let oldQty = 1;
    let unitPrice = 0;

    setItems((prev) =>
      prev.map((item) => {
        if (item.productId._id === productId) {
          oldQty = item.quantity;
          unitPrice = item.productId.price;
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );

    setTotal((prev) => prev + (newQty - oldQty) * unitPrice);

    try {
      await updateCartItem({ productId, quantity: newQty });
      await refreshCart();
    } catch {
      fetchCart();
      await refreshCart();
    }
  };

  /* ---------------- REMOVE ITEM ---------------- */
  const handleRemove = async (productId: string) => {
    
    const removed = items.find(
      (item) => item.productId._id === productId
    );
    if (!removed) return;

    setItems((prev) =>
      prev.filter((item) => item.productId._id !== productId)
    );

    setTotal(
      (prev) =>
        prev - removed.quantity * removed.productId.price
    );

    try {
      await removeCartItem(productId);
      await refreshCart();
    } catch {
      fetchCart();
      await refreshCart();
    }
  };
  const confirmRemoveItem = async () => {
  if (!itemToRemove) return;

  const productId = itemToRemove.productId._id;

  setItems((prev) =>
    prev.filter((item) => item.productId._id !== productId)
  );

  setTotal(
    (prev) =>
      prev - itemToRemove.quantity * itemToRemove.productId.price
  );

  setShowRemoveModal(false);
  setItemToRemove(null);

  try {
    await removeCartItem(productId);
  } catch {
    fetchCart();
  }
};


  /* ---------------- PRICE SUMMARY ---------------- */
  const totalMRP = items.reduce(
    (sum, item) =>
      sum +
      getMRP(
        item.productId.price,
        item.productId.discount || 0
      ) *
        item.quantity,
    0
  );

  const productDiscount = totalMRP - total;

  const isFreeDelivery = total >= FREE_DELIVERY_MIN_AMOUNT;
  const deliveryFee = isFreeDelivery ? 0 : DELIVERY_CHARGE;
  const estimatedTotal = total + deliveryFee ;

  /* ---------------- UI STATES ---------------- */
  if (loading) return <p className="p-6">Loading your cart…</p>;

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-2">
          Your cart is empty
        </h2>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-xl hover:cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  /* ---------------- RENDER ---------------- */
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT – CART ITEMS */}
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => {
          const mrp = getMRP(
            item.productId.price,
            item.productId.discount || 0
          );

          return (
            <div
              key={item.productId._id}
              className="flex gap-5 rounded-lg p-5 bg-white shadow-md border border-pink-100 hover:shadow-lg transition"
            >
              <img
                src={item.productId.images[0]}
                alt={item.productId.name}
                onClick={() =>
                  router.push(`/product/${item.productId._id}`)
                }
                className="w-24 h-24 object-cover rounded-xl border border-pink-100 hover:cursor-pointer"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 leading-snug">
                  {item.productId.name}
                </h3>

                {/* PRICE */}
                <div className="mt-1 flex items-center gap-2">
                  {item.productId.discount ? (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{mrp}
                      </span>

                      <span className="text-pink-600 font-semibold">
                        ₹{item.productId.price}
                      </span>

                      <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <TrendingDown size={14} />
                        {item.productId.discount}% OFF
                      </span>
                      
                    </>
                  ) : (
                    <span className="text-pink-600 font-semibold">
                      ₹{item.productId.price}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.productId._id,
                        item.quantity - 1,
                        item.productId.stock
                      )
                    }
                    className="border px-2 py-1 rounded hover:cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.productId._id,
                        item.quantity + 1,
                        item.productId.stock
                      )
                    }
                    className="border px-2 py-1 rounded hover:cursor-pointer"
                    disabled={
                      item.quantity >= item.productId.stock
                    }
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* REMOVE ITEM MODAL */}
              <button
                  onClick={() => {
                    setItemToRemove(item);
                    setShowRemoveModal(true);
                  }}
                  className="text-gray-400 hover:text-red-500 transition hover:cursor-pointer"
                >
                <Trash size={18} />
              </button>

            </div>
          );
        })}
      </div>

      {/* RIGHT – PRICE SUMMARY */}
      <div className="rounded-lg p-6 bg-white hover:shadow-lg transition shadow-sm border border-pink-100 sticky top-24 h-fit ">
        <h2 className="text-lg font-semibold mb-5">
          Price Summary
        </h2>

        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Total MRP</span>
          <span>₹{totalMRP}</span>
        </div>

        <div className="flex justify-between text-sm mb-3 text-green-600">
          <span>Product Discount</span>
          <span>-₹{productDiscount}</span>
        </div>

        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{total}</span>
        </div>

        <div className="flex justify-between text-sm mt-4">
          <span className="text-gray-600">
            Delivery Charges
          </span>
          {isFreeDelivery ? (
            <span className="text-green-600 font-medium">
              FREE
            </span>
          ) : (
            <span className="font-medium">
              ₹{DELIVERY_CHARGE}
            </span>
          )}
        </div>

        {/* below msg for adding amount */}
        {!isFreeDelivery && (
          <p className="text-xs text-gray-500 mt-1">
            {/* Add ₹{FREE_DELIVERY_MIN_AMOUNT - total} more to get FREE delivery */}
            Add ₹{FREE_DELIVERY_MIN_AMOUNT - total} more for Free flower delivery 🌸

          </p>
        )}

        
        <div className="border-t my-5" />

        <div className="flex justify-between items-center mb-6">
          <span className="text-base font-semibold">
            Total (estimated)
          </span>
          <span className="text-2xl font-bold text-pink-700">
            ₹{estimatedTotal}
          </span>
        </div>

        <button
          onClick={() => router.push("/checkout")}
          className="w-full bg-pink-600 text-white py-3 text-xl rounded-lg text-sm font-medium hover:bg-pink-700 transition hover:cursor-pointer"
        >
          Proceed to Checkout
        </button>
      </div>
      {/* Confirm Modal for Remove Item */}
        <ConfirmModal
          open={showRemoveModal && !!itemToRemove}
          title="Remove item?"
          message={
            <>
              Are you sure you want to remove{" "}
              <span className="font-medium">
                {itemToRemove?.productId.name}
              </span>{" "}
              from your cart?
            </>
          }
          loading={false}
          onConfirm={confirmRemoveItem}
          onCancel={() => {
            setShowRemoveModal(false);
            setItemToRemove(null);
          }}
        />
    </div>
  );
};

export default CartPage;
