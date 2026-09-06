import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kin and Compass Admin",
  icons: {
    icon: [
      { url: "/favicon.ico/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/favicon.ico/apple-icon-180x180.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico/favicon.ico",
  },
  manifest: "/favicon.ico/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${cormorant.variable} ${script.variable} h-dvh antialiased`}
    >
      <body className="min-h-dvh bg-cream text-ink font-sans">{children}</body>
    </html>
  );
}
