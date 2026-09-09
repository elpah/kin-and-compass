const BURGUNDY = "#360000";
const CRIMSON = "#C00C30";
const CREAM = "#F8F4F1";
const SAND = "#EDE4DF";
const MUTED = "#6B5B5B";
const INK = "#0A0000";

const kindTitles: Record<string, string> = {
  contact: "Contact message",
  "custom-trip": "Custom trip request",
  invest: "Investment inquiry",
  "charity-volunteer": "Volunteer inquiry",
  "charity-partner": "Partnership inquiry",
  "charity-fundraise": "Fundraising inquiry",
};

const fieldLabels: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  topic: "Topic",
  message: "Message",
  note: "Notes",
  dates: "Preferred dates",
  guests: "Guests",
  start: "Start date",
  end: "End date",
  experiences: "Experiences",
  total: "Total",
  tour: "Tour",
  include: "Include",
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function inquiryTitle(kind: string) {
  if (kind.startsWith("tour:")) return "Tour request";
  if (kind.startsWith("invest:")) return "Investment inquiry";
  return kindTitles[kind] ?? "New inquiry";
}

export function inquirySubject(kind: string, name: string) {
  return `${inquiryTitle(kind)} from ${name}`;
}

function labelFor(key: string) {
  return fieldLabels[key] ?? key.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatValue(key: string, value: string) {
  if (key === "total" && value && !value.startsWith("$") && /^\d+(\.\d+)?$/.test(value)) {
    return `$${value}`;
  }
  if (key === "experiences" || key === "include") {
    return value
      .split(/\n|;/)
      .map((line) => line.trim())
      .filter(Boolean)
      .join("\n");
  }
  return value;
}

function wrap(inner: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${CREAM};font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid ${SAND};">
            <tr>
              <td style="background:${BURGUNDY};padding:28px 32px;">
                <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#ffffff;">Kin and Compass</p>
                <p style="margin:6px 0 0;font-size:22px;color:${CRIMSON};font-style:italic;">Travel And Tour</p>
              </td>
            </tr>
            ${inner}
            <tr>
              <td style="padding:20px 32px 28px;border-top:1px solid ${SAND};">
                <p style="margin:0;font-size:12px;color:${MUTED};">Kin and Compass · Oregon, USA</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function houseInquiryHtml(kind: string, payload: Record<string, unknown>) {
  const title = inquiryTitle(kind);
  const name = String(payload.name ?? "").trim();
  const rows = Object.entries(payload)
    .map(([key, raw]) => {
      const value = String(raw ?? "").trim();
      if (!value) return "";
      return `<tr>
        <td style="padding:12px 0;border-bottom:1px solid ${SAND};width:140px;vertical-align:top;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};">${escapeHtml(labelFor(key))}</td>
        <td style="padding:12px 0 12px 16px;border-bottom:1px solid ${SAND};vertical-align:top;font-size:16px;color:${INK};line-height:1.5;">${escapeHtml(formatValue(key, value)).replace(/\n/g, "<br/>")}</td>
      </tr>`;
    })
    .join("");

  return wrap(`
    <tr>
      <td style="padding:32px 32px 8px;">
        <p style="margin:0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:${CRIMSON};">${escapeHtml(title)}</p>
        <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;color:${BURGUNDY};font-weight:normal;">${escapeHtml(name)}</h1>
        <p style="margin:12px 0 0;font-size:15px;color:${MUTED};">A guest wrote in. Reply to this email to reach them directly.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 32px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
      </td>
    </tr>
  `);
}

export function guestInquiryHtml(name: string) {
  return wrap(`
    <tr>
      <td style="padding:32px;">
        <p style="margin:0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:${CRIMSON};">Received</p>
        <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;color:${BURGUNDY};font-weight:normal;">Thank you, ${escapeHtml(name)}.</h1>
        <p style="margin:16px 0 0;font-size:16px;line-height:1.6;color:${INK};">We received your message and a Kin and Compass lead will write back shortly.</p>
        <p style="margin:20px 0 0;font-size:15px;color:${MUTED};">If this is time-sensitive, WhatsApp is fastest.</p>
      </td>
    </tr>
  `);
}
