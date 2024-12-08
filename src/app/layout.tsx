import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
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
  description: "순록의 편지 - 오늘의 기억을 선물하는 편지",
  icons: {
    icon: [
      { url: "/icons/favicon_16_16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon_96_96_2x.png", sizes: "96x96", type: "image/png" },
    ],
  },
  openGraph: {
    title: "순록의 편지 - 오늘의 기억을 선물하는 편지",
    description: "미래의 나에게, 오늘의 기억을 선물하는 편지",
    url: "https://example.com",
    type: "website",
    images: [
      {
        url: "/images/Tumbnail for kakaotalk.png",
        alt: "순록의 편지",
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
        className={`${geistSans.variable} ${geistMono.variable} h-svh bg-black antialiased`}
      >
        <OverlayProvider>
          <div className="mx-auto w-full min-w-[375px] max-w-[600px]">
            {children}
          </div>
        </OverlayProvider>
      </body>
    </html>
  );
}
