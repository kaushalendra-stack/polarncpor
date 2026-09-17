import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";

export const viewport: Viewport = {
  themeColor: "#1b2f6b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://polarncpor.vercel.app",
  ),
  title: {
    default:
      "PolarSagar Portal | National Centre for Polar and Ocean Research, Ministry of Earth Sciences, Government of India",
    template:
      "%s | National Centre for Polar and Ocean Research (NCPOR), Government of India",
  },
  description:
    "Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal of the National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Government of India. Explore Indian expeditions to Antarctica, the Arctic, Southern Ocean and Himalaya, browse scientific datasets, publications, photographs and videos.",
  keywords: [
    "NCPOR",
    "polar science",
    "Antarctica",
    "Arctic",
    "Southern Ocean",
    "Maitri",
    "Bharati",
    "Himadri",
    "Himansh",
    "Indian Antarctic Programme",
    "MoES",
    "Ministry of Earth Sciences",
    "expedition",
    "cryosphere",
  ],
  authors: [
    { name: "National Centre for Polar and Ocean Research (NCPOR)" },
    { name: "Ministry of Earth Sciences" },
  ],
  creator: "NCPOR, Ministry of Earth Sciences",
  publisher: "National Centre for Polar and Ocean Research",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "PolarSagar Portal",
    title: "PolarSagar Portal | NCPOR, Ministry of Earth Sciences, Government of India",
    description:
      "Explore Indian polar expeditions, datasets, publications and media — India's gateway to Antarctic, Arctic and Southern Ocean knowledge.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <SkipLink />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}