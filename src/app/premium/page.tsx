"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"
import Lottie from "lottie-react"
import pinchZoomAnimation from "../../../public/pinch-zoom.json"

// 설정값 import (config.ts에서 값 수정 가능)
import {
  SECTION_BG,
  SECTION_PADDING_BOTTOM,
  ANIM_ENABLED,
  ANIM_DURATION,
  ANIM_EASE,
  ANIM_Y_OFFSET,
  ANIM_DELAY,
  CONTENT_MAX_WIDTH,
  CONTENT_PADDING_X,
  CONTENT_GAP,
  MOBILE_CONTENT_PADDING_X,
  MOBILE_CONTENT_GAP,
  MOBILE_TITLE_PADDING_TOP,
  MOBILE_MAIN_COPY_SIZE,
  MOBILE_SUB_COPY_SIZE,
  MOBILE_SECTION_PADDING_BOTTOM,
  MOBILE_ZOOM_HINT_TEXT,
  MOBILE_ZOOM_HINT_SIZE,
  MOBILE_ZOOM_HINT_COLOR,
  TITLE_GROUP_ENABLED,
  TITLE_GROUP_X,
  TITLE_GROUP_Y,
  TITLE_GROUP_PADDING_TOP,
  TITLE_GROUP_ALIGN,
  MAIN_COPY_ENABLED,
  MAIN_COPY,
  MAIN_COPY_SIZE,
  MAIN_COPY_WEIGHT,
  MAIN_COPY_COLOR,
  MAIN_COPY_LETTER_SPACING,
  MAIN_COPY_LINE_HEIGHT,
  MAIN_COPY_X,
  MAIN_COPY_Y,
  SUB_COPY_ENABLED,
  SUB_COPY,
  SUB_COPY_SIZE,
  SUB_COPY_WEIGHT,
  SUB_COPY_COLOR,
  SUB_COPY_LETTER_SPACING,
  SUB_COPY_LINE_HEIGHT,
  SUB_COPY_X,
  SUB_COPY_Y,
  COPY_GAP,
  LOCATION_SECTION_ENABLED,
  LOCATION_SECTION_MAX_WIDTH,
  LOCATION_DATA,
  LOCATION_CATEGORY_SIZE,
  LOCATION_CATEGORY_WEIGHT,
  LOCATION_CATEGORY_SPACING,
  LOCATION_TITLE_SIZE,
  LOCATION_TITLE_WEIGHT,
  LOCATION_TITLE_COLOR,
  LOCATION_DESC_SIZE,
  LOCATION_DESC_WEIGHT,
  LOCATION_DESC_COLOR,
  LOCATION_ACCENT_COLOR,
  LOCATION_LINE_COLOR,
  LOCATION_IMAGE_WIDTH,
  LOCATION_IMAGE_HEIGHT,
  LOCATION_ITEM_GAP,
} from "./config"

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

export default function PremiumPage() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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

  // 반응형 값 계산
  const paddingX = isMobile ? MOBILE_CONTENT_PADDING_X : CONTENT_PADDING_X
  const contentGap = isMobile ? MOBILE_CONTENT_GAP : CONTENT_GAP
  const titlePaddingTop = isMobile ? MOBILE_TITLE_PADDING_TOP : TITLE_GROUP_PADDING_TOP
  const mainCopySize = isMobile ? MOBILE_MAIN_COPY_SIZE : MAIN_COPY_SIZE
  const subCopySize = isMobile ? MOBILE_SUB_COPY_SIZE : SUB_COPY_SIZE
  const sectionPaddingBottom = isMobile ? MOBILE_SECTION_PADDING_BOTTOM : SECTION_PADDING_BOTTOM

  return (
    <main className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: SECTION_BG }}>
      <Header />

      {/* 입지환경 섹션 - flex-1로 남은 공간 채움 */}
      <section
        className="relative flex flex-col items-center flex-1"
        style={{
          backgroundColor: SECTION_BG,
          paddingTop: `${titlePaddingTop}px`,
          paddingBottom: `${sectionPaddingBottom}px`,
        }}
      >
        {/* 콘텐츠 컨테이너 */}
        <div
          ref={contentRef}
          className="w-full flex flex-col items-center"
          style={{
            maxWidth: isMobile ? '100%' : `${CONTENT_MAX_WIDTH}px`,
            paddingLeft: `${paddingX}px`,
            paddingRight: `${paddingX}px`,
            gap: `${contentGap}px`,
            opacity: ANIM_ENABLED ? 0 : 1,
          }}
        >
          {/* 타이틀 그룹 */}
          {TITLE_GROUP_ENABLED && (
            <div
              className={`w-full flex flex-col ${getItemsAlign(TITLE_GROUP_ALIGN)}`}
              style={{
                transform: isMobile ? 'none' : `translate(${TITLE_GROUP_X}px, ${TITLE_GROUP_Y}px)`,
                textAlign: getTextAlign(TITLE_GROUP_ALIGN),
                gap: `${COPY_GAP}px`,
              }}
            >
              {/* 메인 카피 */}
              {MAIN_COPY_ENABLED && (
                <h1
                  style={{
                    fontSize: `${mainCopySize}px`,
                    fontWeight: MAIN_COPY_WEIGHT,
                    color: MAIN_COPY_COLOR,
                    letterSpacing: `${MAIN_COPY_LETTER_SPACING}px`,
                    lineHeight: MAIN_COPY_LINE_HEIGHT,
                    transform: isMobile ? 'none' : `translate(${MAIN_COPY_X}px, ${MAIN_COPY_Y}px)`,
                  }}
                >
                  {MAIN_COPY}
                </h1>
              )}

              {/* 서브 카피 */}
              {SUB_COPY_ENABLED && (
                <p
                  style={{
                    fontSize: `${subCopySize}px`,
                    fontWeight: SUB_COPY_WEIGHT,
                    color: SUB_COPY_COLOR,
                    letterSpacing: `${SUB_COPY_LETTER_SPACING}px`,
                    lineHeight: SUB_COPY_LINE_HEIGHT,
                    transform: isMobile ? 'none' : `translate(${SUB_COPY_X}px, ${SUB_COPY_Y}px)`,
                  }}
                >
                  {SUB_COPY}
                </p>
              )}
            </div>
          )}

          {/* ================================================
              📌 콘텐츠 영역 - 이미지, 글자, 도표 등 추가
              ================================================ */}

          {/* 입지환경 이미지 1 */}
          <Image
            src="/Location-environment-image1.jpg"
            alt="입지환경 이미지 1"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />

          {/* 입지환경 이미지 2 */}
          <Image
            src="/Location-environment-image2.jpg"
            alt="입지환경 이미지 2"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />

          {/* 입지 정보 이미지 */}
          <Image
            src="/environment2.jpg"
            alt="입지 정보"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />

          {/* 모바일 확대 안내 문구 + 핀치 줌 애니메이션 */}
          {isMobile && (
            <div
              className="flex flex-col items-center w-full"
              style={{ marginTop: '16px', gap: '4px' }}
            >
              <Lottie
                animationData={pinchZoomAnimation}
                loop={true}
                style={{ width: '56px', height: '56px' }}
              />
              <p
                className="text-center"
                style={{
                  fontSize: `${MOBILE_ZOOM_HINT_SIZE}px`,
                  color: MOBILE_ZOOM_HINT_COLOR,
                }}
              >
                {MOBILE_ZOOM_HINT_TEXT}
              </p>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  )
}
