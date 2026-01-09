import type { Metadata } from "next";
import "./globals.css";
import PageTracker from "@/components/PageTracker";
import ViewportMeta from "@/components/ViewportMeta";

export const metadata: Metadata = {
  title: "성원상떼빌 - 프리미엄 라이프의 시작",
  description: "군산 지곡동 성원상떼빌 공식 랜딩페이지",
  openGraph: {
    title: "성원상떼빌 - 프리미엄 라이프의 시작",
    description: "군산 지곡동 성원상떼빌 공식 랜딩페이지",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "성원상떼빌",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "성원상떼빌 - 프리미엄 라이프의 시작",
    description: "군산 지곡동 성원상떼빌 공식 랜딩페이지",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <ViewportMeta />
        <PageTracker />
        {children}
      </body>
    </html>
  );
}
