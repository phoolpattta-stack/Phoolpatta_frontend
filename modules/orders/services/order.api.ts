// import api from "@/lib/axios";

// export const getMyOrders = () => api.get("/api/orders");

// export const getOrderById = (id: string) =>
//   api.get(`/api/orders/${id}`);


import api from "@/lib/axios";

/* ================= CREATE COD ORDER ================= */
export const createCodOrder = async (checkoutSummary: any) => {
  const res = await api.post("/api/orders/create-cod", {
    checkoutSummary,
  });
  return res.data;
};


/* ================= MY ORDERS ================= */
export const getMyOrders = async () => {
  const res = await api.get("/api/orders/my");
  return res.data;
};

/* ================= TRACK SINGLE ORDER ================= */
export const getOrderById = async (orderId: string) => {
  const res = await api.get(`/api/orders/${orderId}`);
  return res.data;
};

/* ================= CANCEL ORDER ================= */
export const cancelOrder = async (orderId: string) => {
  const res = await api.post(`/api/orders/${orderId}/cancel`);
  return res.data;
};
