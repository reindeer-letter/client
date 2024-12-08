import type { Metadata } from "next";
import "./globals.css";
import OverlayProvider from "@/providers/overlayProvider";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
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
    url: "https://www.reindeer-letter.site",
    type: "website",
    images: [
      {
        url: "/images/Thumbnail for kakaotalk.png",
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
    <html lang="en" className={pretendard.className}>
      <body className={`${pretendard.className} h-svh bg-black antialiased`}>
        <OverlayProvider>
          <div className="mx-auto w-full min-w-[375px] max-w-[600px]">
            {children}
          </div>
        </OverlayProvider>
      </body>
    </html>
  );
}
