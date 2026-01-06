"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"

// ============================================
// ✨ 프리미엄 페이지 설정
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
const MAIN_COPY = "군산지곡 성원상떼빌 프리미엄";  // 메인 카피 텍스트
const MAIN_COPY_SIZE = 45;                   // 글자 크기 (px)
const MAIN_COPY_WEIGHT = 800;                // 글자 굵기 - 100~900
const MAIN_COPY_COLOR = "rgba(0,28,61,1)";   // 글자 색상 - rgba(R,G,B,투명도 0~1)
const MAIN_COPY_LETTER_SPACING = 0;          // 자간 (px)
const MAIN_COPY_LINE_HEIGHT = 1.2;           // 줄 높이 - 1.0=글자크기, 1.5=1.5배
const MAIN_COPY_X = 0;                       // 좌우 미세 조정 (px)
const MAIN_COPY_Y = 0;                       // 상하 미세 조정 (px)

// 서브 카피 설정
const SUB_COPY_ENABLED = true;               // 서브 카피 사용 여부
const SUB_COPY = "특별한 주거 가치를 선사하는 프리미엄 아파트";  // 서브 카피 텍스트
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
// 🎯 프리미엄 카드 그리드 설정
// ============================================
const CARD_GRID_ENABLED = true;              // 카드 그리드 사용 여부
const CARD_GRID_COLUMNS = 2;                 // 열 개수 (2열 그리드)
const CARD_GRID_GAP_X = 40;                  // 카드 간 가로 간격 (px) - 중앙 간격
const CARD_GRID_GAP_Y = 40;                  // 카드 간 세로 간격 (px)
const CARD_MAX_WIDTH = 450;                  // 카드 최대 너비 (px)

// 카드 미디어 프레임 설정 (16:9 비율)
// 📌 이미지 또는 영상을 교체할 때 이 프레임 안에 넣으면 됨
const CARD_FRAME_ASPECT_RATIO = "16/9";      // 프레임 비율 - "16/9", "4/3", "1/1" 등
const CARD_FRAME_BG = "rgba(240,240,240,1)"; // 프레임 배경색 (이미지 없을 때 표시)

// 카드 스타일 설정
const CARD_BG_COLOR = "rgba(255,255,255,1)"; // 카드 배경색
const CARD_BORDER_COLOR = "rgba(230,230,230,1)"; // 카드 테두리 색상
const CARD_BORDER_WIDTH = 1;                 // 카드 테두리 두께 (px)
const CARD_BORDER_RADIUS = 8;                // 카드 모서리 둥글기 (px)
const CARD_SHADOW = "0 2px 8px rgba(0,0,0,0.08)"; // 카드 그림자
const CARD_PADDING = 24;                     // 카드 내부 여백 (px)

// 카드 넘버 라벨 설정
const CARD_LABEL_SIZE = 45;                  // 라벨 글자 크기 (px)
const CARD_LABEL_WEIGHT = 700;               // 라벨 글자 굵기 - 얇게
const CARD_LABEL_COLOR = "rgba(180,180,180,1)"; // 라벨 색상 (연한 회색)
const CARD_LABEL_FONT = "'Times New Roman', 'Georgia', serif"; // 세리프 폰트

// 카드 라벨 옆 가로선 설정
const CARD_LINE_ENABLED = true;              // 가로선 사용 여부
const CARD_LINE_WIDTH = 100;                  // 가로선 길이 (px)
const CARD_LINE_HEIGHT = 1;                  // 가로선 두께 (px)
const CARD_LINE_COLOR = "rgba(200,200,200,1)"; // 가로선 색상
const CARD_LINE_GAP = 20;                    // 숫자와 선 사이 간격 (px)

// 카드 내부 텍스트 좌측 여백 (라벨, 타이틀)
const CARD_TEXT_INDENT = 10;                  // 텍스트 좌측 추가 여백 (px) - 양수: 우측으로

// 카드 타이틀 설정
const CARD_TITLE_SIZE = 18;                  // 타이틀 글자 크기 (px)
const CARD_TITLE_WEIGHT = 700;               // 타이틀 글자 굵기
const CARD_TITLE_COLOR = "rgba(30,30,30,1)"; // 타이틀 색상

// ============================================
// 📋 프리미엄 카드 데이터
// ============================================
// 📌 미디어 교체 방법:
//    - 이미지: mediaType을 "image"로 설정, mediaSrc에 이미지 경로
//    - 영상: mediaType을 "video"로 설정, mediaSrc에 영상 경로
//    - 프레임만: mediaType을 "none"으로 설정 (배경색만 표시)
const PREMIUM_CARDS = [
  {
    label: "01",
    title: "탁트인 교통환경",
    mediaType: "image" as const,             // "image" | "video" | "none"
    mediaSrc: "/herosection.jpg",            // 이미지/영상 경로
  },
  {
    label: "02",
    title: "쾌적한 생활환경",
    mediaType: "image" as const,
    mediaSrc: "/herosection.jpg",
  },
  {
    label: "03",
    title: "넉넉한 교육환경",
    mediaType: "image" as const,
    mediaSrc: "/herosection.jpg",
  },
  {
    label: "04",
    title: "꿈꾸던 커뮤니티",
    mediaType: "image" as const,
    mediaSrc: "/herosection.jpg",
  },
  {
    label: "05",
    title: "고품격 명품설계",
    mediaType: "image" as const,
    mediaSrc: "/herosection.jpg",
  },
  {
    label: "06",
    title: "군산의 생활중심",
    mediaType: "image" as const,
    mediaSrc: "/herosection.jpg",
  },
  {
    label: "07",
    title: "풍부한 개발호재",
    mediaType: "image" as const,
    mediaSrc: "/herosection.jpg",
  },
  {
    label: "08",
    title: "10년 민간임대",
    mediaType: "image" as const,
    mediaSrc: "/herosection.jpg",
  },
];
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

export default function PremiumDetailPage() {
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

      {/* 프리미엄 섹션 - flex-1로 남은 공간 채움 */}
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
              📌 프리미엄 카드 그리드 섹션
              ================================================ */}
          {CARD_GRID_ENABLED && (
            <div
              className="w-full grid justify-items-center"
              style={{
                gridTemplateColumns: `repeat(${CARD_GRID_COLUMNS}, 1fr)`,
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

        </div>
      </section>

      <Footer />
    </main>
  )
}
