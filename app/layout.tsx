import type { Metadata } from "next";
import { Zalando_Sans } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const zalandoSans = Zalando_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-zalando-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KinFin",
  description: "Your compliance, our financial kinship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${zalandoSans.variable} ${zalandoSans.className} scroll-smooth`}>
      <body className="m-0 min-h-dvh bg-[#FAFAFA] p-0 font-sans text-[#121212] antialiased">
        <div className="mx-auto flex min-h-dvh max-w-6xl flex-col border-x border-black/8">
          <Navbar />
          <div className="flex flex-1 flex-col">{children}</div>
        </div>
      </body>
    </html>
  );
}