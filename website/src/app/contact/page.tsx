import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import { brand } from "@/data/site";

export const metadata = {
  title: "Contact",
  description: "Write to Kin and Compass in Accra - travel, store, learning, invest, or charity.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        kicker="Contact"
        title="Write to the house."
        text="Travel plans, store orders, a gift, or a vendor who wants to join - one form, a real reply."
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-5">
        <aside className="lg:col-span-2 space-y-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Visit
            </p>
            <p className="mt-2 text-lg text-burgundy">{brand.address}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Email
            </p>
            <a href={`mailto:${brand.email}`} className="mt-2 block text-lg text-burgundy hover:text-crimson">
              {brand.email}
            </a>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Phone / WhatsApp
            </p>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="mt-2 block text-lg text-burgundy hover:text-crimson">
              {brand.phone}
            </a>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            We reply within two business days. For urgent travel dates, WhatsApp is fastest.
          </p>
        </aside>
        <div className="lg:col-span-3 rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8">
          <h2 className="display text-3xl text-burgundy">Send a message</h2>
          <p className="mt-2 text-sm text-muted">All fields go to the Accra desk.</p>
          <div className="mt-6">
            <InquiryForm
              kind="contact"
              submitLabel="Send message"
              fields={[
                { name: "name", label: "Name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "phone", label: "Phone (optional)" },
                {
                  name: "topic",
                  label: "Topic",
                  options: [
                    "Travel",
                    "Store",
                    "Learning",
                    "Invest",
                    "Charity",
                    "Press",
                    "Vendors",
                  ],
                  required: true,
                },
                { name: "message", label: "Message", textarea: true, required: true },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
