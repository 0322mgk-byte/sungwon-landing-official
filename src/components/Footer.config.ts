// ============================================
// 🎨 푸터 설정
// ============================================
// 이 파일은 비개발자도 쉽게 수정할 수 있도록 설정값만 모아놓은 파일입니다.
// 값을 수정한 후 저장하면 페이지에 바로 반영됩니다.
// ============================================

// ============================================
// 📐 전체 레이아웃
// ============================================
export const FOOTER_BG = "rgba(26,26,26,1)"; // 배경색 - rgba(R,G,B,투명도 0~1)
export const FOOTER_HEIGHT = 400;            // 푸터 높이 (px) - 세로 중앙 정렬 기준
export const FOOTER_PADDING_X = "px-8";      // px-4, px-6, px-8, px-12, px-16
export const CONTENT_GAP = "gap-8";          // gap-4, gap-6, gap-8, gap-12

// ============================================
// ◀️ 왼쪽 그룹 설정 (로고 + 회사 정보 + 카피라이트 전체)
// ============================================
export const LEFT_GROUP_X = 0;               // 전체 그룹 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
export const LEFT_GROUP_Y = 0;               // 전체 그룹 상하 위치 (px) - 음수: 위로, 양수: 아래로
export const LEFT_GROUP_GAP = 30;            // 로고 ↔ 회사 정보 ↔ 카피라이트 간격 (px)
export const LEFT_GROUP_ALIGN_X = "left";    // 가로 정렬 - "left", "center", "right"
export const LEFT_GROUP_ALIGN_Y = "center";     // 세로 정렬 - "top", "center", "bottom"

// ============================================
// 🖼️ 로고 설정
// ============================================
export const LOGO_SRC = "/footer-image-logo.png";  // 로고 이미지 이름을 적어주세요 (public 폴더)
export const LOGO_SIZE = 250;                // 로고 크기 (px) - 가로 기준, 세로는 비율 자동
export const MOBILE_LOGO_SIZE = 200;         // 모바일 로고 크기 (px)
export const LOGO_X = 0;                     // 로고 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
export const LOGO_Y = 0;                     // 로고 상하 위치 (px) - 음수: 위로, 양수: 아래로

// ============================================
// 🏢 회사 정보 설정
// ============================================
export const COMPANY_INFO_X = 0;             // 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
export const COMPANY_INFO_Y = 0;             // 상하 위치 (px) - 음수: 위로, 양수: 아래로
export const COMPANY_INFO = [
  { label: "현장명", value: "군산 지곡동 성원상떼빌 더프라임" },
  { label: "현장 위치", value: "전라북도 군산시 지곡동 62-8일원 공동주택 신축공사" },
  { label: "상담 문의", value: "063-911-0017" },
];
export const COMPANY_LABEL_WIDTH = 100;      // 라벨 너비 (px) - 정렬용
export const COMPANY_INFO_SIZE = 15;         // 글자 크기 (px)
export const COMPANY_LABEL_COLOR = "rgba(255,255,255,1)"; // 라벨 색상 - rgba(R,G,B,투명도 0~1)
export const COMPANY_VALUE_COLOR = "rgba(255,255,255,1)"; // 값 색상 - rgba(R,G,B,투명도 0~1)
export const COMPANY_INFO_GAP = 4;           // 줄 사이 간격 (px)

// ============================================
// ©️ 카피라이트 설정
// ============================================
export const COPYRIGHT_X = 0;                // 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
export const COPYRIGHT_Y = 0;                // 상하 위치 (px) - 음수: 위로, 양수: 아래로
export const COPYRIGHT_LINES = [
  "※ 본 사이트의 CG, 이미지 등은 소비자의 이해를 돕기 위해 제작된 것으로 실제와 다를 수 있습니다.",
  "※ 본 사이트 및 이미지는 (주)픽소코퍼레이션 제작이며, 동의 없이 무단 도용할 경우 법적인 처벌을 받으실 수 있습니다.",
  "Copyright ⓒ 군산지곡 성원상떼빌 더프라임 All Rights Reserved by",
];
export const COPYRIGHT_SIZE = 12;            // 글자 크기 (px)
export const COPYRIGHT_WEIGHT = 400;         // 글자 굵기 - 100~900 (400: 보통, 500: 중간, 700: 굵게)
export const COPYRIGHT_COLOR = "rgba(107,114,128,1)"; // 글자 색상 - rgba(R,G,B,투명도 0~1)
export const COPYRIGHT_GAP = 4;              // 줄 사이 간격 (px)

// ============================================
// ▶️ 오른쪽 그룹 설정 (대표번호 + 더 알아보기 + SNS 로고 전체)
// ============================================
export const RIGHT_GROUP_X = 0;              // 전체 그룹 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
export const RIGHT_GROUP_Y = 55;             // 전체 그룹 상하 위치 (px) - 음수: 위로, 양수: 아래로
export const RIGHT_GROUP_GAP = 10;           // 대표번호 ↔ 더 알아보기 ↔ SNS 로고 간격 (px)
export const RIGHT_GROUP_ALIGN_X = "right";  // 가로 정렬 - "left", "center", "right"
export const RIGHT_GROUP_ALIGN_Y = "top"; // 세로 정렬 - "top", "center", "bottom"

// ============================================
// 📞 대표번호 설정
// ============================================
export const PHONE_X = 0;                    // 전체 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
export const PHONE_Y = 0;                    // 전체 상하 위치 (px) - 음수: 위로, 양수: 아래로
export const PHONE_LABEL = "대표번호";
export const PHONE_LABEL_X = 0;              // 라벨 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
export const PHONE_LABEL_Y = 1;              // 라벨 상하 위치 (px) - 음수: 위로, 양수: 아래로
export const PHONE_LABEL_SIZE = 23;          // 라벨 글자 크기 (px)
export const PHONE_LABEL_WEIGHT = 300;       // 라벨 굵기 - 100~900
export const PHONE_LABEL_COLOR = "rgba(255,255,255,1)"; // 라벨 색상 - rgba(R,G,B,투명도 0~1)
export const PHONE_NUMBER = "063-911-0017";
export const PHONE_NUMBER_X = 0;             // 번호 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
export const PHONE_NUMBER_Y = 0;             // 번호 상하 위치 (px) - 음수: 위로, 양수: 아래로
export const PHONE_NUMBER_SIZE = 35;         // 번호 글자 크기 (px)
export const PHONE_NUMBER_WEIGHT = 900;      // 번호 굵기 - 100~900
export const PHONE_NUMBER_COLOR = "rgba(255,255,255,1)"; // 번호 색상 - rgba(R,G,B,투명도 0~1)
export const PHONE_GAP = 15;                 // 라벨과 번호 사이 간격 (px)

// 전화번호 깜빡임 애니메이션 설정 (헤더와 반대로 동작)
export const PHONE_BLINK_ENABLED = true;            // 깜빡임 사용 여부
export const PHONE_BLINK_COLOR = "rgba(255,100,0,1)"; // 깜빡임 색상 (강렬한 주황색) - rgba(R,G,B,투명도 0~1)
export const PHONE_BLINK_DURATION = 0.8;            // 깜빡임 속도 (초)

// ============================================
// 🔍 더 알아보기 설정
// ============================================
export const EXPLORE_X = 0;                  // 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
export const EXPLORE_Y = 0;                  // 상하 위치 (px) - 음수: 위로, 양수: 아래로
export const EXPLORE_TITLE = "더 알아보기";
export const EXPLORE_TITLE_SIZE = 18;        // 제목 글자 크기 (px)
export const EXPLORE_TITLE_WEIGHT = 300;     // 제목 굵기 - 100~900
export const EXPLORE_TITLE_COLOR = "rgba(178,190,190,1)"; // 제목 색상 - rgba(R,G,B,투명도 0~1)

// ============================================
// 📱 SNS 로고 설정
// ============================================
export const SNS_X = 0;                      // 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
export const SNS_Y = 0;                      // 상하 위치 (px) - 음수: 위로, 양수: 아래로
export const SNS_ICONS = [
  { src: "/naver_blog_logo 1.png", alt: "네이버 블로그", href: "https://blog.naver.com/house_unni" },
  { src: "/instagram-logo-png-transparent-background-300x300.png", alt: "인스타그램", href: "https://www.instagram.com/house_unni/reels/" },
  { src: "/pngegg.png", alt: "유튜브", href: "https://www.youtube.com/@%EC%A7%91%EC%9E%98%EB%B3%B4%EB%8A%94%EC%96%B8%EB%8B%88" },
  { src: "/KakaoTalk_logo.svg.png", alt: "카카오톡", href: "https://open.kakao.com/o/sYpCdW6h" },
];
export const SNS_ICON_SIZE = 32;             // 로고 크기 (px)
export const SNS_ICON_GAP = 16;              // 로고 사이 간격 (px)
