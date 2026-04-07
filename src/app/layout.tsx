import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LARRY Protocol - Advanced Base DeFi",
  description: "Next-generation leverage and liquidity protocol on Base. Trade, borrow, and build positions with automated price protection.",
  keywords: "DeFi, Base, LARRY, crypto, lending, borrowing, advanced leverage, web3, finance",
  openGraph: {
    title: "LARRY Protocol - Advanced Base DeFi",
    description: "Next-generation leverage and liquidity protocol on Base.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LARRY Protocol - Advanced Base DeFi",
    description: "Next-generation leverage and liquidity protocol on Base.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
