import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart stratégia | TTSK",
  description: "Portál pre moderných starostov a starostky Trnavského samosprávneho kraja. Sledujte podporené projekty a získajte informácie o možnostiach financovania.",
  keywords: "TTSK, Trnavský kraj, samospráva, projekty, financovanie, smart región, stratégia",
  authors: [{ name: "Trnavský samosprávny kraj" }],
  creator: "Trnavský samosprávny kraj",
  publisher: "Trnavský samosprávny kraj",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://smartstrategia.trnava-vuc.sk'),
  openGraph: {
    title: "Smart stratégia | TTSK",
    description: "Portál pre moderných starostov a starostky Trnavského samosprávneho kraja",
    url: 'https://smartstrategia.trnava-vuc.sk',
    siteName: 'Smart stratégia TTSK',
    locale: 'sk_SK',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  category: 'government',
  other: {
    'robots': 'noindex, nofollow',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
