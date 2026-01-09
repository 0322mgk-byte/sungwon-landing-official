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

          {/* 입지 정보 지그재그 섹션 */}
          {LOCATION_SECTION_ENABLED && (
            <div
              className="relative w-full flex flex-col items-center"
              style={{
                maxWidth: `${LOCATION_SECTION_MAX_WIDTH}px`,
                gap: `${LOCATION_ITEM_GAP}px`,
                paddingTop: '40px',
              }}
            >
              {/* 중앙 연결선 */}
              <div
                className="absolute left-1/2 -translate-x-1/2 hidden md:block"
                style={{
                  top: '60px',
                  bottom: '60px',
                  width: '2px',
                  backgroundColor: LOCATION_LINE_COLOR,
                }}
              />

              {LOCATION_DATA.map((item, index) => (
                <div
                  key={index}
                  className="relative w-full hidden md:grid items-center"
                  style={{
                    gridTemplateColumns: `1fr 160px 1fr`,
                    gap: '0',
                  }}
                >
                  {/* 왼쪽 영역 - 항상 고정 너비 */}
                  <div className="flex justify-end">
                    {item.position === 'left' ? (
                      <div
                        className="relative"
                        style={{
                          width: `${LOCATION_IMAGE_WIDTH}px`,
                          height: `${LOCATION_IMAGE_HEIGHT}px`,
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          style={{ borderRadius: '4px' }}
                        />
                      </div>
                    ) : (
                      <div
                        className="flex flex-col items-end text-right w-full"
                        style={{ gap: '12px', paddingRight: '0px' }}
                      >
                        <span
                          style={{
                            fontSize: `${LOCATION_CATEGORY_SIZE}px`,
                            fontWeight: LOCATION_CATEGORY_WEIGHT,
                            letterSpacing: `${LOCATION_CATEGORY_SPACING}px`,
                            color: 'rgba(100,100,100,1)',
                          }}
                        >
                          LOCATION{' '}
                          <span style={{ color: item.categoryColor, fontWeight: 600 }}>
                            {item.category}
                          </span>
                        </span>
                        <h3
                          style={{
                            fontSize: `${LOCATION_TITLE_SIZE}px`,
                            fontWeight: LOCATION_TITLE_WEIGHT,
                            color: LOCATION_TITLE_COLOR,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <span style={{ color: LOCATION_ACCENT_COLOR, fontSize: '20px' }}>|</span>
                          {item.title}
                          <span style={{ color: LOCATION_ACCENT_COLOR, fontSize: '20px' }}>|</span>
                        </h3>
                        <div className="flex flex-col items-end" style={{ gap: '4px' }}>
                          {item.description.map((desc, descIndex) => (
                            <p
                              key={descIndex}
                              style={{
                                fontSize: `${LOCATION_DESC_SIZE}px`,
                                fontWeight: LOCATION_DESC_WEIGHT,
                                color: LOCATION_DESC_COLOR,
                                lineHeight: 1.6,
                              }}
                            >
                              {desc}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 중앙 아이콘 */}
                  <div className="flex justify-center">
                    <div
                      className="w-12 h-12 rounded-full bg-white flex items-center justify-center z-10"
                      style={{
                        border: `2px solid ${LOCATION_LINE_COLOR}`,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={item.categoryColor}
                        strokeWidth="1.5"
                      >
                        {item.category === 'TRAFFIC' && (
                          <path d="M9 17h6v5H9v-5zm-2 0v5H4v-3a2 2 0 012-2h1zm10 0h1a2 2 0 012 2v3h-3v-5zM5 14h14v3H5v-3zm1-4h12l1 4H5l1-4zm1-3h10v3H7V7zm3-5h4v5h-4V2z" />
                        )}
                        {item.category === 'LIFE' && (
                          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
                        )}
                        {item.category === 'VALUE' && (
                          <path d="M12 3L1 9l11 6 9-4.91V17M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                        )}
                        {item.category === 'NATURE' && (
                          <path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12zM12 6c1.5 0 3 1 3 3s-1.5 3-3 3-3-1-3-3 1.5-3 3-3z" />
                        )}
                      </svg>
                    </div>
                  </div>

                  {/* 오른쪽 영역 */}
                  <div className="flex justify-start">
                    {item.position === 'left' ? (
                      <div
                        className="flex flex-col items-start text-left"
                        style={{ gap: '12px', paddingLeft: '0px' }}
                      >
                        <span
                          style={{
                            fontSize: `${LOCATION_CATEGORY_SIZE}px`,
                            fontWeight: LOCATION_CATEGORY_WEIGHT,
                            letterSpacing: `${LOCATION_CATEGORY_SPACING}px`,
                            color: 'rgba(100,100,100,1)',
                          }}
                        >
                          LOCATION{' '}
                          <span style={{ color: item.categoryColor, fontWeight: 600 }}>
                            {item.category}
                          </span>
                        </span>
                        <h3
                          style={{
                            fontSize: `${LOCATION_TITLE_SIZE}px`,
                            fontWeight: LOCATION_TITLE_WEIGHT,
                            color: LOCATION_TITLE_COLOR,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <span style={{ color: LOCATION_ACCENT_COLOR, fontSize: '20px' }}>|</span>
                          {item.title}
                          <span style={{ color: LOCATION_ACCENT_COLOR, fontSize: '20px' }}>|</span>
                        </h3>
                        <div className="flex flex-col" style={{ gap: '4px' }}>
                          {item.description.map((desc, descIndex) => (
                            <p
                              key={descIndex}
                              style={{
                                fontSize: `${LOCATION_DESC_SIZE}px`,
                                fontWeight: LOCATION_DESC_WEIGHT,
                                color: LOCATION_DESC_COLOR,
                                lineHeight: 1.6,
                              }}
                            >
                              {desc}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div
                        className="relative"
                        style={{
                          width: `${LOCATION_IMAGE_WIDTH}px`,
                          height: `${LOCATION_IMAGE_HEIGHT}px`,
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          style={{ borderRadius: '4px' }}
                        />
                      </div>
                    )}
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
