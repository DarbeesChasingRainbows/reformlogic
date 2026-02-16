import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/site/Footer";
import NavBar from "../components/site/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReformLogic — Software Architecture & Church Technology Consulting",
  description:
    "Software architecture consulting and church technology services. 12+ years of .NET expertise, RockRMS consulting, Umbraco CMS, and enterprise system design.",
  openGraph: {
    title: "ReformLogic — Technology That Serves Your Mission",
    description:
      "Software architecture consulting and church technology services. 12+ years of .NET expertise, RockRMS, and enterprise system design.",
    url: "https://reformlogic.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReformLogic — Technology That Serves Your Mission",
    description:
      "Software architecture consulting and church technology services. 12+ years of .NET expertise.",
  },
  alternates: {
    canonical: "https://reformlogic.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-300 antialiased selection:bg-indigo-500/30`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
