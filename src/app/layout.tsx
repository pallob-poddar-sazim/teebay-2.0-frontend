import type { Metadata } from "next";
import "./globals.css";
import ApolloWrapper from "@/providers/ApolloWrapper";

export const metadata: Metadata = {
  title: "Teebay",
  description:
    "A marketplace where anyone can buy, sell, borrow and rent products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
