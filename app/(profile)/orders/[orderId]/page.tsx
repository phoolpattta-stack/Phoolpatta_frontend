"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderById, cancelOrder } from "@/modules/orders/services/order.api";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ToastMessage from "@/components/ui/ToastMessage";

/* ================= TYPES ================= */

type OrderItem = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
};

type Address = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

type Order = {
  _id: string;
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  finalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  deliveryAddress: Address;
  createdAt: string;
};
const ORDER_STATUS_LABELS: Record<string, string> = {
  OUT_FOR_DELIVERY: "Out for delivery 🚚",
  DELIVERED: "Delivered ✅",
  CANCELLED: "Cancelled ❌",
  PLACED: "Order Placed 🎉",
  CONFIRMED: "Confirmed 🥳",
};
type ToastState = {
  title: string;
  description?: string;
  type?: "success" | "error" | "cart";
} | null;

/* ================= PAGE ================= */

export default function OrderDetailPage() {
  const { orderId } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  /* ================= FETCH ORDER ================= */

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId as string);
        setOrder(data);
      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  /* ================= CANCEL ORDER ================= */

  const handleCancelOrder = async () => {
    if (!order) return;

    setCanceling(true);

    // ✅ Close modal immediately (UX fix)
    setShowCancelModal(false);

    // ✅ Optimistic UI update
    setOrder((prev) => (prev ? { ...prev, orderStatus: "CANCELLED" } : prev));

    try {
      await cancelOrder(order._id);

      // Optional: re-fetch to stay in sync
      const updated = await getOrderById(order._id);

      // ✅ SUCCESS TOAST (HERE)
      setToast({
        title: "Order cancelled",
        description: "Your order has been cancelled successfully",
        type: "success",
      });

      setOrder(updated);
    } catch (error: any) {
      // ❌ Rollback if cancel failed
      const fresh = await getOrderById(order._id);
      setOrder(fresh);

      // ❌ ERROR TOAST (NO alert, NO console)
      setToast({
        title: "Cancellation failed",
        description:
          error?.response?.data?.message ||
          "Failed to cancel order. Please try again.",
        type: "error",
      });
    } finally {
      setCanceling(false);
    }
  };

  /* ================= STATES ================= */

  if (loading) {
    return <div className="p-6 text-center">Loading order...</div>;
  }

  if (!order) {
    return <div className="p-6 text-center">Order not found</div>;
  }

  /* ================= UI ================= */

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* MAIN CARD */}
      <div
        className="bg-white rounded-2xl p-6 space-y-8
                  shadow-[0_8px_30px_rgba(236,72,153,0.12)]
                  border border-pink-200
                  transition-shadow duration-300
                  hover:shadow-[0_12px_45px_rgba(236,72,153,0.18)]"
      >
        {/* HEADER */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Order #{order._id}
            </h1>
            <p className="text-sm text-gray-500 mt-1 mb-2">
              Ordered on{" "}
              <span className="font-medium text-gray-700">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>

          {/* STATUS BADGE */}
          <span
            className="inline-flex items-center
    px-3 py-1.5 text-xs sm:text-sm
    font-semibold rounded-full
    text-pink-600 border border-pink-300
    self-start sm:self-auto
    whitespace-nowrap"
          >
            {ORDER_STATUS_LABELS[order.orderStatus] ?? order.orderStatus}
          </span>
        </div>

        <hr />

        {/* ITEMS */}
        <div>
          <h2 className="font-semibold mb-4">Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <p className="font-medium text-gray-800">₹{item.total}</p>
              </div>
            ))}
          </div>
        </div>

        <hr />

        {/* PRICE DETAILS */}
        <div>
          <h2 className="font-semibold mb-4">Price Details</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>

            {Number(order.discount) > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{order.discount}</span>
              </div>
            )}

            <div className="border-t pt-3 flex justify-between font-semibold text-base mb-2">
              <span>Total</span>
              <span>₹{order.finalAmount}</span>
            </div>
          </div>
        </div>

        <hr />

        {/* ADDRESS & PAYMENT */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-semibold mb-3 mt-2">Delivery Address</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>{order.deliveryAddress.fullName}</strong>
              <br />
              {order.deliveryAddress.street}
              <br />
              {order.deliveryAddress.city}, {order.deliveryAddress.state}
              <br />
              {order.deliveryAddress.pincode}, {order.deliveryAddress.country}
              <br />
              Phone: {order.deliveryAddress.phone}
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-3 mt-2">Payment Info</h2>
            <p className="text-sm">
              Method: <strong>{order.paymentMethod}</strong>
            </p>
            <p className="text-sm mt-1 ">
              Status: <strong>{order.paymentStatus}</strong>
            </p>
          </div>
        </div>

        {/* CANCEL SECTION */}
        {order.orderStatus === "PLACED" && (
          <div className="mt-20 p-5 bg-pink-50 border border-pink-200 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-pink-600">
                Changed your mind?
              </p>
              <p className="text-xs text-pink-500">
                You can cancel this order before it is out of delivery.
              </p>
            </div>

            <button
              onClick={() => setShowCancelModal(true)}
              className="px-5 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 hover:cursor-pointer"
            >
              Cancel Order
            </button>
          </div>
        )}
      </div>

      {/* CANCEL MODAL */}

      <ConfirmModal
        open={showCancelModal}
        title="Cancel this order?"
        message={
          <>
            Are you sure you want to cancel order Id #
            <span className="font-medium">{order._id}</span>?
          </>
        }
        loading={canceling}
        onConfirm={handleCancelOrder}
        onCancel={() => setShowCancelModal(false)}
      />
      {/* ================= TOAST ================= */}
      {toast && (
        <div className="fixed top-5 right-5 z-[10000]">
          <ToastMessage
            title={toast.title}
            description={toast.description}
            type={toast.type}
          />
        </div>
      )}
    </div>
  );
}
