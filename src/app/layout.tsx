import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import OverlayProvider from "@/providers/overlayProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "순록의 편지",
  description: "순록의 편지 - 설명",
  openGraph: {
    title: "순록의 편지 - ...??",
    description: "순록의 편지 설명",
    url: "https://example.com",
    type: "website",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
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
        // className={`${geistSans.variable} ${geistMono.variable} mx-auto h-svh min-w-[375px] max-w-[600px] border border-white antialiased`}
        className={`${geistSans.variable} ${geistMono.variable} h-svh -bg--background antialiased`}
      >
        <OverlayProvider>
          <div className="mx-auto w-full min-w-[375px] max-w-[600px]">
            <Header />
            {children}
          </div>
        </OverlayProvider>
      </body>
    </html>
  );
}
