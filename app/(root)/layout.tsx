import { satoshi } from "@/app/fonts";
import "@/app/globals.css";
import HolyLoader from "holy-loader";
import type { Metadata, Viewport } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "NEDF Design",
  description: "NEDF Design — Crafting imagination into fashion",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
