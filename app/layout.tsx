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
  title: "STINABLIS | 3D Printing & Custom Automotive Parts Malaysia",
  description: "STINABLIS: 3D printing, custom automotive parts & rapid prototyping in Kuching, Malaysia. Digital manufacturing for industry & car enthusiasts.",
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
