import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Noor Modest Wear - Elegant Burkha, Abaya & Modest Fashion",
  description: "Premium burkha, abaya, and modest Islamic fashion. Discover elegant designs that combine faith with fashion. Free shipping above ₹999.",
  keywords: "burkha, abaya, hijab, modest fashion, Islamic clothing, muslim fashion, niqab, maxi dress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
