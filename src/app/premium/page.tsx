"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"

// ============================================
// 📍 입지환경 페이지 설정
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
const MAIN_COPY = "군산지곡 성원상떼빌 입지환경";  // 메인 카피 텍스트
const MAIN_COPY_SIZE = 45;                   // 글자 크기 (px)
const MAIN_COPY_WEIGHT = 800;                // 글자 굵기 - 100~900
const MAIN_COPY_COLOR = "rgba(0,28,61,1)";   // 글자 색상 - rgba(R,G,B,투명도 0~1)
const MAIN_COPY_LETTER_SPACING = 0;          // 자간 (px)
const MAIN_COPY_LINE_HEIGHT = 1.2;           // 줄 높이 - 1.0=글자크기, 1.5=1.5배
const MAIN_COPY_X = 0;                       // 좌우 미세 조정 (px)
const MAIN_COPY_Y = 0;                       // 상하 미세 조정 (px)

// 서브 카피 설정
const SUB_COPY_ENABLED = true;               // 서브 카피 사용 여부
const SUB_COPY = "은파호수공원 인접, 지곡 생활권 중심 입지";  // 서브 카피 텍스트
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
// 🗺️ 입지 정보 섹션 설정
// ============================================
const LOCATION_SECTION_ENABLED = true;       // 입지 정보 섹션 사용 여부
const LOCATION_SECTION_MAX_WIDTH = 900;      // 섹션 최대 너비 (px)

// 입지 정보 데이터
// 📌 이미지 경로: public 폴더에 이미지 추가 후 경로 수정 필요
const LOCATION_DATA = [
  {
    category: "TRAFFIC",
    categoryColor: "rgba(65,105,225,1)",      // 카테고리 강조 색상 (파란색)
    title: "더 빠른 교통특권",
    description: ["월명로 인접 군산 중심지 접근 용이", "21번 국도 새만금 산업단지 및 서해안 고속도로"],
    image: "/herosection.jpg",                // TODO: /location/traffic.jpg로 교체
    position: "left",                         // 이미지 위치: "left" 또는 "right"
  },
  {
    category: "LIFE",
    categoryColor: "rgba(65,105,225,1)",
    title: "더 편한 중심생활",
    description: ["단지 앞 근린상가, 의료원, 예술의전당", "수송동중심상권 차량 10분 이용"],
    image: "/herosection.jpg",                // TODO: /location/life.jpg로 교체
    position: "right",
  },
  {
    category: "VALUE",
    categoryColor: "rgba(65,105,225,1)",
    title: "안심도보 교육환경",
    description: ["군산초·고 3분거리 및 동산중 도보권 통학 위치", "사업지 인근 풍부한 학원 시설", "나운·수송동 입시학원 이용 편리"],
    image: "/herosection.jpg",                // TODO: /location/value.jpg로 교체
    position: "left",
  },
  {
    category: "NATURE",
    categoryColor: "rgba(65,105,225,1)",
    title: "더 빛날 자연환경",
    description: ["은파 호수공원 산책로, 체육공원 등 인접", "쾌적한 주거환경 우수"],
    image: "/herosection.jpg",                // TODO: /location/nature.jpg로 교체
    position: "right",
  },
];

// 입지 정보 스타일 설정
const LOCATION_CATEGORY_SIZE = 13;           // 카테고리 글자 크기 (px)
const LOCATION_CATEGORY_WEIGHT = 500;        // 카테고리 글자 굵기
const LOCATION_CATEGORY_SPACING = 2;         // 카테고리 자간 (px)
const LOCATION_TITLE_SIZE = 24;              // 타이틀 글자 크기 (px)
const LOCATION_TITLE_WEIGHT = 700;           // 타이틀 글자 굵기
const LOCATION_TITLE_COLOR = "rgba(30,30,30,1)"; // 타이틀 색상
const LOCATION_DESC_SIZE = 14;               // 설명 글자 크기 (px)
const LOCATION_DESC_WEIGHT = 400;            // 설명 글자 굵기
const LOCATION_DESC_COLOR = "rgba(80,80,80,1)"; // 설명 색상
const LOCATION_ACCENT_COLOR = "rgba(65,105,225,1)"; // 강조 색상 (세로선)
const LOCATION_LINE_COLOR = "rgba(200,210,220,1)"; // 연결선 색상
const LOCATION_IMAGE_WIDTH = 320;            // 이미지 너비 (px)
const LOCATION_IMAGE_HEIGHT = 220;           // 이미지 높이 (px)
const LOCATION_ITEM_GAP = 60;                // 항목 간 세로 간격 (px)
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

export default function PremiumPage() {
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

      {/* 입지환경 섹션 - flex-1로 남은 공간 채움 */}
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

        </div>
      </section>

      <Footer />
    </main>
  )
}
