import type { ReactNode } from "react";

export function AuthCard({
  title,
  text,
  children,
}: {
  title: string;
  text?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md px-4 pb-20 pt-32">
      <div className="w-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-sand sm:p-8">
        <h1 className="text-2xl font-semibold text-burgundy">{title}</h1>
        {text ? <p className="mt-2 text-sm text-muted">{text}</p> : null}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export const authField =
  "mt-1 h-12 w-full rounded-lg border border-sand bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-crimson/25";

export const authPrimary =
  "inline-flex h-12 w-full items-center justify-center rounded-lg bg-burgundy text-sm font-semibold text-white hover:bg-burgundy-deep disabled:opacity-60";
