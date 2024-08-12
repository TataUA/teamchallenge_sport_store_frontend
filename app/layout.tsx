import type { Metadata } from "next";

// fonts
import { Nunito_Sans, Inter } from "next/font/google";

// components
import Footer from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";

import "./globals.css";

export const nunitoSans = Nunito_Sans({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

export const interSans = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sport Hub",
  description: "Your best online store!",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk" className="h-full">
      <head />
      <body
        className={`relative wrapper h-full font-pangram ${nunitoSans.className} ${interSans.className} antialiased`}
      >
        <Header />
        <main className="relative flex-1">{children}</main>
        <Footer />
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
