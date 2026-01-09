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
  MOBILE_TABLE_FONT_SIZE,
  MOBILE_TABLE_HEADER_WIDTH,
  MOBILE_TABLE_ROW_HEIGHT,
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
  BUSINESS_IMAGE_SRC,
  BUSINESS_IMAGE_ALT,
  TABLE_ENABLED,
  TABLE_BORDER_COLOR,
  TABLE_HEADER_BG,
  TABLE_HEADER_COLOR,
  TABLE_HEADER_WEIGHT,
  TABLE_HEADER_WIDTH,
  TABLE_CONTENT_COLOR,
  TABLE_CONTENT_WEIGHT,
  TABLE_FONT_SIZE,
  TABLE_ROW_HEIGHT,
  TABLE_ACCENT_COLOR,
  TABLE_DATA,
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

export default function BusinessPage() {
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
  const tableFontSize = isMobile ? MOBILE_TABLE_FONT_SIZE : TABLE_FONT_SIZE
  const tableHeaderWidth = isMobile ? MOBILE_TABLE_HEADER_WIDTH : TABLE_HEADER_WIDTH
  const tableRowHeight = isMobile ? MOBILE_TABLE_ROW_HEIGHT : TABLE_ROW_HEIGHT
  const sectionPaddingBottom = isMobile ? MOBILE_SECTION_PADDING_BOTTOM : SECTION_PADDING_BOTTOM

  return (
    <main className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: SECTION_BG }}>
      <Header />

      {/* 사업안내 섹션 - flex-1로 남은 공간 채움 */}
      <section
        className="relative flex flex-col items-center flex-1"
        style={{
          backgroundColor: SECTION_BG,
          paddingTop: `${titlePaddingTop}px`,
          paddingBottom: `${sectionPaddingBottom}px`,
        }}
      >
        {/* 콘텐츠 컨테이너 - 모든 요소가 이 안에 배치됨 */}
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

          {/* 사업개요 이미지 */}
          <Image
            src={BUSINESS_IMAGE_SRC}
            alt={BUSINESS_IMAGE_ALT}
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
          />

          {/* 사업개요 표 */}
          {TABLE_ENABLED && (
            <table className="w-full border-collapse" style={{ fontSize: `${tableFontSize}px`, tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: `${tableHeaderWidth}px` }} />
                <col />
              </colgroup>
              <tbody>
                {TABLE_DATA.map((row, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: `1px solid ${TABLE_BORDER_COLOR}`,
                      borderTop: index === 0 ? `1px solid ${TABLE_BORDER_COLOR}` : 'none',
                    }}
                  >
                    {/* 라벨 (헤더) */}
                    <td
                      style={{
                        minHeight: `${tableRowHeight}px`,
                        height: `${tableRowHeight}px`,
                        backgroundColor: TABLE_HEADER_BG,
                        color: TABLE_HEADER_COLOR,
                        fontWeight: TABLE_HEADER_WEIGHT,
                        paddingLeft: isMobile ? '10px' : '16px',
                        paddingRight: isMobile ? '6px' : '8px',
                        borderLeft: `3px solid ${TABLE_ACCENT_COLOR}`,
                        verticalAlign: 'middle',
                      }}
                    >
                      {row.label}
                    </td>
                    {/* 내용 */}
                    <td
                      style={{
                        minHeight: `${tableRowHeight}px`,
                        color: TABLE_CONTENT_COLOR,
                        fontWeight: TABLE_CONTENT_WEIGHT,
                        paddingLeft: isMobile ? '12px' : '24px',
                        paddingRight: isMobile ? '10px' : '16px',
                        paddingTop: isMobile ? '8px' : '12px',
                        paddingBottom: isMobile ? '8px' : '12px',
                        borderLeft: `1px solid ${TABLE_BORDER_COLOR}`,
                        borderRight: `1px solid ${TABLE_BORDER_COLOR}`,
                        wordBreak: 'break-word',
                        lineHeight: 1.5,
                        verticalAlign: 'middle',
                      }}
                    >
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

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
