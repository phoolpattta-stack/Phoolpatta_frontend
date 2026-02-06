"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getCart } from "@/modules/cart/services/cart.api";

type CartContextType = {
  cartCount: number;
  refreshCart: () => Promise<void>;
  animateCart: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartCount, setCartCount] = useState(0);
  const [animateCart, setAnimateCart] = useState(false);

  const prevCountRef = useRef(0);

  const refreshCart = async () => {
    try {
      const res = await getCart();
      const items = res.data?.items || [];

      const count = items.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      );

      // 🔔 Trigger animation ONLY when cart count increases
      if (count > prevCountRef.current) {
        setAnimateCart(true);

        setTimeout(() => {
          setAnimateCart(false);
        }, 300);
      }

      prevCountRef.current = count;
      setCartCount(count);
    } catch {
      setCartCount(0);
      prevCountRef.current = 0;
    }
  };

  // Load cart count once on app start
  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartCount, refreshCart, animateCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error(
      "useCartContext must be used inside CartProvider"
    );
  }
  return ctx;
};
