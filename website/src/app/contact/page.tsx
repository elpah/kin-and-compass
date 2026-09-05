import { covers } from "@/assets/covers";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import { brand } from "@/data/site";

export const metadata = {
  title: "Contact",
  description:
    "Write to Kin and Compass in Accra - travel, store, learning, invest, or charity.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Write to the house."
        text="Travel plans, store orders, a gift, a briefing, or a vendor who wants to join - one form, a real reply from Accra."
        image={covers.travel}
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-5">
        <aside className="space-y-8 lg:col-span-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Visit
            </p>
            <p className="mt-2 text-lg text-burgundy">{brand.address}</p>
            <p className="mt-1 text-sm text-muted">
              By appointment. Ask when you write.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Email
            </p>
            <a
              href={`mailto:${brand.email}`}
              className="mt-2 block text-lg text-burgundy hover:text-crimson"
            >
              {brand.email}
            </a>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Phone / WhatsApp
            </p>
            <a
              href={`tel:${brand.phone.replace(/\s/g, "")}`}
              className="mt-2 block text-lg text-burgundy hover:text-crimson"
            >
              {brand.phone}
            </a>
            <a
              href={`https://wa.me/${brand.whatsapp}`}
              className="mt-2 inline-flex h-11 items-center rounded bg-burgundy px-5 text-sm font-semibold text-white"
            >
              Message on WhatsApp
            </a>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            We reply within two business days. For urgent travel dates, WhatsApp is
            fastest.
          </p>
        </aside>
        <div className="rounded-lg bg-white p-6 ring-1 ring-sand sm:p-8 lg:col-span-3">
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
