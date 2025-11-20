import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CONTENT } from "@/constants/content";

// Initialize font with specific subsets and variable support
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Based on font weights in Figma design
  variable: "--font-inter-variable", // Allows us to use it in Tailwind config
  display: "swap",
});

export const metadata: Metadata = {
  title: CONTENT.meta.title,
  description: CONTENT.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-brand-dark text-white`}
      >
        {children}
      </body>
    </html>
  );
}
