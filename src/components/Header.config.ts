// ============================================
// 🎨 헤더 설정
// ============================================
// 이 파일은 비개발자도 쉽게 수정할 수 있도록 설정값만 모아놓은 파일입니다.
// 값을 수정한 후 저장하면 페이지에 바로 반영됩니다.
// ============================================

// ============================================
// 📐 전체 레이아웃
// ============================================
export const HEADER_HEIGHT = 80;                    // 헤더 높이 (px)
export const HEADER_BG = "rgba(0,0,0,0.1)";         // 배경색 - rgba(R,G,B,투명도 0~1) | 예: rgba(0,0,0,0.1) = 검정 10% 불투명
export const HEADER_HOVER_BG = "rgba(255,255,255,1)"; // 호버 시 배경색 - rgba(R,G,B,투명도 0~1)
export const HEADER_SCROLL_BG = "rgba(255,255,255,1)"; // 서브페이지 스크롤 시 배경색 - rgba(R,G,B,투명도 0~1)
export const HEADER_SCROLL_THRESHOLD = 50;          // 스크롤 감지 임계값 (px) - 이 값 이상 스크롤하면 배경 변경
export const HEADER_SCROLL_BORDER_COLOR = "rgba(230,230,230,1)"; // 서브페이지 스크롤 시 하단 테두리 색상 - rgba(R,G,B,투명도 0~1)
export const HEADER_SCROLL_BORDER_WIDTH = 1;        // 서브페이지 스크롤 시 하단 테두리 두께 (px)
export const HEADER_PADDING_X = 20;                 // 좌우 패딩 (px)

// ============================================
// 🖼️ 좌측 그룹 설정 (로고)
// ============================================
export const LEFT_GROUP_POSITION: number = 15;      // 그룹 위치 (%) - 0=왼쪽 끝, 50=중앙, 100=오른쪽 끝
export const LEFT_GROUP_X = 0;                      // 미세 조정 좌우 (px)
export const LEFT_GROUP_Y = 0;                      // 미세 조정 상하 (px)

// 로고 이미지 설정
export const LOGO_SRC = "/gunsan_logo_from_original_rgb1_69_154.png";   // 로고 이미지 경로 (public 폴더)
export const LOGO_SIZE = 200;                       // 로고 크기 (px) - 너비 기준, 높이는 비율 자동
export const LOGO_X = 0;                            // 로고 좌우 위치 (px)
export const LOGO_Y = 0;                            // 로고 상하 위치 (px)

// ============================================
// 📋 중간 그룹 설정 (네비게이션)
// ============================================
export const NAV_GROUP_POSITION: number = 50;       // 그룹 위치 (%) - 0=왼쪽 끝, 50=중앙, 100=오른쪽 끝
export const NAV_GROUP_X = 0;                       // 미세 조정 좌우 (px)
export const NAV_GROUP_Y = 0;                       // 미세 조정 상하 (px)
export const NAV_GAP = 100;                          // 메뉴 사이 간격 (px)

// 네비게이션 메뉴 항목 (서브메뉴 포함)
export const NAV_ITEMS = [
  {
    label: "사업안내",
    href: "/business",
    subItems: [
      { label: "사업개요", href: "/business" },
    ]
  },
  {
    label: "입지환경",
    href: "/premium",
    subItems: [
      { label: "프리미엄", href: "/premium/premium" },
    ]
  },
  {
    label: "단지안내",
    href: "/complex/site-plan",
    subItems: [
      { label: "단지배치도", href: "/complex/site-plan" },
      { label: "동호수배치도", href: "/complex/unit-layout" },
      { label: "커뮤니티", href: "/complex/community" },
    ]
  },
  {
    label: "세대안내",
    href: "/unit/type",
    subItems: [
      { label: "평면 안내", href: "/unit/type" },
      { label: "인테리어", href: "/unit/interior" },
    ]
  },
  {
    label: "방문예약",
    href: "/reservation",
    subItems: []
  },
];

// ============================================
// 🔽 드롭다운 메뉴 설정
// ============================================
export const DROPDOWN_ENABLED = true;                        // 드롭다운 메뉴 사용 여부
export const DROPDOWN_BG = "rgba(245,245,245,1)";            // 드롭다운 배경색 - rgba(R,G,B,투명도 0~1)
export const DROPDOWN_HEIGHT = 180;                          // 드롭다운 높이 (px)
export const DROPDOWN_BORDER_COLOR = "rgba(230,230,230,1)";  // 드롭다운 테두리 색상
export const DROPDOWN_ANIM_DURATION = 0.3;                   // 드롭다운 애니메이션 시간 (초)
export const DROPDOWN_PADDING_TOP = 24;                      // 드롭다운 상단 여백 (px)

// 드롭다운 서브메뉴 글자 설정
export const DROPDOWN_ITEM_COLOR = "rgba(100,100,100,1)";    // 서브메뉴 글자색
export const DROPDOWN_ITEM_HOVER_COLOR = "rgba(200,50,50,1)"; // 서브메뉴 호버 글자색 (빨간색)
export const DROPDOWN_ITEM_SIZE = 14;                        // 서브메뉴 글자 크기 (px)
export const DROPDOWN_ITEM_WEIGHT = 400;                     // 서브메뉴 글자 굵기 - 100~900
export const DROPDOWN_ITEM_LINE_HEIGHT = 1.5;                // 서브메뉴 줄 높이 - 1.0=글자크기, 1.5=1.5배
export const DROPDOWN_ITEM_LETTER_SPACING = 0;               // 서브메뉴 자간 (px)
export const DROPDOWN_ITEM_GAP = 16;                         // 서브메뉴 항목 세로 간격 (px)
export const DROPDOWN_ITEM_PADDING_X = 12;                   // 서브메뉴 항목 좌우 여백 (px)
export const DROPDOWN_ITEM_PADDING_Y = 6;                    // 서브메뉴 항목 상하 여백 (px)

// 드롭다운 컬럼 설정
export const DROPDOWN_COLUMN_MIN_WIDTH = 100;                // 컬럼 최소 너비 (px) - 자간/여백에 따라 자동 확장
export const DROPDOWN_DIVIDER_COLOR = "rgba(230,230,230,1)"; // 컬럼 구분선 색상
export const DROPDOWN_DIVIDER_WIDTH = 1;                     // 컬럼 구분선 두께 (px)

// 네비게이션 스타일
export const NAV_FONT_SIZE = 15;                    // 글자 크기 (px)
export const NAV_HOVER_SCALE = 1.1;                 // 호버 시 확대 비율 - 1.0=원본, 1.1=10% 확대
export const NAV_FONT_WEIGHT = 300;                 // 글자 굵기 - 100~900
export const NAV_HOVER_FONT_WEIGHT = 500;           // 호버 시 글자 굵기 - 100~900
export const NAV_COLOR = "rgba(0, 0, 0, 1)";        // 글자 색상 (R,G,B,투명도 0~1)
export const NAV_HOVER_COLOR = "rgba(0, 28, 61,1)"; // 호버 시 색상 (R,G,B,투명도 0~1)
export const NAV_LETTER_SPACING = 0;                // 기본 자간 (px)
export const NAV_HOVER_LETTER_SPACING = 2;          // 호버 시 자간 (px)
export const NAV_HOVER_ANIM_DURATION = 0.3;         // 호버 애니메이션 시간 (초)
export const NAV_ITEM_WIDTH = 80;                   // 메뉴 항목 고정 너비 (px) - 자간 변화 시 레이아웃 유지

// ============================================
// 📞 우측 그룹 설정 (전화번호)
// ============================================
export const RIGHT_GROUP_POSITION: number = 85;     // 그룹 위치 (%) - 0=왼쪽 끝, 50=중앙, 100=오른쪽 끝
export const RIGHT_GROUP_X = 0;                     // 미세 조정 좌우 (px)
export const RIGHT_GROUP_Y = 0;                     // 미세 조정 상하 (px)

// 전화번호 박스 설정
export const PHONE_NUMBER = "1833-5859";            // 전화번호
export const PHONE_BOX_BG = "rgba(0,28,61,1)";      // 박스 배경색 - rgba(R,G,B,투명도 0~1)
export const PHONE_BOX_PADDING_X = 24;              // 박스 좌우 패딩 (px)
export const PHONE_BOX_PADDING_Y = 8;               // 박스 상하 패딩 (px)
export const PHONE_BOX_RADIUS = 9999;               // 박스 둥글기 (px) - 9999 = 완전 둥글게
export const PHONE_BOX_BORDER = "rgba(255,255,255,0.1)"; // 박스 테두리 색상 - rgba(R,G,B,투명도 0~1)

// 전화 아이콘 설정
export const PHONE_ICON_SIZE = 20;                  // 아이콘 크기 (px)
export const PHONE_ICON_COLOR = "rgba(255,255,255,1)"; // 아이콘 색상 - rgba(R,G,B,투명도 0~1)
export const PHONE_ICON_FILL = true;                // 아이콘 채우기 여부

// 전화번호 텍스트 설정
export const PHONE_FONT_SIZE = 20;                  // 글자 크기 (px)
export const PHONE_FONT_WEIGHT = 700;               // 글자 굵기 - 100~900
export const PHONE_COLOR = "rgba(255,255,255,1)";   // 글자 색상 - rgba(R,G,B,투명도 0~1)
export const PHONE_GAP = 12;                        // 아이콘과 번호 사이 간격 (px)

// 전화번호 깜빡임 애니메이션 설정
export const PHONE_BLINK_ENABLED = true;            // 깜빡임 사용 여부
export const PHONE_BLINK_COLOR = "rgba(255,100,0,1)"; // 깜빡임 색상 (강렬한 주황색) - rgba(R,G,B,투명도 0~1)
export const PHONE_BLINK_DURATION = 0.8;            // 깜빡임 속도 (초) - 한 색상에서 다른 색상으로 전환 시간

// ============================================
// 📱 모바일 메뉴 설정
// ============================================
export const MOBILE_MENU_BG = "rgba(255,255,255,1)";       // 모바일 메뉴 배경색 - rgba(R,G,B,투명도 0~1)
export const MOBILE_MENU_TEXT_COLOR = "rgba(0,0,0,1)";     // 모바일 메뉴 글자색 - rgba(R,G,B,투명도 0~1)
export const MOBILE_MENU_HOVER_COLOR = "rgba(37,99,235,1)"; // 모바일 메뉴 호버 색상 - rgba(R,G,B,투명도 0~1)
export const MOBILE_MENU_PADDING_Y = 16;            // 모바일 메뉴 상하 패딩 (px)
export const MOBILE_MENU_ITEM_GAP = 16;             // 모바일 메뉴 항목 간격 (px)
