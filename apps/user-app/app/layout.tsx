import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { AppbarClient } from "../components/AppbarClient";
import { Providers } from "../providers";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple Wallert app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable} bg-pink-100 `}>
          <AppbarClient />
          {children}
        </body>
      </Providers>
    </html>
  );
}
