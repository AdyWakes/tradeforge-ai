import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradeForge AI | Trust Infrastructure for Global Commerce",
  description:
    "AI-powered trade finance, invoice verification, blockchain-backed trust scoring, and smart escrow simulations for global commerce."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
