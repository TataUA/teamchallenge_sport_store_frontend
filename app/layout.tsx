import type { Metadata } from "next";

// fonts
import { Nunito_Sans, Inter } from "next/font/google";

// components
import Footer from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import ProductIsOutOfStockModal from "@/components/ProductIsOutOfStockModal";
import { ClientComponent } from "@/components/ClientComponent";

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

const buttonClassname =
  "py-[11px] h-fit px-4 border-[1px] rounded-lg text-center border-blue w-full cursor-pointer";

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk" className="h-full text-[16px]">
      <Head>
        <title>&#34;Sport Hub&#34;</title>
        <meta
          name="description"
          content={`&#34;Your best online store!&#34;`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body
        className={`relative wrapper h-full font-pangram ${nunitoSans.className} ${interSans.className} antialiased`}
      >
        <header>
          <Header />
        </header>
        <main className="relative flex-1">{children}</main>
        <Footer />
        <div id="modal-root"></div>
        <ClientComponent>
          <ProductIsOutOfStockModal>
            <div className="mb-8">
              <h3 className="mb-4 text-xl color-primary font-bold mr-6 md:mb-8">
                О ні, цей товар закінчився на складі!
              </h3>
              <p className="text-sm md:text-base color-primary font-medium">
                Ми працюємо над його поповненням – слідкуйте за оновленнями!
              </p>
            </div>
            <div className="flex gap-4 flex-wrap md:flex-nowrap justify-between text-base md:gap-5">
              <div
                className={
                  buttonClassname + " text-blue hover:text-white hover:bg-blue"
                }
              >
                Перейти в кошик
              </div>
              <div
                className={
                  buttonClassname +
                  " text-white bg-blue hover:text-blue hover:bg-white"
                }
              >
                Продовжити покупки
              </div>
            </div>
          </ProductIsOutOfStockModal>
        </ClientComponent>
      </body>
    </html>
  );
}
