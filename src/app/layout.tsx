import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import OverlayProvider from "@/providers/overlayProvider";

const pretendard = localFont({
  src: "/fonts/Pretendard-Regular.otf",
  display: "swap",
});

const handWriting = localFont({
  src: "/fonts/handwriting.ttf",
  variable: "--font-hand-writing",
  display: "swap",
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
    <html
      lang="en"
      className={`${pretendard.className} ${handWriting.variable}`}
    >
      <body className="h-svh bg-black antialiased">
        <OverlayProvider>
          <div className="mx-auto w-full min-w-[375px] max-w-[600px]">
            {children}
          </div>
        </OverlayProvider>
      </body>
    </html>
  );
}
