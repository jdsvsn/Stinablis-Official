import type { Metadata } from "next";
import { Anton, Roboto, Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "STINABLIS | Engineering & Digital Manufacturing Solutions",
  description: "STINABLIS: 3D printing, custom automotive parts & rapid prototyping in Kuching, Malaysia. Digital manufacturing for industry & car enthusiasts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${anton.variable} ${roboto.variable} ${syne.variable} ${dmSans.variable} font-roboto antialiased`}>
        <div className="grain"></div>
        <div className="scroll-bar" id="scrollBar"></div>
        {children}
      </body>
    </html>
  );
}
