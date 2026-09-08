"use client";

import { AuthSessionProvider } from "@/components/AuthSessionProvider";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CustomTripProvider } from "@/context/CustomTripContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthSessionProvider>
      <AuthProvider>
        <CartProvider>
          <CustomTripProvider>{children}</CustomTripProvider>
        </CartProvider>
      </AuthProvider>
    </AuthSessionProvider>
  );
}
