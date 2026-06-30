import { satoshi } from "@/app/fonts";
import "@/app/globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "NEDF Design",
  description: "NEDF Design — Crafting imagination into fashion",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* overflow-x clip on a div (not body/html) so sticky still works */}
      <body className={`${satoshi.className} overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
