import Image from "next/image";

// ============================================
// 🎨 푸터 설정
// ============================================

// 왼쪽 그룹 설정 (로고 + 회사 정보 + 카피라이트 전체)
const LEFT_GROUP_X = 0;               // 전체 그룹 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
const LEFT_GROUP_Y = 0;               // 전체 그룹 상하 위치 (px) - 음수: 위로, 양수: 아래로
const LEFT_GROUP_GAP = 30;            // 로고 ↔ 회사 정보 ↔ 카피라이트 간격 (px)
const LEFT_GROUP_ALIGN_X = "left";    // 가로 정렬 - "left", "center", "right"
const LEFT_GROUP_ALIGN_Y = "center";     // 세로 정렬 - "top", "center", "bottom"

// 로고 설정
const LOGO_SRC = "/footer-image-logo.png";  // 로고 이미지 이름을 적어주세요 (public 폴더)
const LOGO_SIZE = 250;                // 로고 크기 (px) - 가로 기준, 세로는 비율 자동
const LOGO_X = 0;                     // 로고 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
const LOGO_Y = 0;                     // 로고 상하 위치 (px) - 음수: 위로, 양수: 아래로

// 회사 정보 설정
const COMPANY_INFO_X = 0;             // 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
const COMPANY_INFO_Y = 0;             // 상하 위치 (px) - 음수: 위로, 양수: 아래로
const COMPANY_INFO = [
  { label: "현장명", value: "군산 지곡동 성원상떼빌 더프라임" },
  { label: "현장 위치", value: "전라북도 군산시 지곡동 62-8일원 공동주택 신축공사" },
  { label: "상담 문의", value: "1833-5859" },
];
const COMPANY_LABEL_WIDTH = 100;      // 라벨 너비 (px) - 정렬용
const COMPANY_INFO_SIZE = 15;         // 글자 크기 (px)
const COMPANY_LABEL_COLOR = "rgba(255,255,255,1)"; // 라벨 색상 - rgba(R,G,B,투명도 0~1)
const COMPANY_VALUE_COLOR = "rgba(255,255,255,1)"; // 값 색상 - rgba(R,G,B,투명도 0~1)
const COMPANY_INFO_GAP = 4;           // 줄 사이 간격 (px)

// 카피라이트 설정
const COPYRIGHT_X = 0;                // 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
const COPYRIGHT_Y = 0;                // 상하 위치 (px) - 음수: 위로, 양수: 아래로
const COPYRIGHT_LINES = [
  "※ 본 사이트의 CG, 이미지 등은 소비자의 이해를 돕기 위해 제작된 것으로 실제와 다를 수 있습니다.",
  "※ 본 사이트 및 이미지는 (주)픽소코퍼레이션 제작이며, 동의 없이 무단 도용할 경우 법적인 처벌을 받으실 수 있습니다.",
  "Copyright ⓒ 군산지곡 성원상떼빌 더프라임 All Rights Reserved by",
];
const COPYRIGHT_SIZE = 12;            // 글자 크기 (px)
const COPYRIGHT_WEIGHT = 400;         // 글자 굵기 - 100~900 (400: 보통, 500: 중간, 700: 굵게)
const COPYRIGHT_COLOR = "rgba(107,114,128,1)"; // 글자 색상 - rgba(R,G,B,투명도 0~1)
const COPYRIGHT_GAP = 4;              // 줄 사이 간격 (px)

// 오른쪽 그룹 설정 (대표번호 + 더 알아보기 + SNS 로고 전체)
const RIGHT_GROUP_X = 0;              // 전체 그룹 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
const RIGHT_GROUP_Y = 55;             // 전체 그룹 상하 위치 (px) - 음수: 위로, 양수: 아래로
const RIGHT_GROUP_GAP = 10;           // 대표번호 ↔ 더 알아보기 ↔ SNS 로고 간격 (px)
const RIGHT_GROUP_ALIGN_X = "right";  // 가로 정렬 - "left", "center", "right"
const RIGHT_GROUP_ALIGN_Y = "top"; // 세로 정렬 - "top", "center", "bottom"

// 대표번호 설정
const PHONE_X = 0;                    // 전체 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
const PHONE_Y = 0;                    // 전체 상하 위치 (px) - 음수: 위로, 양수: 아래로
const PHONE_LABEL = "대표번호";
const PHONE_LABEL_X = 0;              // 라벨 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
const PHONE_LABEL_Y = 1;              // 라벨 상하 위치 (px) - 음수: 위로, 양수: 아래로
const PHONE_LABEL_SIZE = 23;          // 라벨 글자 크기 (px)
const PHONE_LABEL_WEIGHT = 300;       // 라벨 굵기 - 100~900
const PHONE_LABEL_COLOR = "rgba(255,255,255,1)"; // 라벨 색상 - rgba(R,G,B,투명도 0~1)
const PHONE_NUMBER = "1833-5859";
const PHONE_NUMBER_X = 0;             // 번호 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
const PHONE_NUMBER_Y = 0;             // 번호 상하 위치 (px) - 음수: 위로, 양수: 아래로
const PHONE_NUMBER_SIZE = 35;         // 번호 글자 크기 (px)
const PHONE_NUMBER_WEIGHT = 900;      // 번호 굵기 - 100~900
const PHONE_NUMBER_COLOR = "rgba(255,255,255,1)"; // 번호 색상 - rgba(R,G,B,투명도 0~1)
const PHONE_GAP = 15;                 // 라벨과 번호 사이 간격 (px)

// 더 알아보기 설정
const EXPLORE_X = 0;                  // 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
const EXPLORE_Y = 0;                  // 상하 위치 (px) - 음수: 위로, 양수: 아래로
const EXPLORE_TITLE = "더 알아보기";
const EXPLORE_TITLE_SIZE = 18;        // 제목 글자 크기 (px)
const EXPLORE_TITLE_WEIGHT = 300;     // 제목 굵기 - 100~900
const EXPLORE_TITLE_COLOR = "rgba(178,190,190,1)"; // 제목 색상 - rgba(R,G,B,투명도 0~1)

// SNS 로고 설정
const SNS_X = 0;                      // 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
const SNS_Y = 0;                      // 상하 위치 (px) - 음수: 위로, 양수: 아래로
const SNS_ICONS = [
  { src: "/naver_blog_logo 1.png", alt: "네이버 블로그", href: "#" },
  { src: "/instagram-logo-png-transparent-background-300x300.png", alt: "인스타그램", href: "https://www.instagram.com/house_unni/reels/" },
  { src: "/pngegg.png", alt: "유튜브", href: "https://www.youtube.com/@%EC%A7%91%EC%9E%98%EB%B3%B4%EB%8A%94%EC%96%B8%EB%8B%88" },
  { src: "/KakaoTalk_logo.svg.png", alt: "카카오톡", href: "https://open.kakao.com/o/sYpCdW6h" },
];
const SNS_ICON_SIZE = 32;             // 로고 크기 (px)
const SNS_ICON_GAP = 16;              // 로고 사이 간격 (px)

// 전체 레이아웃
const FOOTER_BG = "rgba(26,26,26,1)"; // 배경색 - rgba(R,G,B,투명도 0~1)
const FOOTER_HEIGHT = 400;            // 푸터 높이 (px) - 세로 중앙 정렬 기준
const FOOTER_PADDING_X = "px-8";      // px-4, px-6, px-8, px-12, px-16
const CONTENT_GAP = "gap-8";          // gap-4, gap-6, gap-8, gap-12
// ============================================

// 정렬 헬퍼 함수
const getAlignX = (align: string) => {
  if (align === "center") return "items-center";
  if (align === "right") return "items-end";
  return "items-start";
};
const getAlignY = (align: string) => {
  if (align === "center") return "justify-center";
  if (align === "bottom") return "justify-end";
  return "justify-start";
};

export default function Footer() {
  return (
    <footer className={`text-gray-400 ${FOOTER_PADDING_X} overflow-hidden`} style={{ height: `${FOOTER_HEIGHT}px`, backgroundColor: FOOTER_BG }}>
      <div className={`max-w-7xl mx-auto h-full flex flex-col md:flex-row items-stretch justify-between ${CONTENT_GAP}`}>

        {/* 왼쪽: 로고 + 회사 정보 + 카피라이트 */}
        <div
          className={`flex flex-col ${getAlignX(LEFT_GROUP_ALIGN_X)} ${getAlignY(LEFT_GROUP_ALIGN_Y)}`}
          style={{
            transform: `translate(${LEFT_GROUP_X}px, ${LEFT_GROUP_Y}px)`,
            gap: `${LEFT_GROUP_GAP}px`
          }}
        >
          {/* 로고 */}
          <Image
            src={LOGO_SRC}
            alt="Logo"
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            className="object-contain h-auto"
            style={{ transform: `translate(${LOGO_X}px, ${LOGO_Y}px)` }}
          />

          {/* 회사 정보 */}
          <div
            className="flex flex-col"
            style={{
              transform: `translate(${COMPANY_INFO_X}px, ${COMPANY_INFO_Y}px)`,
              gap: `${COMPANY_INFO_GAP}px`
            }}
          >
            {COMPANY_INFO.map((info, index) => (
              <div key={index} className="flex" style={{ fontSize: `${COMPANY_INFO_SIZE}px` }}>
                <span style={{ minWidth: `${COMPANY_LABEL_WIDTH}px`, flexShrink: 0, color: COMPANY_LABEL_COLOR }}>{info.label}</span>
                <span style={{ color: COMPANY_VALUE_COLOR }}>{info.value}</span>
              </div>
            ))}
          </div>

          {/* 카피라이트 */}
          <div
            className="flex flex-col"
            style={{
              transform: `translate(${COPYRIGHT_X}px, ${COPYRIGHT_Y}px)`,
              gap: `${COPYRIGHT_GAP}px`
            }}
          >
            {COPYRIGHT_LINES.map((line, index) => (
              <p
                key={index}
                style={{
                  fontSize: `${COPYRIGHT_SIZE}px`,
                  fontWeight: COPYRIGHT_WEIGHT,
                  color: COPYRIGHT_COLOR
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* 오른쪽: 대표번호 + 더 알아보기 + SNS 로고 */}
        <div
          className={`flex flex-col ${getAlignX(RIGHT_GROUP_ALIGN_X)} ${getAlignY(RIGHT_GROUP_ALIGN_Y)}`}
          style={{
            transform: `translate(${RIGHT_GROUP_X}px, ${RIGHT_GROUP_Y}px)`,
            gap: `${RIGHT_GROUP_GAP}px`
          }}
        >
          {/* 대표번호 */}
          <div
            className="flex items-center"
            style={{
              transform: `translate(${PHONE_X}px, ${PHONE_Y}px)`,
              gap: `${PHONE_GAP}px`
            }}
          >
            <span style={{
              fontSize: `${PHONE_LABEL_SIZE}px`,
              fontWeight: PHONE_LABEL_WEIGHT,
              color: PHONE_LABEL_COLOR,
              transform: `translate(${PHONE_LABEL_X}px, ${PHONE_LABEL_Y}px)`
            }}>
              {PHONE_LABEL}
            </span>
            <span style={{
              fontSize: `${PHONE_NUMBER_SIZE}px`,
              fontWeight: PHONE_NUMBER_WEIGHT,
              color: PHONE_NUMBER_COLOR,
              transform: `translate(${PHONE_NUMBER_X}px, ${PHONE_NUMBER_Y}px)`
            }}>
              {PHONE_NUMBER}
            </span>
          </div>

          {/* 더 알아보기 */}
          <p
            style={{
              transform: `translate(${EXPLORE_X}px, ${EXPLORE_Y}px)`,
              fontSize: `${EXPLORE_TITLE_SIZE}px`,
              fontWeight: EXPLORE_TITLE_WEIGHT,
              color: EXPLORE_TITLE_COLOR
            }}
          >
            {EXPLORE_TITLE}
          </p>

          {/* SNS 로고 */}
          <div
            className="flex"
            style={{
              transform: `translate(${SNS_X}px, ${SNS_Y}px)`,
              gap: `${SNS_ICON_GAP}px`
            }}
          >
            {SNS_ICONS.map((icon, index) => (
              <a
                key={index}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={SNS_ICON_SIZE}
                  height={SNS_ICON_SIZE}
                  className="object-contain"
                />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
