import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Larry Talbot - Werewolf DeFi on Sei",
  description: "Transform under the moon with Larry Talbot. Buy, leverage, and borrow LARRY tokens on Sei Network.",
  keywords: "DeFi, Sei Network, Larry Talbot, werewolf, crypto, lending, borrowing, leverage",
  openGraph: {
    title: "Larry Talbot - Werewolf DeFi on Sei",
    description: "Transform under the moon with Larry Talbot DeFi protocol",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Larry Talbot - Werewolf DeFi on Sei",
    description: "Transform under the moon with Larry Talbot DeFi protocol",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
