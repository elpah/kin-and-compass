"use client";

import { useAuth } from "@/context/AuthContext";
import { RequiredMark } from "@/components/RequiredMark";
import { useState } from "react";

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: string[];
  textarea?: boolean;
  checkboxes?: { value: string; label: string }[];
  defaultValue?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function InquiryForm({
  kind,
  fields,
  submitLabel = "Send inquiry",
  extraPayload,
  onSuccess,
}: {
  kind: string;
  fields: Field[];
  submitLabel?: string;
  extraPayload?: Record<string, string>;
  onSuccess?: () => void;
}) {
  const { addInquiry } = useAuth();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (done) {
    return (
      <div className="rounded-lg bg-blush px-6 py-8 text-center ring-1 ring-sand">
        <p className="script text-2xl text-crimson">Received</p>
        <p className="mt-2 text-sm text-muted">
          Thank you. We sent a confirmation to your email and will write back shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        setPending(true);
        const data = new FormData(e.currentTarget);
        const payload: Record<string, string> = {};
        fields.forEach((f) => {
          if (f.checkboxes) {
            const selected = data.getAll(f.name).map(String).filter(Boolean);
            if (selected.length) payload[f.name] = selected.join("\n");
            return;
          }
          payload[f.name] = String(data.get(f.name) ?? "");
        });
        if (extraPayload) Object.assign(payload, extraPayload);
        try {
          const response = await fetch(`${API_URL}/inquiries`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ kind, payload }),
          });
          const body = (await response.json()) as { error?: string };
          if (!response.ok) throw new Error(body.error ?? "Could not send your message.");
          addInquiry(kind, payload);
          onSuccess?.();
          setDone(true);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Could not send your message.");
        } finally {
          setPending(false);
        }
      }}
    >
      {fields.map((field) =>
        field.checkboxes ? (
          <fieldset key={field.name} className="rounded-lg bg-blush/60 p-4 ring-1 ring-sand">
            <legend className="px-1 text-sm font-semibold uppercase tracking-wider text-burgundy">
              {field.label}
            </legend>
            <div className="mt-2 space-y-1">
              {field.checkboxes.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-1 py-2 text-sm text-burgundy hover:bg-white/70"
                >
                  <input
                    type="checkbox"
                    name={field.name}
                    value={option.value}
                    className="h-4 w-4 shrink-0 accent-[#360000]"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : (
        <label key={field.name} className="block text-sm">
          <span className="font-medium text-burgundy">
            {field.label}
            {field.required ? <RequiredMark /> : null}
          </span>
          {field.textarea ? (
            <textarea
              name={field.name}
              required={field.required}
              rows={4}
              className="mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-crimson/30"
            />
          ) : field.options ? (
            <select
              name={field.name}
              required={field.required}
              defaultValue={field.defaultValue ?? ""}
              className="mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-crimson/30"
            >
              <option value="">Select</option>
              {field.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : field.type === "date" && (field.name === "start" || field.name === "end") ? (
            <input
              name={field.name}
              type="date"
              required={field.required}
              value={field.name === "start" ? startDate : endDate}
              min={field.name === "end" && startDate ? startDate : undefined}
              onChange={(event) => {
                const value = event.target.value;
                if (field.name === "start") {
                  setStartDate(value);
                  if (endDate && value && endDate < value) setEndDate("");
                  return;
                }
                setEndDate(value);
              }}
              className="mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-crimson/30"
            />
          ) : (
            <input
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              defaultValue={field.defaultValue}
              className="mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-crimson/30"
            />
          )}
        </label>
        ),
      )}
      {error && <p className="text-sm text-crimson">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 h-12 rounded bg-burgundy text-sm font-semibold text-white hover:bg-burgundy-deep disabled:opacity-60"
      >
        {pending ? "Sending..." : submitLabel}
      </button>
    </form>
  );
}
