"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CustomTripProvider } from "@/context/CustomTripContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CustomTripProvider>{children}</CustomTripProvider>
      </CartProvider>
    </AuthProvider>
  );
}
