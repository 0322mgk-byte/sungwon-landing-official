// ============================================
// ✨ 프리미엄 페이지 설정
// ============================================
// 이 파일은 비개발자도 쉽게 수정할 수 있도록 설정값만 모아놓은 파일입니다.
// 값을 수정한 후 저장하면 페이지에 바로 반영됩니다.
// ============================================

// ============================================
// 🎨 페이지 배경 설정
// ============================================
export const SECTION_BG = "rgba(255,255,255,1)";     // 배경색 - rgba(R,G,B,투명도 0~1)
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
// 📝 타이틀 그룹 설정 (메인카피 + 서브카피)
// ============================================
export const TITLE_GROUP_ENABLED = true;            // 타이틀 그룹 사용 여부
export const TITLE_GROUP_X = 0;                     // 그룹 좌우 위치 (px) - 음수: 왼쪽, 양수: 오른쪽
export const TITLE_GROUP_Y = 0;                     // 그룹 상하 위치 (px) - 음수: 위로, 양수: 아래로
export const TITLE_GROUP_PADDING_TOP = 150;         // 헤더 아래 여백 (px)
export const TITLE_GROUP_ALIGN = "center";          // 정렬 - "left", "center", "right"

// 메인 카피 설정
export const MAIN_COPY_ENABLED = true;              // 메인 카피 사용 여부
export const MAIN_COPY = "군산지곡 성원상떼빌 프리미엄";  // 메인 카피 텍스트
export const MAIN_COPY_SIZE = 45;                   // 글자 크기 (px)
export const MAIN_COPY_WEIGHT = 800;                // 글자 굵기 - 100~900
export const MAIN_COPY_COLOR = "rgba(0,28,61,1)";   // 글자 색상 - rgba(R,G,B,투명도 0~1)
export const MAIN_COPY_LETTER_SPACING = 0;          // 자간 (px)
export const MAIN_COPY_LINE_HEIGHT = 1.2;           // 줄 높이 - 1.0=글자크기, 1.5=1.5배
export const MAIN_COPY_X = 0;                       // 좌우 미세 조정 (px)
export const MAIN_COPY_Y = 0;                       // 상하 미세 조정 (px)

// 서브 카피 설정
export const SUB_COPY_ENABLED = true;               // 서브 카피 사용 여부
export const SUB_COPY = "특별한 주거 가치를 선사하는 프리미엄 아파트";  // 서브 카피 텍스트
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
// 🎯 프리미엄 카드 그리드 설정
// ============================================
export const CARD_GRID_ENABLED = true;              // 카드 그리드 사용 여부
export const CARD_GRID_COLUMNS = 2;                 // 열 개수 (2열 그리드)
export const CARD_GRID_GAP_X = 40;                  // 카드 간 가로 간격 (px) - 중앙 간격
export const CARD_GRID_GAP_Y = 40;                  // 카드 간 세로 간격 (px)
export const CARD_MAX_WIDTH = 450;                  // 카드 최대 너비 (px)

// 카드 미디어 프레임 설정 (16:9 비율)
// 📌 이미지 또는 영상을 교체할 때 이 프레임 안에 넣으면 됨
export const CARD_FRAME_ASPECT_RATIO = "16/9";      // 프레임 비율 - "16/9", "4/3", "1/1" 등
export const CARD_FRAME_BG = "rgba(240,240,240,1)"; // 프레임 배경색 (이미지 없을 때 표시)

// 카드 스타일 설정
export const CARD_BG_COLOR = "rgba(255,255,255,1)"; // 카드 배경색
export const CARD_BORDER_COLOR = "rgba(230,230,230,1)"; // 카드 테두리 색상
export const CARD_BORDER_WIDTH = 1;                 // 카드 테두리 두께 (px)
export const CARD_BORDER_RADIUS = 8;                // 카드 모서리 둥글기 (px)
export const CARD_SHADOW = "0 2px 8px rgba(0,0,0,0.08)"; // 카드 그림자
export const CARD_PADDING = 24;                     // 카드 내부 여백 (px)

// 카드 넘버 라벨 설정
export const CARD_LABEL_SIZE = 45;                  // 라벨 글자 크기 (px)
export const CARD_LABEL_WEIGHT = 700;               // 라벨 글자 굵기 - 얇게
export const CARD_LABEL_COLOR = "rgba(180,180,180,1)"; // 라벨 색상 (연한 회색)
export const CARD_LABEL_FONT = "'Times New Roman', 'Georgia', serif"; // 세리프 폰트

// 카드 라벨 옆 가로선 설정
export const CARD_LINE_ENABLED = true;              // 가로선 사용 여부
export const CARD_LINE_WIDTH = 100;                 // 가로선 길이 (px)
export const CARD_LINE_HEIGHT = 1;                  // 가로선 두께 (px)
export const CARD_LINE_COLOR = "rgba(200,200,200,1)"; // 가로선 색상
export const CARD_LINE_GAP = 20;                    // 숫자와 선 사이 간격 (px)

// 카드 내부 텍스트 좌측 여백 (라벨, 타이틀)
export const CARD_TEXT_INDENT = 10;                 // 텍스트 좌측 추가 여백 (px) - 양수: 우측으로

// 카드 타이틀 설정
export const CARD_TITLE_SIZE = 18;                  // 타이틀 글자 크기 (px)
export const CARD_TITLE_WEIGHT = 700;               // 타이틀 글자 굵기
export const CARD_TITLE_COLOR = "rgba(30,30,30,1)"; // 타이틀 색상

// ============================================
// 📋 프리미엄 카드 데이터
// ============================================
// 📌 미디어 교체 방법:
//    - 이미지: mediaType을 "image"로 설정, mediaSrc에 이미지 경로
//    - 영상: mediaType을 "video"로 설정, mediaSrc에 영상 경로
//    - 프레임만: mediaType을 "none"으로 설정 (배경색만 표시)
export const PREMIUM_CARDS = [
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
