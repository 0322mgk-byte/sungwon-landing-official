// ============================================
// 📍 입지환경 페이지 설정
// ============================================
// 이 파일은 비개발자도 쉽게 수정할 수 있도록 설정값만 모아놓은 파일입니다.
// 값을 수정한 후 저장하면 페이지에 바로 반영됩니다.
// ============================================

// ============================================
// 🎨 페이지 배경 설정
// ============================================
export const SECTION_BG = "rgba(255,255,255,1)"     // 배경색 - rgba(R,G,B,투명도 0~1)
export const SECTION_PADDING_BOTTOM = 80;           // 섹션 하단 여백 (px)

// ============================================
// 🎬 콘텐츠 진입 애니메이션 설정
// ============================================
export const ANIM_ENABLED = true;                   // 애니메이션 사용 여부
export const ANIM_DURATION = 1;                     // 애니메이션 시간 (초)
export const ANIM_EASE = "power2.out";              // 이징 - power1~4 + .in(천천히시작) / .out(천천히끝) / .inOut(양쪽천천히)
export const ANIM_Y_OFFSET = 20;                    // 시작 위치 Y 오프셋 (px) - 아래에서 위로 올라오는 거리
export const ANIM_DELAY = 0;                        // 애니메이션 시작 지연 (초)

// ============================================
// 📦 콘텐츠 컨테이너 설정
// ============================================
export const CONTENT_MAX_WIDTH = 1000;              // 콘텐츠 최대 너비 (px)
export const CONTENT_PADDING_X = 20;                // 좌우 여백 (px)
export const CONTENT_GAP = 40;                      // 콘텐츠 요소 간 세로 간격 (px)

// ============================================
// 📱 모바일 설정 (768px 미만)
// ============================================
export const MOBILE_CONTENT_PADDING_X = 16;         // 모바일 좌우 여백 (px)
export const MOBILE_CONTENT_GAP = 24;               // 모바일 콘텐츠 간격 (px)
export const MOBILE_TITLE_PADDING_TOP = 120;        // 모바일 상단 여백 (px)
export const MOBILE_MAIN_COPY_SIZE = 24;            // 모바일 메인 카피 크기 (px)
export const MOBILE_SUB_COPY_SIZE = 14;             // 모바일 서브 카피 크기 (px)
export const MOBILE_SECTION_PADDING_BOTTOM = 40;    // 모바일 하단 여백 (px)
export const MOBILE_ZOOM_HINT_TEXT = "두 손가락으로 확대하여 자세히 보실 수 있습니다"; // 모바일 확대 안내 문구
export const MOBILE_ZOOM_HINT_SIZE = 12;            // 모바일 확대 안내 글자 크기 (px)
export const MOBILE_ZOOM_HINT_COLOR = "rgba(150,150,150,1)"; // 모바일 확대 안내 글자 색상

// ============================================
// 📝 타이틀 그룹 설정 (메인카피 + 서브카피)
// ============================================
export const TITLE_GROUP_ENABLED = true;            // 타이틀 그룹 사용 여부
export const TITLE_GROUP_X = 0;                     // 그룹 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
export const TITLE_GROUP_Y = 0;                     // 그룹 상하 위치 (px) - 음수: 위로, 양수: 아래로
export const TITLE_GROUP_PADDING_TOP = 150;         // 헤더 아래 여백 (px)
export const TITLE_GROUP_ALIGN = "center";          // 정렬 - "left", "center", "right"

// 메인 카피 설정
export const MAIN_COPY_ENABLED = true;              // 메인 카피 사용 여부
export const MAIN_COPY = "군산지곡 성원상떼빌 입지환경";  // 메인 카피 텍스트
export const MAIN_COPY_SIZE = 45;                   // 글자 크기 (px)
export const MAIN_COPY_WEIGHT = 800;                // 글자 굵기 - 100~900
export const MAIN_COPY_COLOR = "rgba(0,28,61,1)";   // 글자 색상 - rgba(R,G,B,투명도 0~1)
export const MAIN_COPY_LETTER_SPACING = 0;          // 자간 (px)
export const MAIN_COPY_LINE_HEIGHT = 1.2;           // 줄 높이 - 1.0=글자크기, 1.5=1.5배
export const MAIN_COPY_X = 0;                       // 좌우 미세 조정 (px)
export const MAIN_COPY_Y = 0;                       // 상하 미세 조정 (px)

// 서브 카피 설정
export const SUB_COPY_ENABLED = true;               // 서브 카피 사용 여부
export const SUB_COPY = "은파호수공원 인접, 지곡 생활권 중심 입지";  // 서브 카피 텍스트
export const SUB_COPY_SIZE = 20;                    // 글자 크기 (px)
export const SUB_COPY_WEIGHT = 400;                 // 글자 굵기 - 100~900
export const SUB_COPY_COLOR = "rgba(100,100,100,1)"; // 글자 색상 - rgba(R,G,B,투명도 0~1)
export const SUB_COPY_LETTER_SPACING = 0;           // 자간 (px)
export const SUB_COPY_LINE_HEIGHT = 1.5;            // 줄 높이 - 1.0=글자크기, 1.5=1.5배
export const SUB_COPY_X = 0;                        // 좌우 미세 조정 (px)
export const SUB_COPY_Y = 0;                        // 상하 미세 조정 (px)

// 메인/서브 카피 간격
export const COPY_GAP = 16;                         // 메인 ↔ 서브 카피 간격 (px)

// ============================================
// 🗺️ 입지 정보 섹션 설정
// ============================================
export const LOCATION_SECTION_ENABLED = true;       // 입지 정보 섹션 사용 여부
export const LOCATION_SECTION_MAX_WIDTH = 900;      // 섹션 최대 너비 (px)

// 입지 정보 데이터
// 📌 이미지 경로: public 폴더에 이미지 추가 후 경로 수정 필요
export const LOCATION_DATA = [
  {
    category: "TRAFFIC",
    categoryColor: "rgba(65,105,225,1)",      // 카테고리 강조 색상 (파란색)
    title: "더 빠른 교통특권",
    description: ["월명로 인접 군산 중심지 접근 용이", "21번 국도 새만금 산업단지 및 서해안 고속도로"],
    image: "/herosection.jpg",                // TODO: /location/traffic.jpg로 교체
    position: "left" as const,                // 이미지 위치: "left" 또는 "right"
  },
  {
    category: "LIFE",
    categoryColor: "rgba(65,105,225,1)",
    title: "더 편한 중심생활",
    description: ["단지 앞 근린상가, 의료원, 예술의전당", "수송동중심상권 차량 10분 이용"],
    image: "/herosection.jpg",                // TODO: /location/life.jpg로 교체
    position: "right" as const,
  },
  {
    category: "VALUE",
    categoryColor: "rgba(65,105,225,1)",
    title: "안심도보 교육환경",
    description: ["군산초·고 3분거리 및 동산중 도보권 통학 위치", "사업지 인근 풍부한 학원 시설", "나운·수송동 입시학원 이용 편리"],
    image: "/herosection.jpg",                // TODO: /location/value.jpg로 교체
    position: "left" as const,
  },
  {
    category: "NATURE",
    categoryColor: "rgba(65,105,225,1)",
    title: "더 빛날 자연환경",
    description: ["은파 호수공원 산책로, 체육공원 등 인접", "쾌적한 주거환경 우수"],
    image: "/herosection.jpg",                // TODO: /location/nature.jpg로 교체
    position: "right" as const,
  },
];

// ============================================
// 🎨 입지 정보 스타일 설정
// ============================================
export const LOCATION_CATEGORY_SIZE = 13;           // 카테고리 글자 크기 (px)
export const LOCATION_CATEGORY_WEIGHT = 500;        // 카테고리 글자 굵기
export const LOCATION_CATEGORY_SPACING = 2;         // 카테고리 자간 (px)
export const LOCATION_TITLE_SIZE = 24;              // 타이틀 글자 크기 (px)
export const LOCATION_TITLE_WEIGHT = 700;           // 타이틀 글자 굵기
export const LOCATION_TITLE_COLOR = "rgba(30,30,30,1)"; // 타이틀 색상
export const LOCATION_DESC_SIZE = 14;               // 설명 글자 크기 (px)
export const LOCATION_DESC_WEIGHT = 400;            // 설명 글자 굵기
export const LOCATION_DESC_COLOR = "rgba(80,80,80,1)"; // 설명 색상
export const LOCATION_ACCENT_COLOR = "rgba(65,105,225,1)"; // 강조 색상 (세로선)
export const LOCATION_LINE_COLOR = "rgba(200,210,220,1)"; // 연결선 색상
export const LOCATION_IMAGE_WIDTH = 320;            // 이미지 너비 (px)
export const LOCATION_IMAGE_HEIGHT = 220;           // 이미지 높이 (px)
export const LOCATION_ITEM_GAP = 60;                // 항목 간 세로 간격 (px)
