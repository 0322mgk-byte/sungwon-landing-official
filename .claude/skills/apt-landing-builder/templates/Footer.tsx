import Image from "next/image";

// ============================================
// 🎨 푸터 설정
// ============================================

// 전체 레이아웃
const FOOTER_BG = "rgba(26,26,26,1)";   // 배경색 - rgba(R,G,B,투명도 0~1)
const FOOTER_HEIGHT = 400;              // 푸터 높이 (px)
const FOOTER_PADDING_X = "px-8";        // 좌우 패딩 - px-4, px-6, px-8, px-12, px-16
const CONTENT_GAP = "gap-8";            // 좌우 그룹 간격 - gap-4, gap-6, gap-8, gap-12

// ============================================
// 🖼️ 왼쪽 그룹 설정 (로고 + 회사 정보 + 카피라이트)
// ============================================
const LEFT_GROUP_X = 0;                 // 전체 그룹 좌우 위치 (px)
const LEFT_GROUP_Y = 0;                 // 전체 그룹 상하 위치 (px)
const LEFT_GROUP_GAP = 30;              // 로고 ↔ 회사 정보 ↔ 카피라이트 간격 (px)
const LEFT_GROUP_ALIGN_X = "left";      // 가로 정렬 - "left", "center", "right"
const LEFT_GROUP_ALIGN_Y = "center";    // 세로 정렬 - "top", "center", "bottom"

// 로고 설정
const LOGO_SRC = "/logo-footer.png";    // 로고 이미지 경로 (public 폴더)
const LOGO_SIZE = 200;                  // 로고 크기 (px) - 가로 기준, 세로는 비율 자동
const LOGO_X = 0;                       // 로고 좌우 위치 (px)
const LOGO_Y = 0;                       // 로고 상하 위치 (px)

// 회사 정보 설정
const COMPANY_INFO_X = 0;               // 좌우 위치 (px)
const COMPANY_INFO_Y = 0;               // 상하 위치 (px)
const COMPANY_INFO = [
  { label: "회사명", value: "주식회사 OOO" },
  { label: "주소", value: "서울특별시 강남구 OOO" },
  { label: "연락처", value: "02-1234-5678" },
];
const COMPANY_LABEL_WIDTH = 80;         // 라벨 너비 (px) - 정렬용
const COMPANY_INFO_SIZE = 14;           // 글자 크기 (px)
const COMPANY_LABEL_COLOR = "rgba(255,255,255,1)"; // 라벨 색상 - rgba(R,G,B,투명도 0~1)
const COMPANY_VALUE_COLOR = "rgba(255,255,255,0.8)"; // 값 색상 - rgba(R,G,B,투명도 0~1)
const COMPANY_INFO_GAP = 8;             // 줄 사이 간격 (px)

// 카피라이트 설정
const COPYRIGHT_X = 0;                  // 좌우 위치 (px)
const COPYRIGHT_Y = 0;                  // 상하 위치 (px)
const COPYRIGHT_LINES = [
  "Copyright © 2024 Company Name. All Rights Reserved.",
];
const COPYRIGHT_SIZE = 12;              // 글자 크기 (px)
const COPYRIGHT_WEIGHT = 400;           // 글자 굵기 - 100~900
const COPYRIGHT_COLOR = "rgba(107,114,128,1)"; // 글자 색상 - rgba(R,G,B,투명도 0~1)
const COPYRIGHT_GAP = 4;                // 줄 사이 간격 (px)

// ============================================
// 📞 오른쪽 그룹 설정 (대표번호 + SNS 로고)
// ============================================
const RIGHT_GROUP_X = 0;                // 전체 그룹 좌우 위치 (px)
const RIGHT_GROUP_Y = 0;                // 전체 그룹 상하 위치 (px)
const RIGHT_GROUP_GAP = 20;             // 요소 간격 (px)
const RIGHT_GROUP_ALIGN_X = "right";    // 가로 정렬 - "left", "center", "right"
const RIGHT_GROUP_ALIGN_Y = "center";   // 세로 정렬 - "top", "center", "bottom"

// 대표번호 설정
const PHONE_ENABLED = true;             // 대표번호 표시 여부
const PHONE_X = 0;                      // 좌우 위치 (px)
const PHONE_Y = 0;                      // 상하 위치 (px)
const PHONE_LABEL = "대표번호";
const PHONE_LABEL_SIZE = 16;            // 라벨 글자 크기 (px)
const PHONE_LABEL_WEIGHT = 400;         // 라벨 굵기 - 100~900
const PHONE_LABEL_COLOR = "rgba(255,255,255,0.8)"; // 라벨 색상 - rgba(R,G,B,투명도 0~1)
const PHONE_NUMBER = "1234-5678";
const PHONE_NUMBER_SIZE = 32;           // 번호 글자 크기 (px)
const PHONE_NUMBER_WEIGHT = 700;        // 번호 굵기 - 100~900
const PHONE_NUMBER_COLOR = "rgba(255,255,255,1)"; // 번호 색상 - rgba(R,G,B,투명도 0~1)
const PHONE_GAP = 8;                    // 라벨과 번호 사이 간격 (px)

// SNS 로고 설정
const SNS_ENABLED = true;               // SNS 로고 표시 여부
const SNS_X = 0;                        // 좌우 위치 (px)
const SNS_Y = 0;                        // 상하 위치 (px)
const SNS_ICONS = [
  { src: "/icons/instagram.png", alt: "인스타그램", href: "https://instagram.com" },
  { src: "/icons/youtube.png", alt: "유튜브", href: "https://youtube.com" },
  { src: "/icons/kakao.png", alt: "카카오톡", href: "https://kakao.com" },
];
const SNS_ICON_SIZE = 32;               // 로고 크기 (px)
const SNS_ICON_GAP = 16;                // 로고 사이 간격 (px)

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
    <footer
      className={`text-gray-400 ${FOOTER_PADDING_X} overflow-hidden`}
      style={{ height: `${FOOTER_HEIGHT}px`, backgroundColor: FOOTER_BG }}
    >
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
                <span style={{ minWidth: `${COMPANY_LABEL_WIDTH}px`, flexShrink: 0, color: COMPANY_LABEL_COLOR }}>
                  {info.label}
                </span>
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

        {/* 오른쪽: 대표번호 + SNS 로고 */}
        <div
          className={`flex flex-col ${getAlignX(RIGHT_GROUP_ALIGN_X)} ${getAlignY(RIGHT_GROUP_ALIGN_Y)}`}
          style={{
            transform: `translate(${RIGHT_GROUP_X}px, ${RIGHT_GROUP_Y}px)`,
            gap: `${RIGHT_GROUP_GAP}px`
          }}
        >
          {/* 대표번호 */}
          {PHONE_ENABLED && (
            <div
              className="flex flex-col"
              style={{
                transform: `translate(${PHONE_X}px, ${PHONE_Y}px)`,
                gap: `${PHONE_GAP}px`,
                textAlign: RIGHT_GROUP_ALIGN_X === "right" ? "right" : RIGHT_GROUP_ALIGN_X === "center" ? "center" : "left"
              }}
            >
              <span style={{
                fontSize: `${PHONE_LABEL_SIZE}px`,
                fontWeight: PHONE_LABEL_WEIGHT,
                color: PHONE_LABEL_COLOR
              }}>
                {PHONE_LABEL}
              </span>
              <span style={{
                fontSize: `${PHONE_NUMBER_SIZE}px`,
                fontWeight: PHONE_NUMBER_WEIGHT,
                color: PHONE_NUMBER_COLOR
              }}>
                {PHONE_NUMBER}
              </span>
            </div>
          )}

          {/* SNS 로고 */}
          {SNS_ENABLED && (
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
          )}
        </div>

      </div>
    </footer>
  );
}
