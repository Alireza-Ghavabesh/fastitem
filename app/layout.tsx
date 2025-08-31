import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FooterMobile from "@/components/footerMobile";
import FooterDesktop from "@/components/footerDesktop";
import bgImage from "@/public/banner-background.jpg";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "فست آیتم",
  description: "فروش و خرید ایتم های بازی های مختلف",
  icons: {
    icon: "/download.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={inter.className}
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <Header />
        {children}
        <FooterMobile />
        <FooterDesktop />
      </body>
    </html>
  );
}
