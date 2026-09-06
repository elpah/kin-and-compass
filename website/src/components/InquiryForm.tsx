"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: string[];
  textarea?: boolean;
};

export function InquiryForm({
  kind,
  fields,
  submitLabel = "Send inquiry",
  extraPayload,
}: {
  kind: string;
  fields: Field[];
  submitLabel?: string;
  extraPayload?: Record<string, string>;
}) {
  const { addInquiry } = useAuth();
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-lg bg-blush px-6 py-8 text-center ring-1 ring-sand">
        <p className="script text-2xl text-crimson">Received</p>
        <p className="mt-2 text-sm text-muted">
          Thank you. A Kin and Compass lead will reply within two business days.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const payload: Record<string, string> = {};
        fields.forEach((f) => {
          payload[f.name] = String(data.get(f.name) ?? "");
        });
        if (extraPayload) Object.assign(payload, extraPayload);
        addInquiry(kind, payload);
        setDone(true);
      }}
    >
      {fields.map((field) => (
        <label key={field.name} className="block text-sm">
          <span className="font-medium text-burgundy">{field.label}</span>
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
              className="mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-crimson/30"
            >
              <option value="">Select</option>
              {field.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              className="mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-crimson/30"
            />
          )}
        </label>
      ))}
      <button
        type="submit"
        className="mt-2 h-12 rounded bg-burgundy text-sm font-semibold text-white hover:bg-burgundy-deep"
      >
        {submitLabel}
      </button>
    </form>
  );
}
