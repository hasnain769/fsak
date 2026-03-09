import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | FSAK Logistics",
    default: "FSAK Logistics | Top Logistics Company in Saudi Arabia & Middle East",
  },
  description: "FSAK Logistics is a leading provider of supply chain solutions, specialized heavy transport, customs clearance, and warehousing in Saudi Arabia, the Middle East, and Pakistan.",
  keywords: [
    "logistics in Saudi Arabia",
    "logistics middle east",
    "pakistan logistics",
    "heavy transport Saudi Arabia",
    "customs clearance",
    "warehousing solutions",
    "supply chain solutions",
    "top logistics companies",
    "freight forwarding"
  ],
  openGraph: {
    title: "FSAK Logistics | Top Logistics Company in Saudi Arabia & Middle East",
    description: "Expert supply chain solutions, heavy transport, customs clearance, and warehousing across Saudi Arabia, the Middle East, and Pakistan.",
    url: "https://www.fsaklogistics.com",
    siteName: "FSAK Logistics",
    locale: "en_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FSAK Logistics | Top Logistics Company in Saudi Arabia & Middle East",
    description: "Expert supply chain solutions, heavy transport, customs clearance, and warehousing.",
  },
  alternates: {
    languages: {
      'en': '/en',
      'ar': '/ar',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${outfit.variable} ${cairo.variable} antialiased flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
