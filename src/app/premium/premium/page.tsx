"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"

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
  MOBILE_CARD_GRID_COLUMNS,
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
  CARD_GRID_ENABLED,
  CARD_GRID_COLUMNS,
  CARD_GRID_GAP_X,
  CARD_GRID_GAP_Y,
  CARD_MAX_WIDTH,
  CARD_FRAME_ASPECT_RATIO,
  CARD_FRAME_BG,
  CARD_BG_COLOR,
  CARD_BORDER_COLOR,
  CARD_BORDER_WIDTH,
  CARD_BORDER_RADIUS,
  CARD_SHADOW,
  CARD_PADDING,
  CARD_LABEL_SIZE,
  CARD_LABEL_WEIGHT,
  CARD_LABEL_COLOR,
  CARD_LABEL_FONT,
  CARD_LINE_ENABLED,
  CARD_LINE_WIDTH,
  CARD_LINE_HEIGHT,
  CARD_LINE_COLOR,
  CARD_LINE_GAP,
  CARD_TEXT_INDENT,
  CARD_TITLE_SIZE,
  CARD_TITLE_WEIGHT,
  CARD_TITLE_COLOR,
  PREMIUM_CARDS,
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

export default function PremiumDetailPage() {
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
  const cardGridColumns = isMobile ? MOBILE_CARD_GRID_COLUMNS : CARD_GRID_COLUMNS

  return (
    <main className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: SECTION_BG }}>
      <Header />

      {/* 프리미엄 섹션 - flex-1로 남은 공간 채움 */}
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

          {/* 프리미엄 카드 그리드 섹션 */}
          {CARD_GRID_ENABLED && (
            <div
              className="w-full grid justify-items-center"
              style={{
                gridTemplateColumns: `repeat(${cardGridColumns}, 1fr)`,
                gap: `${CARD_GRID_GAP_Y}px ${CARD_GRID_GAP_X}px`,
              }}
            >
              {PREMIUM_CARDS.map((card, index) => (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden w-full"
                  style={{
                    maxWidth: `${CARD_MAX_WIDTH}px`,
                    backgroundColor: CARD_BG_COLOR,
                    border: `${CARD_BORDER_WIDTH}px solid ${CARD_BORDER_COLOR}`,
                    borderRadius: `${CARD_BORDER_RADIUS}px`,
                    boxShadow: CARD_SHADOW,
                  }}
                >
                  {/* 넘버 라벨 + 가로선 (상단) */}
                  <div
                    className="flex items-center"
                    style={{
                      padding: `${CARD_PADDING}px`,
                      paddingLeft: `${CARD_PADDING + CARD_TEXT_INDENT}px`,
                      paddingBottom: '8px',
                      gap: `${CARD_LINE_GAP}px`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: `${CARD_LABEL_SIZE}px`,
                        fontWeight: CARD_LABEL_WEIGHT,
                        fontFamily: CARD_LABEL_FONT,
                        color: CARD_LABEL_COLOR,
                      }}
                    >
                      {card.label}
                    </span>
                    {CARD_LINE_ENABLED && (
                      <div
                        style={{
                          width: `${CARD_LINE_WIDTH}px`,
                          height: `${CARD_LINE_HEIGHT}px`,
                          backgroundColor: CARD_LINE_COLOR,
                        }}
                      />
                    )}
                  </div>

                  {/* 미디어 프레임 (16:9 비율) */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: '100%',
                      aspectRatio: CARD_FRAME_ASPECT_RATIO,
                      backgroundColor: CARD_FRAME_BG,
                    }}
                  >
                    {card.mediaType === 'image' && (
                      <Image
                        src={card.mediaSrc}
                        alt={card.title}
                        fill
                        className="object-cover"
                        priority={index < 4}
                      />
                    )}
                    {card.mediaType === 'video' && (
                      <video
                        src={card.mediaSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* 타이틀 (하단) */}
                  <div
                    style={{
                      padding: `${CARD_PADDING}px`,
                      paddingLeft: `${CARD_PADDING + CARD_TEXT_INDENT}px`,
                      paddingTop: '12px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: `${CARD_TITLE_SIZE}px`,
                        fontWeight: CARD_TITLE_WEIGHT,
                        color: CARD_TITLE_COLOR,
                        textAlign: 'left',
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 모바일 확대 안내 문구 */}
          {isMobile && (
            <p
              className="text-center w-full"
              style={{
                fontSize: `${MOBILE_ZOOM_HINT_SIZE}px`,
                color: MOBILE_ZOOM_HINT_COLOR,
                marginTop: '8px',
              }}
            >
              {MOBILE_ZOOM_HINT_TEXT}
            </p>
          )}

        </div>
      </section>

      <Footer />
    </main>
  )
}
