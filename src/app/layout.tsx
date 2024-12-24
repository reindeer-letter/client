import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import OverlayProvider from "@/providers/overlayProvider";
import { UserStoreProvider } from "@/providers/userStoreProvider";
import { LetterStoreProvider } from "@/providers/letterStoreProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import ProgressBarProvider from "@/providers/progressBarProvider";

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
      { url: "/favicon/favicon_96.png", sizes: "96x96", type: "image/png" },
    ],
  },
  openGraph: {
    title: "순록의 편지 - 오늘의 기억을 선물하는 편지",
    description: "미래의 나에게, 오늘의 기억을 선물해보세요.",
    url: "https://www.reindeer-letter.site",
    type: "website",
    images: [
      {
        url: "/images/thumbnail.png",
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
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ""}
      />
      <body className="h-svh bg-black antialiased">
        <ProgressBarProvider>
          <UserStoreProvider>
            <LetterStoreProvider>
              <OverlayProvider>
                <div className="mx-auto w-full min-w-[375px] max-w-[600px]">
                  {children}
                </div>
              </OverlayProvider>
            </LetterStoreProvider>
          </UserStoreProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
