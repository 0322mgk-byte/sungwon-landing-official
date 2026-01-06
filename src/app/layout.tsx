import type { Metadata } from "next";
import "./globals.css";
import PageTracker from "@/components/PageTracker";

export const metadata: Metadata = {
  title: "성원상떼빌 - 프리미엄 라이프의 시작",
  description: "군산 지곡동 성원상떼빌 공식 랜딩페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <PageTracker />
        {children}
      </body>
    </html>
  );
}
