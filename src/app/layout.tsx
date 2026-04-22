import type { Metadata } from "next";
import { playfair, dmSans, dancingScript } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eight Months — Vince & Princess",
  description: "A story told in messages.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dancingScript.variable}`}
    >
      <body className="font-[family-name:var(--font-dm-sans)] antialiased">
        {children}
      </body>
    </html>
  );
}
