"use client";

import { ConfirmModal } from "@/components/ConfirmModal";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type UnsavedChangesContextValue = {
  setDirty: (value: boolean) => void;
  clearDirty: () => void;
};

const UnsavedChangesContext = createContext<UnsavedChangesContextValue | null>(null);

export function UnsavedChangesProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [dirty, setDirty] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const clearDirty = useCallback(() => setDirty(false), []);

  useEffect(() => {
    if (!dirty) return;
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === pathname && url.search === window.location.search) return;
      event.preventDefault();
      event.stopPropagation();
      setPendingHref(`${url.pathname}${url.search}${url.hash}`);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [dirty, pathname]);

  useEffect(() => {
    if (!dirty) return;
    function onBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = "";
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const value = useMemo(() => ({ setDirty, clearDirty }), [clearDirty]);

  return (
    <UnsavedChangesContext.Provider value={value}>
      {children}
      <ConfirmModal
        open={pendingHref !== null}
        title="Leave this page?"
        description="Are you sure you want to cancel? Unsaved changes will be lost."
        confirmLabel="Leave"
        cancelLabel="Stay"
        onClose={() => setPendingHref(null)}
        onConfirm={() => {
          const href = pendingHref;
          setPendingHref(null);
          setDirty(false);
          if (href) router.push(href);
        }}
      />
    </UnsavedChangesContext.Provider>
  );
}

export function useUnsavedChanges(enabled = true) {
  const ctx = useContext(UnsavedChangesContext);
  if (!ctx) {
    throw new Error("useUnsavedChanges must be used within UnsavedChangesProvider");
  }

  useEffect(() => {
    ctx.setDirty(enabled);
    return () => ctx.setDirty(false);
  }, [ctx, enabled]);

  return ctx.clearDirty;
}
