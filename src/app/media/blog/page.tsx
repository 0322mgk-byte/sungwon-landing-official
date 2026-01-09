"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import QuickNav from "@/components/QuickNav"
import Image from "next/image"
import Lottie from "lottie-react"
import clickAnimation from "../../../../public/click.json"

export default function BlogPage() {
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
            gap: isMobile ? '40px' : '64px',
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
              블로그
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
              성원상떼빌의 다양한 소식을 블로그에서 확인하세요
            </p>
          </div>

          {/* 이미지 그룹 (PC에서 위로 올림) */}
          <div
            className="w-full flex flex-col items-center"
            style={{
              marginTop: isMobile ? '-10px' : '-24px',
              gap: isMobile ? '40px' : '64px',
            }}
          >
            {/* 블로그 미리보기 이미지 */}
            <div
              style={{
                position: 'relative',
                marginTop: isMobile ? '8px' : '32px',
                maxWidth: '100%',
              }}
            >
              {/* 클릭 애니메이션 (상단 레이어) */}
              <div
                style={{
                  position: 'absolute',
                  top: isMobile ? '10px' : '0px',
                  right: isMobile ? '10px' : '20px',
                  width: isMobile ? '60px' : '90px',
                  height: isMobile ? '60px' : '90px',
                  zIndex: 10,
                  pointerEvents: 'none',
                }}
              >
                <Lottie animationData={clickAnimation} loop={true} />
              </div>

              <a
                href="https://blog.naver.com/house_unni/224135188114"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  maxWidth: '100%',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <Image
                  src="/20260109_180732.png"
                  alt="성원상떼빌 블로그 포스트"
                  width={800}
                  height={400}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </a>
            </div>

            {/* 블로그 미리보기 이미지 2 */}
            <a
              href="https://blog.naver.com/house_unni/224136666321"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                maxWidth: '100%',
                boxShadow: '0 12px 40px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <Image
                src="/20260109_181727.png"
                alt="성원상떼빌 블로그 포스트 2"
                width={800}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
