import type { Metadata } from "next";
import { Anton, Roboto } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ar-one",
});

export const metadata: Metadata = {
  title: "STINABLIS | 3D Printing Malaysia & Custom Automotive Parts Manufacturing",
  description: "STINABLIS is a Kuching, Sarawak, Malaysia-based digital manufacturing company specializing in 3D printing services, custom automotive parts, and rapid prototyping. We combine engineering precision, advanced manufacturing, and modern software to deliver high-performance, reliable solutions for industries and car enthusiasts across Malaysia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${anton.variable} ${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
