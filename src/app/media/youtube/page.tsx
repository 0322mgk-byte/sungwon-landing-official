"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import QuickNav from "@/components/QuickNav"

export default function YouTubePage() {
  const [isMobile, setIsMobile] = useState(false)

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const paddingX = isMobile ? 16 : 20

  return (
    <main className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: "rgba(255,255,255,1)" }}>
      <Header />

      <section
        className="relative flex flex-col items-center flex-1"
        style={{
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        {/* 빠른 네비게이션 버튼 */}
        <QuickNav />

        {/* 콘텐츠 컨테이너 */}
        <div
          className="w-full flex flex-col items-center"
          style={{
            maxWidth: isMobile ? '100%' : '1000px',
            paddingLeft: `${paddingX}px`,
            paddingRight: `${paddingX}px`,
            gap: '24px',
          }}
        >
          {/* 타이틀 */}
          <div className="w-full flex flex-col items-center" style={{ gap: '16px' }}>
            <h1
              style={{
                fontSize: isMobile ? '24px' : '45px',
                fontWeight: 800,
                color: 'rgba(0,28,61,1)',
                letterSpacing: '0px',
                lineHeight: 1.2,
                textAlign: 'center',
              }}
            >
              유튜브 영상
            </h1>
            <p
              style={{
                fontSize: isMobile ? '14px' : '20px',
                fontWeight: 400,
                color: 'rgba(100,100,100,1)',
                lineHeight: 1.5,
                textAlign: 'center',
              }}
            >
              성원상떼빌의 다양한 영상을 만나보세요
            </p>
          </div>

          {/* 유튜브 임베드 영역 */}
          <div
            className="w-full"
            style={{
              aspectRatio: '16/9',
              maxWidth: '900px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/UqRa4sc2YmE?autoplay=1&mute=0&loop=1&playlist=UqRa4sc2YmE&controls=1&rel=0"
              title="성원상떼빌 홍보영상"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
