// ============================================
// 🏢 단지배치도 페이지 설정
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
export const MAIN_COPY = "군산지곡 성원상떼빌 단지배치도";  // 메인 카피 텍스트
export const MAIN_COPY_SIZE = 45;                   // 글자 크기 (px)
export const MAIN_COPY_WEIGHT = 800;                // 글자 굵기 - 100~900
export const MAIN_COPY_COLOR = "rgba(0,28,61,1)";   // 글자 색상 - rgba(R,G,B,투명도 0~1)
export const MAIN_COPY_LETTER_SPACING = 0;          // 자간 (px)
export const MAIN_COPY_LINE_HEIGHT = 1.2;           // 줄 높이 - 1.0=글자크기, 1.5=1.5배
export const MAIN_COPY_X = 0;                       // 좌우 미세 조정 (px)
export const MAIN_COPY_Y = 0;                       // 상하 미세 조정 (px)

// 서브 카피 설정
export const SUB_COPY_ENABLED = true;               // 서브 카피 사용 여부
export const SUB_COPY = "자연과 편의가 조화를 이루는 프리미엄 주거공간";  // 서브 카피 텍스트
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
// 🖼️ 단지배치도 이미지 설정
// ============================================
export const LAYOUT_IMAGE_ENABLED = true;           // 단지배치도 이미지 사용 여부
export const LAYOUT_IMAGE_SRC = "/apt-image.jpg";   // 이미지 경로 - 📌 실제 단지배치도 이미지로 교체
export const LAYOUT_IMAGE_ALT = "군산지곡 성원상떼빌 단지배치도";
