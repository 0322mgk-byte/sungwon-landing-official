"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Footer from "@/components/Footer"

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <main className="min-h-screen font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* 모바일 전용 하얀색 정사각형 섹션 */}
      {isMobile && (
        <section
          className="relative flex flex-col items-center justify-start"
          style={{
            width: '100vw',
            height: '120vw',
            backgroundColor: 'rgba(255,255,255,1)',
          }}
        >
          <style jsx>{`
            @keyframes rotateText {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>

          {/* 메인 이미지 */}
          <Image
            src="/mobile-body (1).png"
            alt="군산 성원상떼빌"
            width={240}
            height={0}
            style={{
              width: '100%',
              maxWidth: '290px',
              height: 'auto',
              marginTop: '8%',
            }}
          />

          {/* 중간 좌측 텍스트 */}
          <div
            style={{
              position: 'absolute',
              left: '19%',
              top: '32%',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: 500,
                color: 'rgba(0, 0, 0, 1)',
                lineHeight: 1.4,
              }}
            >
              월 30만원대로
            </div>
            <div
              style={{
                fontSize: '26px',
                fontWeight: 800,
                color: 'rgb(243, 115, 32)',
                lineHeight: 1.4,
              }}
            >
              내집마련!
            </div>
          </div>

          {/* 원형 배지 */}
          <div
            style={{
              position: 'absolute',
              left: '29%',
              transform: 'translateX(-50%)',
              top: '56%',
              width: '120px',
              height: '120px',
            }}
          >
            {/* 회전하는 텍스트 */}
            <svg
              viewBox="0 0 100 100"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                animation: 'rotateText 10s linear infinite',
              }}
            >
              <defs>
                <path
                  id="mobileCirclePath"
                  d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                />
              </defs>
              <text
                style={{
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '8px',
                }}
              >
                <textPath href="#mobileCirclePath" startOffset="0%">
                  <tspan style={{ fill: 'rgba(120, 120, 120, 1)' }}>{"  "}·{"  "}</tspan>
                  <tspan style={{ fill: 'rgb(243, 115, 32)' }}>군산지곡</tspan>
                  <tspan style={{ fill: 'rgba(120, 120, 120, 1)' }}>{"    "}성원상떼빌{"    "}더프라임</tspan>
                </textPath>
              </text>
            </svg>
            {/* 중앙 원형 배지 */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '72px',
                height: '72px',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.35)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'rgb(243, 115, 32)',
                  lineHeight: 1.3,
                }}
              >
                선착순
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'rgba(0, 0, 0, 1)',
                  lineHeight: 1.3,
                }}
              >
                동호수지정
              </div>
            </div>
          </div>

          {/* 하단 캐릭터 이미지 */}
          <Image
            src="/visual-man.png"
            alt="캐릭터"
            width={150}
            height={0}
            style={{
              width: '70%',
              maxWidth: '180px',
              height: 'auto',
              position: 'absolute',
              bottom: '0',
              right: '6%',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))',
            }}
          />
        </section>
      )}

      {/* Footer */}
      <Footer />
    </main>
  )
}
