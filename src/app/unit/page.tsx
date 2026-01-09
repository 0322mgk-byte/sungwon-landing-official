"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// 설정값 import (config.ts에서 값 수정 가능)
import {
  SECTION_BG,
  SECTION_PADDING_TOP,
  SECTION_PADDING_BOTTOM,
  CONTENT_MAX_WIDTH,
  CONTENT_PADDING_X,
  CONTENT_GAP,
  MOBILE_CONTENT_PADDING_X,
  MOBILE_CONTENT_GAP,
  MOBILE_SECTION_PADDING_TOP,
  MOBILE_SECTION_PADDING_BOTTOM,
} from "./config"

export default function UnitPage() {
  const [isMobile, setIsMobile] = useState(false)

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // 반응형 값 계산
  const paddingX = isMobile ? MOBILE_CONTENT_PADDING_X : CONTENT_PADDING_X
  const contentGap = isMobile ? MOBILE_CONTENT_GAP : CONTENT_GAP
  const sectionPaddingTop = isMobile ? MOBILE_SECTION_PADDING_TOP : SECTION_PADDING_TOP
  const sectionPaddingBottom = isMobile ? MOBILE_SECTION_PADDING_BOTTOM : SECTION_PADDING_BOTTOM

  return (
    <main className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: SECTION_BG }}>
      <Header />

      {/* 세대안내 섹션 - flex-1로 남은 공간 채움 */}
      <section
        className="relative flex flex-col items-center flex-1"
        style={{
          backgroundColor: SECTION_BG,
          paddingTop: `${sectionPaddingTop}px`,
          paddingBottom: `${sectionPaddingBottom}px`,
        }}
      >
        {/* 콘텐츠 컨테이너 */}
        <div
          className="w-full flex flex-col items-center"
          style={{
            maxWidth: isMobile ? '100%' : `${CONTENT_MAX_WIDTH}px`,
            paddingLeft: `${paddingX}px`,
            paddingRight: `${paddingX}px`,
            gap: `${contentGap}px`,
          }}
        >
          {/* 섹션 내용 - 추후 추가 */}
        </div>
      </section>

      <Footer />
    </main>
  )
}
