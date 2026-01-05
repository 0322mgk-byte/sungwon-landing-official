"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"

// ============================================
// 🏢 사업안내 페이지 설정
// ============================================
const SECTION_BG = "rgba(255,255,255,1)"     // 배경색 - rgba(R,G,B,투명도 0~1)
const SECTION_PADDING_BOTTOM = 80;           // 섹션 하단 여백 (px)

// ============================================
// 📦 콘텐츠 컨테이너 설정
// ============================================
const CONTENT_MAX_WIDTH = 1000;               // 콘텐츠 최대 너비 (px) - 이미지/글자/도표 기준
const CONTENT_PADDING_X = 20;                // 좌우 여백 (px) - 모바일 대응
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
const MAIN_COPY = "군산지곡 성원상떼빌 사업개요";  // 메인 카피 텍스트
const MAIN_COPY_SIZE = 45;                   // 글자 크기 (px)
const MAIN_COPY_WEIGHT = 800;                // 글자 굵기 - 100~900
const MAIN_COPY_COLOR = "rgba(0,28,61,1)";   // 글자 색상 - rgba(R,G,B,투명도 0~1)
const MAIN_COPY_LETTER_SPACING = 0;          // 자간 (px)
const MAIN_COPY_LINE_HEIGHT = 1.2;           // 줄 높이 - 1.0=글자크기, 1.5=1.5배
const MAIN_COPY_X = 0;                       // 좌우 미세 조정 (px)
const MAIN_COPY_Y = 0;                       // 상하 미세 조정 (px)

// 서브 카피 설정
const SUB_COPY_ENABLED = true;               // 서브 카피 사용 여부
const SUB_COPY = "실속 있는 25평, 여유로운 34평 총 545세대";  // 서브 카피 텍스트
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
// 📊 사업개요 표 설정
// ============================================
const TABLE_ENABLED = true;                  // 표 사용 여부
const TABLE_BORDER_COLOR = "rgba(230,230,230,1)"; // 테두리 색상
const TABLE_HEADER_BG = "rgba(249,249,249,1)";    // 헤더 배경색
const TABLE_HEADER_COLOR = "rgba(0,0,0,1)";       // 헤더 글자색
const TABLE_HEADER_WEIGHT = 600;                  // 헤더 글자 굵기
const TABLE_HEADER_WIDTH = 180;                   // 헤더 열 너비 (px)
const TABLE_CONTENT_COLOR = "rgba(50,50,50,1)";   // 내용 글자색
const TABLE_CONTENT_WEIGHT = 400;                 // 내용 글자 굵기
const TABLE_FONT_SIZE = 20;                       // 글자 크기 (px)
const TABLE_ROW_HEIGHT = 60;                       // 행 최소 높이 (px)
const TABLE_ACCENT_COLOR = "rgba(255,100,0,1)";   // 강조 색상 (왼쪽 라인)

// 표 데이터 (7행 2열)
const TABLE_DATA = [
  { label: "단지명", value: "군산 지곡 성원상떼빌 더프라임" },
  { label: "위치", value: "전라북도 군산시 지곡동 62-8 일원" },
  { label: "규 모", value: "지하 2층 ~ 지상 29층 6개동 / 545세대" },
  { label: "주차대수", value: "831대(세대 당 1.52대)" },
  { label: "지역 / 지구", value: "도시지역, 제2종일반주거지역, 교육환경보호구역" },
  { label: "대지면적", value: "23,964㎡ (9,843.96평)" },
  { label: "연면적", value: "87,460.37.26㎡(26,456.76평)" },
  { label: "건폐율 및 용적률", value: "24.23% / 249.36%" },
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

export default function BusinessPage() {
  return (
    <main className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: SECTION_BG }}>
      <Header />

      {/* 사업안내 섹션 - flex-1로 남은 공간 채움 */}
      <section
        className="relative flex flex-col items-center flex-1"
        style={{
          backgroundColor: SECTION_BG,
          paddingTop: `${TITLE_GROUP_PADDING_TOP}px`,
          paddingBottom: `${SECTION_PADDING_BOTTOM}px`,
        }}
      >
        {/* 콘텐츠 컨테이너 - 모든 요소가 이 안에 배치됨 */}
        <div
          className="w-full flex flex-col items-center"
          style={{
            maxWidth: `${CONTENT_MAX_WIDTH}px`,
            paddingLeft: `${CONTENT_PADDING_X}px`,
            paddingRight: `${CONTENT_PADDING_X}px`,
            gap: `${CONTENT_GAP}px`,
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
              모든 요소는 최대 너비 800px에 맞춰 자동 조절됨
              이미지는 w-full로 설정하면 비율 유지하며 축소됨
              ================================================ */}

          {/* 사업개요 이미지 */}
          <Image
            src="/sungwon-1234.jpg"
            alt="사업개요"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />

          {/* 사업개요 표 */}
          {TABLE_ENABLED && (
            <table className="w-full border-collapse" style={{ fontSize: `${TABLE_FONT_SIZE}px`, tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: `${TABLE_HEADER_WIDTH}px` }} />
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
                        minHeight: `${TABLE_ROW_HEIGHT}px`,
                        height: `${TABLE_ROW_HEIGHT}px`,
                        backgroundColor: TABLE_HEADER_BG,
                        color: TABLE_HEADER_COLOR,
                        fontWeight: TABLE_HEADER_WEIGHT,
                        paddingLeft: '16px',
                        paddingRight: '8px',
                        borderLeft: `3px solid ${TABLE_ACCENT_COLOR}`,
                        verticalAlign: 'middle',
                      }}
                    >
                      {row.label}
                    </td>
                    {/* 내용 */}
                    <td
                      style={{
                        minHeight: `${TABLE_ROW_HEIGHT}px`,
                        color: TABLE_CONTENT_COLOR,
                        fontWeight: TABLE_CONTENT_WEIGHT,
                        paddingLeft: '24px',
                        paddingRight: '16px',
                        paddingTop: '12px',
                        paddingBottom: '12px',
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

        </div>
      </section>

      <Footer />
    </main>
  )
}
