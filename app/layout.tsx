// core
import React from "react";

// fonts
import { Nunito_Sans, Inter } from "next/font/google";

// components
import Footer from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { ClientComponent } from "@/components/ClientComponent";
import ProductOutOfStock from "@/components/ProductOutOfStock";
import CartModal from "@/components/CartModal";
import { Loader } from "@/components/Loader";

import "./globals.css";
import Head from "next/head";

export const nunitoSans = Nunito_Sans({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

export const interSans = Inter({
  weight: "400",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk" className="h-full text-[16px]">
      <Head>
        <title>Sport Hub</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={`&#34;Your best online store!&#34;`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={`relative wrapper h-full font-pangram antialiased`}>
        <header>
          <Header />
        </header>
        <main className="relative flex-1 flex flex-col xl:mt-16">
          {children}
        </main>
        <Footer />
        <div id="modal-root"></div>
        <ClientComponent>
          <ProductOutOfStock />
          <React.Suspense fallback={<Loader />}>
            <CartModal />
          </React.Suspense>
        </ClientComponent>
      </body>
    </html>
  );
}
