import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  title: "VaultPaySafe | Secure Banking",
  description: "Next Generation Banking and Virtual Cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-body-main antialiased bg-background text-on-background min-h-screen flex flex-col`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
