"use client";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="script text-2xl text-crimson">The house</p>
      <h1 className="display text-4xl text-burgundy">Settings</h1>
      <p className="mt-2 text-sm text-muted">
        These fields are for layout only. Saving is not connected yet.
      </p>

      <form className="mt-8 space-y-8" onSubmit={(event) => event.preventDefault()}>
        <section className="rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8">
          <h2 className="display text-2xl text-burgundy">House</h2>
          <div className="mt-5 grid gap-4">
            <Field label="House name" defaultValue="Kin and Compass" />
            <Field label="Tagline" defaultValue="Travel And Tour" />
            <Field label="Address" defaultValue="Oregon, USA" />
            <Field label="Email" type="email" defaultValue="info@kinandcompasstravels.com" />
            <Field label="Booking email" type="email" defaultValue="booking@kingandcompasstravels.com" />
            <Field label="Phone" defaultValue="+233 20 555 0100" />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8">
          <h2 className="display text-2xl text-burgundy">Sign-in</h2>
          <div className="mt-5 grid gap-4">
            <Field label="Admin email" type="email" defaultValue="info@kinandcompasstravels.com" />
            <Field label="New password" type="password" />
          </div>
        </section>

        <button
          type="submit"
          className="h-12 rounded-lg bg-burgundy px-6 text-sm font-semibold text-white"
        >
          Save settings
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  type = "text",
  defaultValue,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-burgundy">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1 h-12 w-full rounded-lg border border-sand bg-cream px-3 outline-none focus:ring-2 focus:ring-crimson/30"
      />
    </label>
  );
}
