import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { seo } from "@/content/site";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

// Keep Vercel preview deployments out of search indexes; only index production.
const isProductionIndexable =
  process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "development";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: seo.title,
    template: "%s | Carex Auto",
  },
  description: seo.description,
  applicationName: "Carex Auto",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: seo.title,
    description: seo.description,
    siteName: "Carex Auto",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: isProductionIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#111719",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-black focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
