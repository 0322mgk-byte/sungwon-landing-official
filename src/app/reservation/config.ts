// ============================================
// 📅 방문예약 페이지 설정
// ============================================
// 이 파일은 비개발자도 쉽게 수정할 수 있도록 설정값만 모아놓은 파일입니다.
// 값을 수정한 후 저장하면 페이지에 바로 반영됩니다.
// ============================================

// ============================================
// 🎨 페이지 배경 설정
// ============================================
export const SECTION_BG = "rgba(255,255,255,1)";     // 배경색 - rgba(R,G,B,투명도 0~1)
export const SECTION_PADDING_TOP = 80;              // 헤더 아래 여백 (px) - 헤더 높이만큼
export const SECTION_PADDING_BOTTOM = 80;           // 섹션 하단 여백 (px)

// ============================================
// 📦 콘텐츠 컨테이너 설정
// ============================================
export const CONTENT_MAX_WIDTH = 880;              // 콘텐츠 최대 너비 (px)
export const CONTENT_PADDING_X = 20;                // 좌우 여백 (px)
export const CONTENT_GAP = 40;                      // 콘텐츠 요소 간 세로 간격 (px)

// ============================================
// 🖼️ 방문예약 이미지 설정
// ============================================
export const RESERVATION_IMAGES = [
  "/01.png",
  "/02-2.png",
];
export const MOBILE_RESERVATION_IMAGES = [
  "/01.png",
  "/mobile-landing-image2.png",
];
export const IMAGE_GAP = 0;                         // 이미지 간격 (px) - 0으로 설정하여 붙임

// ============================================
// 📝 리드폼 레이아웃 설정
// ============================================
export const FORM_MAX_WIDTH = 900;                  // 폼 최대 너비 (px)
export const FORM_PADDING_X = 40;                   // 폼 좌우 여백 (px)
export const FORM_PADDING_Y = 50;                   // 폼 상하 여백 (px)
export const FORM_BG = "rgba(255,255,255,1)";       // 폼 배경색
export const FORM_BORDER_RADIUS = 12;               // 폼 모서리 둥글기 (px)
export const FORM_ITEM_GAP = 40;                    // 폼 항목 간 세로 간격 (px)

// ============================================
// 📱 모바일 리드폼 설정 (화면 너비 1080px 미만 적용)
// ============================================
export const MOBILE_FORM_PADDING_X = 24;            // 모바일 폼 좌우 여백 (px)
export const MOBILE_FORM_PADDING_Y = 32;            // 모바일 폼 상하 여백 (px)
export const MOBILE_FORM_ITEM_GAP = 28;             // 모바일 폼 항목 간 세로 간격 (px)
export const MOBILE_FORM_TITLE_SIZE = 28;           // 모바일 타이틀 글자 크기 (px)
export const MOBILE_FORM_SUBTITLE_SIZE = 14;        // 모바일 서브타이틀 글자 크기 (px)
export const MOBILE_LABEL_FONT_SIZE = 15;           // 모바일 라벨 글자 크기 (px)
export const MOBILE_INPUT_FONT_SIZE = 16;           // 모바일 입력 필드 글자 크기 (px) - 16px 이상이면 iOS 확대 방지
export const MOBILE_OPTION_FONT_SIZE = 13;          // 모바일 옵션 버튼 글자 크기 (px)
export const MOBILE_FIELD_PADDING_X = 14;           // 모바일 필드 좌우 패딩 (px)
export const MOBILE_FIELD_PADDING_Y = 14;           // 모바일 필드 상하 패딩 (px)
export const MOBILE_AGE_BUTTON_GAP = 8;             // 모바일 연령대 버튼 간 간격 (px)

// ============================================
// 🎨 리드폼 색상 설정
// ============================================
export const PRIMARY_COLOR = "rgba(59,130,246,1)";  // 메인 컬러 (파란색)
export const PRIMARY_HOVER_BG = "rgba(59,130,246,0.05)"; // 선택된 항목 배경색
export const LABEL_COLOR = "rgba(30,30,30,1)";      // 라벨 색상
export const SUB_TEXT_COLOR = "rgba(100,100,100,1)"; // 서브 텍스트 색상
export const INPUT_BORDER_COLOR = "rgba(220,220,220,1)"; // 입력 필드 테두리 색상
export const INPUT_FOCUS_BORDER_COLOR = "rgba(59,130,246,1)"; // 포커스 시 테두리 색상
export const PRIVACY_BG_COLOR = "rgba(245,245,245,1)"; // 개인정보 박스 배경색

// ============================================
// ✏️ 리드폼 타이틀 설정
// ============================================
export const FORM_TITLE = "빠른 상담 예약";           // 폼 메인 타이틀
export const FORM_TITLE_SIZE = 40;                  // 타이틀 글자 크기 (px)
export const FORM_TITLE_WEIGHT = 700;               // 타이틀 글자 굵기 - 100~900
export const FORM_TITLE_MARGIN_BOTTOM = 8;          // 타이틀 하단 여백 (px)

export const FORM_SUBTITLE = "원하시는 시간에 맞춰 담당자가 연락드립니다"; // 서브타이틀
export const FORM_SUBTITLE_SIZE = 20;               // 서브타이틀 글자 크기 (px)
export const FORM_SUBTITLE_WEIGHT = 400;            // 서브타이틀 글자 굵기 - 100~900
export const FORM_HEADER_MARGIN_BOTTOM = 32;        // 타이틀 영역 하단 여백 (px)

// ============================================
// 🏷️ 리드폼 라벨 설정
// ============================================
export const LABEL_FONT_SIZE = 17;                  // 라벨 글자 크기 (px)
export const LABEL_FONT_WEIGHT = 500;               // 라벨 글자 굵기 - 100~900
export const LABEL_MARGIN_BOTTOM = 12;              // 라벨 하단 여백 (px)

// ============================================
// 📦 리드폼 공통 패딩 설정 (입력필드, 옵션버튼, 제출버튼 전체 적용)
// ============================================
export const FIELD_PADDING_X = 16;                  // 전체 필드 좌우 패딩 (px)
export const FIELD_PADDING_Y = 16;                  // 전체 필드 상하 패딩 (px)
export const FIELD_BORDER_RADIUS = 8;               // 전체 필드 모서리 둥글기 (px)

// ============================================
// 📥 리드폼 입력 필드 설정
// ============================================
export const INPUT_FONT_SIZE = 15;                  // 입력 필드 글자 크기 (px)

// ============================================
// 🔘 리드폼 버튼/옵션 설정
// ============================================
export const OPTION_FONT_SIZE = 14;                 // 옵션 버튼 글자 크기 (px)
export const OPTION_FONT_WEIGHT_NORMAL = 400;       // 옵션 일반 글자 굵기 - 100~900
export const OPTION_FONT_WEIGHT_SELECTED = 500;     // 옵션 선택 시 글자 굵기 - 100~900
export const OPTION_GAP = 8;                        // 옵션 간 간격 (px)
export const AGE_BUTTON_GAP = 12;                   // 연령대 버튼 간 간격 (px)

// ============================================
// ✅ 리드폼 체크박스/개인정보 설정
// ============================================
export const CHECKBOX_SIZE = 20;                    // 체크박스 크기 (px)
export const CHECKBOX_LABEL_SIZE = 14;              // 체크박스 라벨 글자 크기 (px)
export const PRIVACY_TEXT_SIZE = 12;                // 개인정보 안내문 글자 크기 (px)
export const PRIVACY_LINE_HEIGHT = 1.6;             // 개인정보 안내문 줄 높이
export const PRIVACY_PADDING = 12;                  // 개인정보 박스 패딩 (px)

// ============================================
// 🚀 리드폼 제출 버튼 설정
// ============================================
export const SUBMIT_BUTTON_TEXT = "상담 예약하기";   // 제출 버튼 텍스트
export const SUBMIT_BUTTON_FONT_SIZE = 16;          // 제출 버튼 글자 크기 (px)
export const SUBMIT_BUTTON_FONT_WEIGHT = 700;       // 제출 버튼 글자 굵기 - 100~900

// ============================================
// 👥 연령대 옵션
// ============================================
export const AGE_OPTIONS = ["20~30대", "40~50대", "60대 이상"];

// ============================================
// ⏰ 통화 가능 시간 옵션
// ============================================
export const TIME_OPTIONS = [
  { value: "anytime", label: "가장 빠른 안내 (상관없음)", checked: true },
  { value: "morning", label: "오전 9-12시", checked: false },
  { value: "afternoon", label: "오후 12-6시", checked: false },
  { value: "evening", label: "저녁 6시 이후", checked: false },
];

// ============================================
// 🎁 선물 옵션
// ============================================
export const GIFT_OPTIONS = [
  { value: "vacuum", label: "삼성 비스포크 무선 청소기" },
  { value: "airpurifier", label: "삼성 공기청정기 + 스마트TV" },
  { value: "jeju", label: "제주도 3박 4일 여행권" },
];

// ============================================
// 🔗 Apps Script 웹 앱 URL
// ============================================
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTjpGH_GZ-2xTDG1x7-SwtBBPyXDMB_ylqKM4Jbf4DZGsz9R_WAnVMuD7G3uKmNw_UEg/exec";

// ============================================
// 🎉 성공 팝업 설정
// ============================================
export const POPUP_BG = "rgba(255,255,255,1)";           // 팝업 배경색
export const POPUP_BORDER_RADIUS = 16;                   // 팝업 모서리 둥글기 (px)
export const POPUP_PADDING = 40;                         // 팝업 패딩 (px)
export const POPUP_MAX_WIDTH = 360;                      // 팝업 최대 너비 (px)

export const POPUP_ICON_SIZE = 60;                       // 체크 아이콘 크기 (px)
export const POPUP_ICON_BG = "rgba(59,130,246,1)";       // 체크 아이콘 배경색
export const POPUP_ICON_COLOR = "white";                 // 체크 아이콘 색상

export const POPUP_TITLE = "상담 신청이 완료되었습니다!";   // 팝업 타이틀
export const POPUP_TITLE_SIZE = 22;                      // 팝업 타이틀 크기 (px)
export const POPUP_TITLE_WEIGHT = 700;                   // 팝업 타이틀 굵기

export const POPUP_MESSAGE = "빠른 시간 내에 연락드리겠습니다."; // 팝업 메시지
export const POPUP_MESSAGE_SIZE = 15;                    // 팝업 메시지 크기 (px)
export const POPUP_MESSAGE_COLOR = "rgba(100,100,100,1)"; // 팝업 메시지 색상

export const POPUP_BUTTON_TEXT = "확인";                  // 팝업 버튼 텍스트
export const POPUP_BUTTON_WIDTH = 120;                   // 팝업 버튼 너비 (px)

// ============================================
// 💬 카카오톡 플로팅 버튼 설정
// ============================================
export const KAKAO_ENABLED = true;                       // 카카오톡 버튼 사용 여부
export const KAKAO_URL = "https://open.kakao.com/o/sYpCdW6h";  // 카카오톡 오픈채팅 URL
export const KAKAO_SIZE = 60;                            // 버튼 크기 (px)
export const KAKAO_BOTTOM = 40;                         // 하단 여백 (px)
export const KAKAO_LEFT = 30;                            // 좌측 여백 (px)
export const KAKAO_BG = "#FEE500";                        // 카카오 노란색 배경
export const KAKAO_SHADOW = "0 4px 12px rgba(0,0,0,0.15)"; // 그림자 효과
