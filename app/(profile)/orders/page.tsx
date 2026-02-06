"use client";

import { useEffect, useState } from "react";
import { getMyOrders, cancelOrder } from "@/modules/orders/services/order.api";
import { useRouter } from "next/navigation";
import ToastMessage from "@/components/ui/ToastMessage";
import { HelpCircle, Mail } from "lucide-react";
import { WHATSAPP_PHONE_NUMBER } from "@/utils/constants";

/* ================= TYPES ================= */

type OrderItem = {
  _id: string;
  name: string;
  productId: string;
  quantity: number;
  price: number;
  total: number;
};

type Order = {
  _id: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  finalAmount: number;
  createdAt: string;
  items: OrderItem[];
};

type ToastState = {
  title: string;
  description?: string;
  type?: "success" | "error" | "cart";
} | null;

/* ================= PAGE ================= */

export default function MyOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  const [toast, setToast] = useState<ToastState>(null);

  const [showHelp, setShowHelp] = useState(false);

  /*==================Toast Message================== */
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [toast]);

  /* ================= FETCH ORDERS ================= */

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders();
      setOrders(data);
    } catch (err: any) {
      setToast({
        title: "Failed to load orders",
        description:
          err?.response?.data?.message || "Unable to fetch your orders",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= CONFIRM CANCEL ================= */

  const confirmCancelOrder = async () => {
    if (!orderToCancel) return;

    const orderId = orderToCancel._id;

    // ✅ Close modal immediately (UX fix)
    setShowCancelModal(false);
    setOrderToCancel(null);

    // ✅ Optimistic UI update
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, orderStatus: "CANCELLED" } : o,
      ),
    );

    setCancelingId(orderId);

    try {
      await cancelOrder(orderId);
      setToast({
        title: "Order cancelled",
        description: "Your order has been cancelled successfully",
        type: "success",
      });
    } catch (err: any) {
      
      setToast({
        title: "Failed to cancel order",
        description:
          err?.response?.data?.message || "Unable to cancel your order",
        type: "error",
      });

      // ❌ Rollback on failure
      await fetchOrders();
    } finally {
      setCancelingId(null);
    }
  };

  /* ================= UI ================= */

  if (loading) return <div className="p-6">Loading orders...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="relative mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">My Orders</h1>

          <button
            onClick={() => setShowHelp((p) => !p)}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-full
                 border border-pink-300 text-gray-700
                 hover:bg-pink-50 hover:border-pink-400
                 transition shadow-sm hover:shadow-md
                 focus:outline-none hover:cursor-pointer"
          >
            <HelpCircle size={16} />
            Need Help?
          </button>
        </div>

        {showHelp && (
          <div
            className="absolute right-0 top-full mt-2 z-50 w-64 max-w-[90vw]
                 bg-white border border-pink-200
                 rounded-xl shadow-lg p-4"
          >
            <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>

            <p className="text-sm text-gray-600 mb-3">
              We’re here to help with your orders.
            </p>

            <div className="space-y-2 text-sm">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
                  "Hi PhoolPatta Team, I need help with my order.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 hover:underline"
              >
                💬 WhatsApp Support
              </a>

              <p className="flex items-center gap-2 text-gray-700">
                <Mail size={16} className="shrink-0" />
                <a
                  href="mailto:phoolpattta@gmail.com"
                  className="hover:text-pink-600 transition"
                >
                  phoolpattta@gmail.com
                </a>
              </p>

              <p className="text-gray-500 text-xs">⏰ 9 AM – 8 PM</p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const canCancel = ["PLACED", "CONFIRMED", "PROCESSING"].includes(
            order.orderStatus,
          );

          return (
            <div
              key={order._id}
              className="border border-pink-400 rounded-lg p-5 bg-gray-30 shadow-md hover:shadow-md transition cursor-pointer"
              onClick={() => router.push(`/orders/${order._id}`)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID: #{order._id.slice(-6)}
                  </p>

                  <p className="text-sm text-gray-500">
                    Ordered on{" "}
                    <span className="font-medium text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </p>

                  {/* ✅ PRODUCT NAMES */}
                  <div className="mt-2 space-y-1  border-l-2 border-pink-200 pl-3">
                    {order.items.map((item) => (
                      <p key={item._id} className="text-xl text-gray-700">
                        {item.name} × {item.quantity}
                      </p>
                    ))}
                  </div>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    order.orderStatus === "DELIVERED"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : order.orderStatus === "CANCELLED"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-pink-50 text-pink-700 border border-pink-200"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="ftext-lg font-semibold text-gray-900">
                    ₹{order.finalAmount}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.paymentMethod} · {order.paymentStatus}
                  </p>
                </div>

                {canCancel && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOrderToCancel(order);
                      setShowCancelModal(true);
                    }}
                    className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded hover:cursor-pointer hover:bg-red-50 focus:outline-none"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= MODAL ================= */}
      {showCancelModal && orderToCancel && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Cancel this order?</h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to cancel order Id #
              {orderToCancel._id.slice(-6)}?
            </p>

            <div className="flex justify-center gap-4">
              {/* ✅ YES BUTTON (NOW VISIBLE) */}

              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setOrderToCancel(null);
                }}
                className="px-5 py-2 rounded-lg border hover:cursor-pointer"
              >
                No
              </button>
              <button
                onClick={confirmCancelOrder}
                disabled={cancelingId === orderToCancel._id}
                className="px-5 py-2 rounded-lg border hover:cursor-pointer text-black "
              >
                {cancelingId === orderToCancel._id
                  ? "Cancelling..."
                  : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

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
