import { AdminShell } from "@/components/AdminShell";
import { RequireAdmin } from "@/components/RequireAdmin";
import type { ReactNode } from "react";

export default function DeskLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAdmin>
      <AdminShell>{children}</AdminShell>
    </RequireAdmin>
  );
}
