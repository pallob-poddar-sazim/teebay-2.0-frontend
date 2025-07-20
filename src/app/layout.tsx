import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ApolloWrapper from "@/shared/components/wrappers/ApolloWrapper/ApolloWrapper";
import Toaster from "@/shared/components/wrappers/Toaster/Toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teebay",
  description: "A marketplace where anyone can buy, sell, borrow and rent products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ApolloWrapper>
          <Toaster />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
