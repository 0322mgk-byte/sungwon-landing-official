"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"
import Lottie from "lottie-react"
import pinchZoomAnimation from "../../../../public/pinch-zoom.json"

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
  MOBILE_NOTICE_SIZE,
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
  LAYOUT_IMAGE_ENABLED,
  LAYOUT_IMAGE_SRC,
  LAYOUT_IMAGE_ALT,
  NOTICE_TEXT,
  NOTICE_SIZE,
  NOTICE_COLOR,
  NOTICE_MARGIN_TOP,
  MOBILE_NOTICE_MARGIN_TOP,
  MOBILE_ZOOM_HINT_TEXT,
  MOBILE_ZOOM_HINT_SIZE,
  MOBILE_ZOOM_HINT_COLOR,
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

// 커뮤니티 시설 데이터
const COMMUNITY_FACILITIES = [
  {
    title: "피트니스센터",
    location: "지하",
    description: "체력단련 및 활력 넘치는 생활을 위해 마련된 운동 공간"
  },
  {
    title: "어린이집",
    location: "지상",
    description: "어린 자녀를 안심하고 맡길 수 있는 든든한 단지 내 보육시설"
  },
  {
    title: "실내골프연습장",
    location: "지하",
    description: "날씨나 계절에 상관없이 골프를 즐기는 실내골프연습장"
  },
  {
    title: "경로당",
    location: "지상",
    description: "어르신들이 휴식을 취하거나 소모임을 즐기는 여유로운 특화 공간"
  },
  {
    title: "공용세탁장",
    location: "지하",
    description: "대형 세탁물을 멀리 가지 않고 단지내에서 편리하게 세탁할 수 있는 공간"
  },
  {
    title: "주민카페",
    location: "지상",
    description: "단지내 주민들이 함께 휴식을 취할 수 있는 쾌적 공간"
  },
  {
    title: "작은도서관",
    location: "",
    description: "아이들이 함께 책을 읽고 공부하며 꿈을 키워가는 행복 공간"
  },
  {
    title: "맘스스테이션",
    location: "",
    description: "아이들의 안전과 부모님의 편의를 위한 어린이 승하차장"
  },
];

export default function CommunityPage() {
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
  const noticeSize = isMobile ? MOBILE_NOTICE_SIZE : NOTICE_SIZE
  const noticeMarginTop = isMobile ? MOBILE_NOTICE_MARGIN_TOP : NOTICE_MARGIN_TOP

  return (
    <main className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: SECTION_BG }}>
      <Header />

      {/* 커뮤니티 섹션 */}
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

          {/* 커뮤니티 이미지 영역 */}
          {LAYOUT_IMAGE_ENABLED && (
            <>
              <Image
                src={LAYOUT_IMAGE_SRC}
                alt={LAYOUT_IMAGE_ALT}
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
              <p style={{ fontSize: `${noticeSize}px`, color: NOTICE_COLOR, marginTop: `${noticeMarginTop}px` }}>
                {NOTICE_TEXT}
              </p>
            </>
          )}

          {/* 커뮤니티 시설 안내 - PC: 이미지 / 모바일: 컴포넌트 */}
          {!isMobile ? (
            <Image
              src="/community2.jpg"
              alt="커뮤니티 시설 안내"
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
          ) : (
            <div className="w-full flex flex-col gap-4 mt-4">
              {COMMUNITY_FACILITIES.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                  style={{ paddingLeft: '4px' }}
                >
                  {/* 파란색 왼쪽 바 */}
                  <div
                    style={{
                      width: '3px',
                      minHeight: '100%',
                      backgroundColor: '#4A7CC9',
                      borderRadius: '2px',
                      alignSelf: 'stretch',
                    }}
                  />
                  {/* 텍스트 영역 */}
                  <div className="flex flex-col gap-1">
                    {/* 제목 + 위치 */}
                    <h3
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#333',
                        lineHeight: 1.3,
                      }}
                    >
                      {facility.title}
                      {facility.location && (
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 400,
                            color: '#888',
                            marginLeft: '4px',
                          }}
                        >
                          ({facility.location})
                        </span>
                      )}
                    </h3>
                    {/* 설명 */}
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: 400,
                        color: '#666',
                        lineHeight: 1.5,
                      }}
                    >
                      {facility.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
