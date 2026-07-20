import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Krishna Unnatti | Luxury 3 BHK Apartments in Alwarpet, Chennai",
  description: "Explore Krishna Unnatti by Krishna Group: a boutique collection of five premium 3 BHK apartments (2,082 sq.ft.) for sale in Alwarpet, Chennai. Experience refined living with VRV climate control, Italian marble, and a rooftop terrace garden.",
  keywords: [
    "Krishna Unnatti",
    "Krishna Group",
    "apartments in Alwarpet",
    "luxury apartments Chennai",
    "3 BHK apartments for sale Alwarpet",
    "boutique residences Chennai",
    "premium flats Alwarpet",
    "Krishna Group Alwarpet project"
  ],
  alternates: {
    canonical: "https://krishnagroup.com/upcoming-unnati-la-project-details/",
  },
  openGraph: {
    title: "Krishna Unnatti | Luxury 3 BHK Apartments in Alwarpet, Chennai",
    description: "Discover Krishna Unnatti: exclusive boutique 3 BHK residences in Alwarpet. Refined living by Krishna Group.",
    url: "https://krishnagroup.com/upcoming-unnati-la-project-details/",
    siteName: "Krishna Group",
    images: [
      {
        url: "https://krishnagroup.com/wp-content/uploads/2026/01/unnatii-elevation.jpg",
        width: 1200,
        height: 630,
        alt: "Krishna Unnatti Exterior Elevation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna Unnatti | Luxury 3 BHK Apartments in Alwarpet, Chennai",
    description: "Exclusive boutique 3 BHK residences in Alwarpet by Krishna Group.",
    images: ["https://krishnagroup.com/wp-content/uploads/2026/01/unnatii-elevation.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

