"use client"

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
} from "./config"

export default function UnitPage() {
  return (
    <main className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: SECTION_BG }}>
      <Header />

      {/* 세대안내 섹션 - flex-1로 남은 공간 채움 */}
      <section
        className="relative flex flex-col items-center flex-1"
        style={{
          backgroundColor: SECTION_BG,
          paddingTop: `${SECTION_PADDING_TOP}px`,
          paddingBottom: `${SECTION_PADDING_BOTTOM}px`,
        }}
      >
        {/* 콘텐츠 컨테이너 */}
        <div
          className="w-full flex flex-col items-center"
          style={{
            maxWidth: `${CONTENT_MAX_WIDTH}px`,
            paddingLeft: `${CONTENT_PADDING_X}px`,
            paddingRight: `${CONTENT_PADDING_X}px`,
            gap: `${CONTENT_GAP}px`,
          }}
        >
          {/* 섹션 내용 - 추후 추가 */}
        </div>
      </section>

      <Footer />
    </main>
  )
}
