"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"

// ============================================
// 🏢 단지안내 페이지 설정
// ============================================
const SECTION_BG = "rgba(255,255,255,1)"     // 배경색 - rgba(R,G,B,투명도 0~1)
const SECTION_PADDING_BOTTOM = 80;           // 섹션 하단 여백 (px)

// ============================================
// 🎬 콘텐츠 진입 애니메이션 설정
// ============================================
const ANIM_ENABLED = true;                   // 애니메이션 사용 여부
const ANIM_DURATION = 1;                     // 애니메이션 시간 (초)
const ANIM_EASE = "power2.out";              // 이징 - power1~4 + .in(천천히시작) / .out(천천히끝) / .inOut(양쪽천천히)
const ANIM_Y_OFFSET = 20;                    // 시작 위치 Y 오프셋 (px) - 아래에서 위로 올라오는 거리
const ANIM_DELAY = 0;                        // 애니메이션 시작 지연 (초)

// ============================================
// 📦 콘텐츠 컨테이너 설정
// ============================================
const CONTENT_MAX_WIDTH = 1000;              // 콘텐츠 최대 너비 (px)
const CONTENT_PADDING_X = 20;                // 좌우 여백 (px)
const CONTENT_GAP = 40;                      // 콘텐츠 요소 간 세로 간격 (px)

// ============================================
// 📝 타이틀 그룹 설정 (메인카피 + 서브카피)
// ============================================
const TITLE_GROUP_ENABLED = true;            // 타이틀 그룹 사용 여부
const TITLE_GROUP_X = 0;                     // 그룹 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
const TITLE_GROUP_Y = 0;                     // 그룹 상하 위치 (px) - 음수: 위로, 양수: 아래로
const TITLE_GROUP_PADDING_TOP = 150;         // 헤더 아래 여백 (px)
const TITLE_GROUP_ALIGN = "center";          // 정렬 - "left", "center", "right"

// 메인 카피 설정
const MAIN_COPY_ENABLED = true;              // 메인 카피 사용 여부
const MAIN_COPY = "군산지곡 성원상떼빌 단지배치도";  // 메인 카피 텍스트
const MAIN_COPY_SIZE = 45;                   // 글자 크기 (px)
const MAIN_COPY_WEIGHT = 800;                // 글자 굵기 - 100~900
const MAIN_COPY_COLOR = "rgba(0,28,61,1)";   // 글자 색상 - rgba(R,G,B,투명도 0~1)
const MAIN_COPY_LETTER_SPACING = 0;          // 자간 (px)
const MAIN_COPY_LINE_HEIGHT = 1.2;           // 줄 높이 - 1.0=글자크기, 1.5=1.5배
const MAIN_COPY_X = 0;                       // 좌우 미세 조정 (px)
const MAIN_COPY_Y = 0;                       // 상하 미세 조정 (px)

// 서브 카피 설정
const SUB_COPY_ENABLED = true;               // 서브 카피 사용 여부
const SUB_COPY = "자연과 편의가 조화를 이루는 프리미엄 주거공간";  // 서브 카피 텍스트
const SUB_COPY_SIZE = 20;                    // 글자 크기 (px)
const SUB_COPY_WEIGHT = 400;                 // 글자 굵기 - 100~900
const SUB_COPY_COLOR = "rgba(100,100,100,1)"; // 글자 색상 - rgba(R,G,B,투명도 0~1)
const SUB_COPY_LETTER_SPACING = 0;           // 자간 (px)
const SUB_COPY_LINE_HEIGHT = 1.5;            // 줄 높이 - 1.0=글자크기, 1.5=1.5배
const SUB_COPY_X = 0;                        // 좌우 미세 조정 (px)
const SUB_COPY_Y = 0;                        // 상하 미세 조정 (px)

// 메인/서브 카피 간격
const COPY_GAP = 16;                         // 메인 ↔ 서브 카피 간격 (px)

// ============================================
// 🖼️ 단지배치도 이미지 설정
// ============================================
const LAYOUT_IMAGE_ENABLED = true;           // 단지배치도 이미지 사용 여부
const LAYOUT_IMAGE_SRC = "/herosection.jpg"; // 이미지 경로 - 📌 실제 단지배치도 이미지로 교체
const LAYOUT_IMAGE_ALT = "군산지곡 성원상떼빌 단지배치도";

// ============================================

// 정렬 헬퍼 함수
const getTextAlign = (align: string) => {
  if (align === "center") return "center";
  if (align === "right") return "right";
  return "left";
};

const getItemsAlign = (align: string) => {
  if (align === "center") return "items-center";
  if (align === "right") return "items-end";
  return "items-start";
};

export default function ComplexPage() {
  const contentRef = useRef<HTMLDivElement>(null)

  // 콘텐츠 진입 애니메이션
  useEffect(() => {
    if (ANIM_ENABLED && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          y: ANIM_Y_OFFSET,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: ANIM_DURATION,
          ease: ANIM_EASE,
          delay: ANIM_DELAY,
        }
      )
    }
  }, [])

  return (
    <main className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: SECTION_BG }}>
      <Header />

      {/* 단지안내 섹션 - flex-1로 남은 공간 채움 */}
      <section
        className="relative flex flex-col items-center flex-1"
        style={{
          backgroundColor: SECTION_BG,
          paddingTop: `${TITLE_GROUP_PADDING_TOP}px`,
          paddingBottom: `${SECTION_PADDING_BOTTOM}px`,
        }}
      >
        {/* 콘텐츠 컨테이너 */}
        <div
          ref={contentRef}
          className="w-full flex flex-col items-center"
          style={{
            maxWidth: `${CONTENT_MAX_WIDTH}px`,
            paddingLeft: `${CONTENT_PADDING_X}px`,
            paddingRight: `${CONTENT_PADDING_X}px`,
            gap: `${CONTENT_GAP}px`,
            opacity: ANIM_ENABLED ? 0 : 1,
          }}
        >
          {/* 타이틀 그룹 */}
          {TITLE_GROUP_ENABLED && (
            <div
              className={`w-full flex flex-col ${getItemsAlign(TITLE_GROUP_ALIGN)}`}
              style={{
                transform: `translate(${TITLE_GROUP_X}px, ${TITLE_GROUP_Y}px)`,
                textAlign: getTextAlign(TITLE_GROUP_ALIGN),
                gap: `${COPY_GAP}px`,
              }}
            >
              {/* 메인 카피 */}
              {MAIN_COPY_ENABLED && (
                <h1
                  style={{
                    fontSize: `${MAIN_COPY_SIZE}px`,
                    fontWeight: MAIN_COPY_WEIGHT,
                    color: MAIN_COPY_COLOR,
                    letterSpacing: `${MAIN_COPY_LETTER_SPACING}px`,
                    lineHeight: MAIN_COPY_LINE_HEIGHT,
                    transform: `translate(${MAIN_COPY_X}px, ${MAIN_COPY_Y}px)`,
                  }}
                >
                  {MAIN_COPY}
                </h1>
              )}

              {/* 서브 카피 */}
              {SUB_COPY_ENABLED && (
                <p
                  style={{
                    fontSize: `${SUB_COPY_SIZE}px`,
                    fontWeight: SUB_COPY_WEIGHT,
                    color: SUB_COPY_COLOR,
                    letterSpacing: `${SUB_COPY_LETTER_SPACING}px`,
                    lineHeight: SUB_COPY_LINE_HEIGHT,
                    transform: `translate(${SUB_COPY_X}px, ${SUB_COPY_Y}px)`,
                  }}
                >
                  {SUB_COPY}
                </p>
              )}
            </div>
          )}

          {/* ================================================
              📌 단지배치도 이미지 영역
              ================================================ */}
          {LAYOUT_IMAGE_ENABLED && (
            <Image
              src={LAYOUT_IMAGE_SRC}
              alt={LAYOUT_IMAGE_ALT}
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
          )}

        </div>
      </section>

      <Footer />
    </main>
  )
}
