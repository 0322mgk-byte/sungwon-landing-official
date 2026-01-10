// ============================================
// 🎯 히어로 섹션 설정
// ============================================
// 이 파일은 비개발자도 쉽게 수정할 수 있도록 설정값만 모아놓은 파일입니다.
// 값을 수정한 후 저장하면 페이지에 바로 반영됩니다.
// ============================================

// ============================================
// 🎬 미디어 타입 설정
// ============================================
// "video" 또는 "image" 또는 "youtube" 중 선택
export const HERO_TYPE: "video" | "image" | "youtube" = "youtube"

// 미디어 파일 경로 (public 폴더)
export const VIDEO_SRC = "/hero-section-video.mp4"
export const IMAGE_SRC = "/pickso-batang.png"

// ============================================
// 📺 유튜브 설정 (HERO_TYPE = "youtube" 일 때)
// ============================================
export const YOUTUBE_VIDEO_ID = "Ot1hU2M7Rdg"  // 유튜브 영상 ID (URL에서 v= 뒤의 값)

// 유튜브 영상 크기/위치 조절 (PC)
export const YOUTUBE_SCALE = 117      // 확대/축소 (%) - 100 = 원본, 150 = 1.5배 확대
export const YOUTUBE_X = 0            // 좌우 이동 (%) - 음수: 왼쪽, 양수: 오른쪽
export const YOUTUBE_Y = -11.5            // 상하 이동 (%) - 음수: 위로, 양수: 아래로

// 유튜브 영상 크기/위치 조절 (모바일)
export const MOBILE_YOUTUBE_SCALE = 39  // 모바일 확대/축소 (%)
export const MOBILE_YOUTUBE_X = 0        // 모바일 좌우 이동 (%)
export const MOBILE_YOUTUBE_Y = 10.5        // 모바일 상하 이동 (%)

// ============================================
// 📐 히어로 섹션 레이아웃
// ============================================
export const HERO_HEIGHT = "90vh"      // PC 히어로 섹션 높이
export const MOBILE_HERO_HEIGHT = "43vh" // 모바일 히어로 섹션 높이
export const HERO_BG = "rgba(0,0,0,1)" // 배경색 - rgba(R,G,B,투명도 0~1)

// ============================================
// 🎥 영상 조절 설정 (HERO_TYPE = "video" 일 때)
// ============================================
export const VIDEO_SCALE = 132    // 확대/축소 (%) - 100 = 원본 크기
export const VIDEO_X = 0        // 좌우 이동 (%) - 음수: 왼쪽, 양수: 오른쪽
export const VIDEO_Y = -10        // 상하 이동 (%) - 음수: 위로, 양수: 아래로

// ============================================
// 🖼️ 이미지 조절 설정 (HERO_TYPE = "image" 일 때)
// ============================================
// 최종 위치 (애니메이션 끝점 = 원점)
export const IMAGE_SCALE = 120    // 확대/축소 (%) - 100 = 원본 크기
export const IMAGE_X = 0          // 좌우 이동 (%) - 음수: 왼쪽, 양수: 오른쪽
export const IMAGE_Y = 2         // 상하 이동 (%) - 음수: 위로, 양수: 아래로

// 애니메이션 시작점 (처음 보이는 상태)
export const IMAGE_START_SCALE = 150   // 시작 확대/축소 (%)
export const IMAGE_START_X = 0         // 시작 좌우 이동 (%)
export const IMAGE_START_Y = -8       // 시작 상하 이동 (%)

// ============================================
// ✨ 이미지 애니메이션 설정
// ============================================
export const IMAGE_ANIM_DURATION = 3   // 애니메이션 시간 (초)
export const IMAGE_ANIM_EASE = "power3.inOut"  // 이징: power1~4 + .in / .out / .inOut

// ============================================
// 🔗 빠른 네비게이션 버튼 설정
// ============================================
export const QUICK_NAV_ENABLED = true           // 빠른 네비게이션 버튼 사용 여부
export const QUICK_NAV_POSITION_Y = 20          // 상단에서의 거리 (px)
export const QUICK_NAV_MOBILE_POSITION_Y = 90   // 모바일에서 상단에서의 거리 (px)
export const QUICK_NAV_GAP = 12                 // 버튼 사이 간격 (px)
export const QUICK_NAV_MOBILE_GAP = 8           // 모바일 버튼 사이 간격 (px)

// 버튼 스타일
export const QUICK_NAV_BTN_BG = "rgba(255,255,255,0.95)"        // 버튼 배경색
export const QUICK_NAV_BTN_HOVER_BG = "rgba(0,28,61,1)"         // 호버 시 배경색
export const QUICK_NAV_BTN_COLOR = "rgba(0,28,61,1)"            // 글자색
export const QUICK_NAV_BTN_HOVER_COLOR = "rgba(255,255,255,1)"  // 호버 시 글자색
export const QUICK_NAV_BTN_PADDING_X = 20       // 버튼 좌우 패딩 (px)
export const QUICK_NAV_BTN_PADDING_Y = 12       // 버튼 상하 패딩 (px)
export const QUICK_NAV_BTN_MOBILE_PADDING_X = 14 // 모바일 좌우 패딩 (px)
export const QUICK_NAV_BTN_MOBILE_PADDING_Y = 10 // 모바일 상하 패딩 (px)
export const QUICK_NAV_BTN_RADIUS = 8           // 버튼 둥글기 (px)
export const QUICK_NAV_BTN_FONT_SIZE = 14       // 글자 크기 (px)
export const QUICK_NAV_BTN_MOBILE_FONT_SIZE = 12 // 모바일 글자 크기 (px)
export const QUICK_NAV_BTN_FONT_WEIGHT = 600    // 글자 굵기

// 버튼 항목 (label: 표시 텍스트, href: 이동 경로)
export const QUICK_NAV_ITEMS = [
  { label: "방문예약", href: "/reservation" },
  { label: "블로그", href: "/media/blog" },
  { label: "유튜브", href: "/media/youtube" },
  { label: "인스타그램", href: "/media/instagram" },
]
