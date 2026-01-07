"use client"

import { useState, useRef } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"

// ============================================
// 📅 방문예약 페이지 설정
// ============================================
const SECTION_BG = "rgba(255,255,255,1)"     // 배경색 - rgba(R,G,B,투명도 0~1)
const SECTION_PADDING_TOP = 80;              // 헤더 아래 여백 (px) - 헤더 높이만큼
const SECTION_PADDING_BOTTOM = 80;           // 섹션 하단 여백 (px)

// ============================================
// 📦 콘텐츠 컨테이너 설정
// ============================================
const CONTENT_MAX_WIDTH = 880;              // 콘텐츠 최대 너비 (px)
const CONTENT_PADDING_X = 20;                // 좌우 여백 (px)
const CONTENT_GAP = 40;                      // 콘텐츠 요소 간 세로 간격 (px)

// ============================================
// 🖼️ 방문예약 이미지 설정
// ============================================
const RESERVATION_IMAGES = [
  "/01.png",
  "/02-2.png",
];
const IMAGE_GAP = 0;                         // 이미지 간격 (px) - 0으로 설정하여 붙임

// ============================================
// 📝 리드폼 레이아웃 설정
// ============================================
const FORM_MAX_WIDTH = 900;                  // 폼 최대 너비 (px)
const FORM_PADDING_X = 40;                   // 폼 좌우 여백 (px)
const FORM_PADDING_Y = 50;                   // 폼 상하 여백 (px)
const FORM_BG = "rgba(255,255,255,1)";       // 폼 배경색
const FORM_BORDER_RADIUS = 12;               // 폼 모서리 둥글기 (px)
const FORM_ITEM_GAP = 40;                    // 폼 항목 간 세로 간격 (px)

// ============================================
// 🎨 리드폼 색상 설정
// ============================================
const PRIMARY_COLOR = "rgba(59,130,246,1)";  // 메인 컬러 (파란색)
const PRIMARY_HOVER_BG = "rgba(59,130,246,0.05)"; // 선택된 항목 배경색
const LABEL_COLOR = "rgba(30,30,30,1)";      // 라벨 색상
const SUB_TEXT_COLOR = "rgba(100,100,100,1)"; // 서브 텍스트 색상
const INPUT_BORDER_COLOR = "rgba(220,220,220,1)"; // 입력 필드 테두리 색상
const INPUT_FOCUS_BORDER_COLOR = "rgba(59,130,246,1)"; // 포커스 시 테두리 색상
const PRIVACY_BG_COLOR = "rgba(245,245,245,1)"; // 개인정보 박스 배경색

// ============================================
// ✏️ 리드폼 타이틀 설정
// ============================================
const FORM_TITLE = "빠른 상담 예약";           // 폼 메인 타이틀
const FORM_TITLE_SIZE = 40;                  // 타이틀 글자 크기 (px)
const FORM_TITLE_WEIGHT = 700;               // 타이틀 글자 굵기 - 100~900
const FORM_TITLE_MARGIN_BOTTOM = 8;          // 타이틀 하단 여백 (px)

const FORM_SUBTITLE = "원하시는 시간에 맞춰 담당자가 연락드립니다"; // 서브타이틀
const FORM_SUBTITLE_SIZE = 20;               // 서브타이틀 글자 크기 (px)
const FORM_SUBTITLE_WEIGHT = 400;            // 서브타이틀 글자 굵기 - 100~900
const FORM_HEADER_MARGIN_BOTTOM = 32;        // 타이틀 영역 하단 여백 (px)

// ============================================
// 🏷️ 리드폼 라벨 설정
// ============================================
const LABEL_FONT_SIZE = 17;                  // 라벨 글자 크기 (px)
const LABEL_FONT_WEIGHT = 500;               // 라벨 글자 굵기 - 100~900
const LABEL_MARGIN_BOTTOM = 12;              // 라벨 하단 여백 (px)

// ============================================
// 📦 리드폼 공통 패딩 설정 (입력필드, 옵션버튼, 제출버튼 전체 적용)
// ============================================
const FIELD_PADDING_X = 16;                  // 전체 필드 좌우 패딩 (px)
const FIELD_PADDING_Y = 16;                  // 전체 필드 상하 패딩 (px)
const FIELD_BORDER_RADIUS = 8;               // 전체 필드 모서리 둥글기 (px)

// ============================================
// 📥 리드폼 입력 필드 설정
// ============================================
const INPUT_FONT_SIZE = 15;                  // 입력 필드 글자 크기 (px)

// ============================================
// 🔘 리드폼 버튼/옵션 설정
// ============================================
const OPTION_FONT_SIZE = 14;                 // 옵션 버튼 글자 크기 (px)
const OPTION_FONT_WEIGHT_NORMAL = 400;       // 옵션 일반 글자 굵기 - 100~900
const OPTION_FONT_WEIGHT_SELECTED = 500;     // 옵션 선택 시 글자 굵기 - 100~900
const OPTION_GAP = 8;                        // 옵션 간 간격 (px)
const AGE_BUTTON_GAP = 12;                   // 연령대 버튼 간 간격 (px)

// ============================================
// ✅ 리드폼 체크박스/개인정보 설정
// ============================================
const CHECKBOX_SIZE = 20;                    // 체크박스 크기 (px)
const CHECKBOX_LABEL_SIZE = 14;              // 체크박스 라벨 글자 크기 (px)
const PRIVACY_TEXT_SIZE = 12;                // 개인정보 안내문 글자 크기 (px)
const PRIVACY_LINE_HEIGHT = 1.6;             // 개인정보 안내문 줄 높이
const PRIVACY_PADDING = 12;                  // 개인정보 박스 패딩 (px)

// ============================================
// 🚀 리드폼 제출 버튼 설정
// ============================================
const SUBMIT_BUTTON_TEXT = "상담 예약하기";   // 제출 버튼 텍스트
const SUBMIT_BUTTON_FONT_SIZE = 16;          // 제출 버튼 글자 크기 (px)
const SUBMIT_BUTTON_FONT_WEIGHT = 700;       // 제출 버튼 글자 굵기 - 100~900
// ============================================

// 연령대 옵션
const AGE_OPTIONS = ["20~30대", "40~50대", "60대 이상"];

// 통화 가능 시간 옵션
const TIME_OPTIONS = [
  { value: "anytime", label: "가장 빠른 안내 (상관없음)", checked: true },
  { value: "morning", label: "오전 9-12시", checked: false },
  { value: "afternoon", label: "오후 12-6시", checked: false },
  { value: "evening", label: "저녁 6시 이후", checked: false },
];

// 선물 옵션
const GIFT_OPTIONS = [
  { value: "vacuum", label: "삼성 비스포크 무선 청소기" },
  { value: "airpurifier", label: "삼성 공기청정기 + 스마트TV" },
  { value: "jeju", label: "제주도 3박 4일 여행권" },
];

// Apps Script 웹 앱 URL
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTjpGH_GZ-2xTDG1x7-SwtBBPyXDMB_ylqKM4Jbf4DZGsz9R_WAnVMuD7G3uKmNw_UEg/exec";

// ============================================
// 🎉 성공 팝업 설정
// ============================================
const POPUP_BG = "rgba(255,255,255,1)";           // 팝업 배경색
const POPUP_BORDER_RADIUS = 16;                   // 팝업 모서리 둥글기 (px)
const POPUP_PADDING = 40;                         // 팝업 패딩 (px)
const POPUP_MAX_WIDTH = 360;                      // 팝업 최대 너비 (px)

const POPUP_ICON_SIZE = 60;                       // 체크 아이콘 크기 (px)
const POPUP_ICON_BG = "rgba(59,130,246,1)";       // 체크 아이콘 배경색
const POPUP_ICON_COLOR = "white";                 // 체크 아이콘 색상

const POPUP_TITLE = "상담 신청이 완료되었습니다!";   // 팝업 타이틀
const POPUP_TITLE_SIZE = 22;                      // 팝업 타이틀 크기 (px)
const POPUP_TITLE_WEIGHT = 700;                   // 팝업 타이틀 굵기

const POPUP_MESSAGE = "빠른 시간 내에 연락드리겠습니다."; // 팝업 메시지
const POPUP_MESSAGE_SIZE = 15;                    // 팝업 메시지 크기 (px)
const POPUP_MESSAGE_COLOR = "rgba(100,100,100,1)"; // 팝업 메시지 색상

const POPUP_BUTTON_TEXT = "확인";                  // 팝업 버튼 텍스트
const POPUP_BUTTON_WIDTH = 120;                   // 팝업 버튼 너비 (px)

// ============================================
// 💬 카카오톡 플로팅 버튼 설정
// ============================================
const KAKAO_ENABLED = true;                       // 카카오톡 버튼 사용 여부
const KAKAO_URL = "https://open.kakao.com/o/sYpCdW6h";  // 카카오톡 오픈채팅 URL (변경 필요)
const KAKAO_SIZE = 60;                            // 버튼 크기 (px)
const KAKAO_BOTTOM = 30;                          // 하단 여백 (px)
const KAKAO_RIGHT = 30;                           // 우측 여백 (px)
const KAKAO_BG = "#FEE500";                        // 카카오 노란색 배경
const KAKAO_SHADOW = "0 4px 12px rgba(0,0,0,0.15)"; // 그림자 효과

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    age: "",
    name: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    callTime: "anytime",
    gift: "vacuum",
    agreePrivacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const phone2Ref = useRef<HTMLInputElement>(null);
  const phone3Ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.age) {
      alert("연령대를 선택해주세요.");
      return;
    }
    if (!formData.name) {
      alert("성함을 입력해주세요.");
      return;
    }
    if (!formData.phone1 || !formData.phone2 || !formData.phone3) {
      alert("연락처를 입력해주세요.");
      return;
    }
    if (!formData.agreePrivacy) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const fullPhone = `${formData.phone1}-${formData.phone2}-${formData.phone3}`;

      // 통화 시간 라벨 변환
      const callTimeLabel = TIME_OPTIONS.find(opt => opt.value === formData.callTime)?.label || formData.callTime;

      // 선물 라벨 변환
      const giftLabel = GIFT_OPTIONS.find(opt => opt.value === formData.gift)?.label || formData.gift;

      const submitData = {
        ageGroup: formData.age,
        name: formData.name,
        phone: fullPhone,
        callTime: callTimeLabel,
        gift: giftLabel,
      };

      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      // no-cors 모드에서는 response를 읽을 수 없으므로 성공으로 간주
      setShowSuccessPopup(true);

      // 폼 초기화
      setFormData({
        age: "",
        name: "",
        phone1: "010",
        phone2: "",
        phone3: "",
        callTime: "anytime",
        gift: "vacuum",
        agreePrivacy: false,
      });
    } catch (error) {
      console.error("Form submission error:", error);
      alert("예약 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (field: 'phone1' | 'phone2' | 'phone3', value: string, maxLength: number) => {
    const numericValue = value.replace(/[^0-9]/g, "").slice(0, maxLength);
    setFormData({ ...formData, [field]: numericValue });

    // 자동으로 다음 필드로 이동
    if (numericValue.length === maxLength) {
      if (field === 'phone1') {
        phone2Ref.current?.focus();
      } else if (field === 'phone2') {
        phone3Ref.current?.focus();
      }
    }
  };

  return (
    <main className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: SECTION_BG }}>
      <Header />

      {/* 방문예약 섹션 - flex-1로 남은 공간 채움 */}
      <section
        className="relative flex flex-col items-center flex-1"
        style={{
          backgroundColor: SECTION_BG,
          paddingTop: `${SECTION_PADDING_TOP}px`,
          paddingBottom: `${SECTION_PADDING_BOTTOM}px`,
        }}
      >
        {/* 콘텐츠 컨테이너 */}
        <div
          className="w-full flex flex-col items-center"
          style={{
            maxWidth: `${CONTENT_MAX_WIDTH}px`,
            paddingLeft: `${CONTENT_PADDING_X}px`,
            paddingRight: `${CONTENT_PADDING_X}px`,
            gap: `${CONTENT_GAP}px`,
          }}
        >
          {/* 방문예약 이미지 */}
          <div className="w-full flex flex-col" style={{ gap: `${IMAGE_GAP}px` }}>
            {RESERVATION_IMAGES.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`방문예약 안내 ${index + 1}`}
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority={index === 0}
              />
            ))}
          </div>

          {/* 리드폼 */}
          <div
            className="w-full"
            style={{
              maxWidth: `${FORM_MAX_WIDTH}px`,
              backgroundColor: FORM_BG,
              borderRadius: `${FORM_BORDER_RADIUS}px`,
              paddingLeft: `${FORM_PADDING_X}px`,
              paddingRight: `${FORM_PADDING_X}px`,
              paddingTop: `${FORM_PADDING_Y}px`,
              paddingBottom: `${FORM_PADDING_Y}px`,
            }}
          >
            {/* 폼 타이틀 */}
            <div className="text-center" style={{ marginBottom: `${FORM_HEADER_MARGIN_BOTTOM}px` }}>
              <h2
                style={{
                  fontSize: `${FORM_TITLE_SIZE}px`,
                  fontWeight: FORM_TITLE_WEIGHT,
                  color: LABEL_COLOR,
                  marginBottom: `${FORM_TITLE_MARGIN_BOTTOM}px`,
                }}
              >
                {FORM_TITLE}
              </h2>
              <p style={{ fontSize: `${FORM_SUBTITLE_SIZE}px`, fontWeight: FORM_SUBTITLE_WEIGHT, color: SUB_TEXT_COLOR }}>
                {FORM_SUBTITLE}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: `${FORM_ITEM_GAP}px` }}>
              {/* 연령대 선택 */}
              <div>
                <label
                  className="block"
                  style={{
                    fontSize: `${LABEL_FONT_SIZE}px`,
                    fontWeight: LABEL_FONT_WEIGHT,
                    color: LABEL_COLOR,
                    marginBottom: `${LABEL_MARGIN_BOTTOM}px`,
                  }}
                >
                  연령대 선택 (혜택 안내용)
                </label>
                <div className="flex" style={{ gap: `${AGE_BUTTON_GAP}px` }}>
                  {AGE_OPTIONS.map((age) => (
                    <button
                      key={age}
                      type="button"
                      onClick={() => setFormData({ ...formData, age })}
                      className="flex-1 border transition-all"
                      style={{
                        fontSize: `${OPTION_FONT_SIZE}px`,
                        fontWeight: formData.age === age ? OPTION_FONT_WEIGHT_SELECTED : OPTION_FONT_WEIGHT_NORMAL,
                        paddingLeft: `${FIELD_PADDING_X}px`,
                        paddingRight: `${FIELD_PADDING_X}px`,
                        paddingTop: `${FIELD_PADDING_Y}px`,
                        paddingBottom: `${FIELD_PADDING_Y}px`,
                        borderRadius: `${FIELD_BORDER_RADIUS}px`,
                        backgroundColor: formData.age === age ? PRIMARY_COLOR : "white",
                        color: formData.age === age ? "white" : LABEL_COLOR,
                        borderColor: formData.age === age ? PRIMARY_COLOR : INPUT_BORDER_COLOR,
                      }}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              {/* 성함 */}
              <div>
                <label
                  className="block"
                  style={{
                    fontSize: `${LABEL_FONT_SIZE}px`,
                    fontWeight: LABEL_FONT_WEIGHT,
                    color: LABEL_COLOR,
                    marginBottom: `${LABEL_MARGIN_BOTTOM}px`,
                  }}
                >
                  성함
                </label>
                <input
                  type="text"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border outline-none transition-colors"
                  style={{
                    fontSize: `${INPUT_FONT_SIZE}px`,
                    paddingLeft: `${FIELD_PADDING_X}px`,
                    paddingRight: `${FIELD_PADDING_X}px`,
                    paddingTop: `${FIELD_PADDING_Y}px`,
                    paddingBottom: `${FIELD_PADDING_Y}px`,
                    borderRadius: `${FIELD_BORDER_RADIUS}px`,
                    borderColor: INPUT_BORDER_COLOR,
                  }}
                  onFocus={(e) => e.target.style.borderColor = INPUT_FOCUS_BORDER_COLOR}
                  onBlur={(e) => e.target.style.borderColor = INPUT_BORDER_COLOR}
                />
              </div>

              {/* 연락처 */}
              <div>
                <label
                  className="block"
                  style={{
                    fontSize: `${LABEL_FONT_SIZE}px`,
                    fontWeight: LABEL_FONT_WEIGHT,
                    color: LABEL_COLOR,
                    marginBottom: `${LABEL_MARGIN_BOTTOM}px`,
                  }}
                >
                  연락처
                </label>
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <input
                    type="tel"
                    placeholder="010"
                    value={formData.phone1}
                    onChange={(e) => handlePhoneChange('phone1', e.target.value, 3)}
                    maxLength={3}
                    className="flex-1 border outline-none transition-colors text-center"
                    style={{
                      fontSize: `${INPUT_FONT_SIZE}px`,
                      paddingLeft: `${FIELD_PADDING_X}px`,
                      paddingRight: `${FIELD_PADDING_X}px`,
                      paddingTop: `${FIELD_PADDING_Y}px`,
                      paddingBottom: `${FIELD_PADDING_Y}px`,
                      borderRadius: `${FIELD_BORDER_RADIUS}px`,
                      borderColor: INPUT_BORDER_COLOR,
                    }}
                    onFocus={(e) => e.target.style.borderColor = INPUT_FOCUS_BORDER_COLOR}
                    onBlur={(e) => e.target.style.borderColor = INPUT_BORDER_COLOR}
                  />
                  <span style={{ color: LABEL_COLOR, fontSize: '18px' }}>-</span>
                  <input
                    ref={phone2Ref}
                    type="tel"
                    placeholder="1234"
                    value={formData.phone2}
                    onChange={(e) => handlePhoneChange('phone2', e.target.value, 4)}
                    maxLength={4}
                    className="flex-1 border outline-none transition-colors text-center"
                    style={{
                      fontSize: `${INPUT_FONT_SIZE}px`,
                      paddingLeft: `${FIELD_PADDING_X}px`,
                      paddingRight: `${FIELD_PADDING_X}px`,
                      paddingTop: `${FIELD_PADDING_Y}px`,
                      paddingBottom: `${FIELD_PADDING_Y}px`,
                      borderRadius: `${FIELD_BORDER_RADIUS}px`,
                      borderColor: INPUT_BORDER_COLOR,
                    }}
                    onFocus={(e) => e.target.style.borderColor = INPUT_FOCUS_BORDER_COLOR}
                    onBlur={(e) => e.target.style.borderColor = INPUT_BORDER_COLOR}
                  />
                  <span style={{ color: LABEL_COLOR, fontSize: '18px' }}>-</span>
                  <input
                    ref={phone3Ref}
                    type="tel"
                    placeholder="5678"
                    value={formData.phone3}
                    onChange={(e) => handlePhoneChange('phone3', e.target.value, 4)}
                    maxLength={4}
                    className="flex-1 border outline-none transition-colors text-center"
                    style={{
                      fontSize: `${INPUT_FONT_SIZE}px`,
                      paddingLeft: `${FIELD_PADDING_X}px`,
                      paddingRight: `${FIELD_PADDING_X}px`,
                      paddingTop: `${FIELD_PADDING_Y}px`,
                      paddingBottom: `${FIELD_PADDING_Y}px`,
                      borderRadius: `${FIELD_BORDER_RADIUS}px`,
                      borderColor: INPUT_BORDER_COLOR,
                    }}
                    onFocus={(e) => e.target.style.borderColor = INPUT_FOCUS_BORDER_COLOR}
                    onBlur={(e) => e.target.style.borderColor = INPUT_BORDER_COLOR}
                  />
                </div>
              </div>

              {/* 통화 가능 시간 */}
              <div>
                <label
                  className="block"
                  style={{
                    fontSize: `${LABEL_FONT_SIZE}px`,
                    fontWeight: LABEL_FONT_WEIGHT,
                    color: LABEL_COLOR,
                    marginBottom: `${LABEL_MARGIN_BOTTOM}px`,
                  }}
                >
                  통화 가능 시간
                </label>
                <div className="flex flex-col" style={{ gap: `${OPTION_GAP}px` }}>
                  {TIME_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center border cursor-pointer transition-all"
                      style={{
                        gap: `${OPTION_GAP + 4}px`,
                        paddingLeft: `${FIELD_PADDING_X}px`,
                        paddingRight: `${FIELD_PADDING_X}px`,
                        paddingTop: `${FIELD_PADDING_Y}px`,
                        paddingBottom: `${FIELD_PADDING_Y}px`,
                        borderRadius: `${FIELD_BORDER_RADIUS}px`,
                        borderColor: formData.callTime === option.value ? PRIMARY_COLOR : INPUT_BORDER_COLOR,
                        backgroundColor: formData.callTime === option.value ? PRIMARY_HOVER_BG : "white",
                      }}
                    >
                      <input
                        type="radio"
                        name="callTime"
                        value={option.value}
                        checked={formData.callTime === option.value}
                        onChange={(e) => setFormData({ ...formData, callTime: e.target.value })}
                        style={{ width: `${CHECKBOX_SIZE}px`, height: `${CHECKBOX_SIZE}px` }}
                        className="accent-blue-500"
                      />
                      <span
                        style={{
                          fontSize: `${OPTION_FONT_SIZE}px`,
                          color: formData.callTime === option.value ? PRIMARY_COLOR : LABEL_COLOR,
                          fontWeight: formData.callTime === option.value ? OPTION_FONT_WEIGHT_SELECTED : OPTION_FONT_WEIGHT_NORMAL,
                        }}
                      >
                        {formData.callTime === option.value && "✓ "}{option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 선물 선택 */}
              <div>
                <label
                  className="block"
                  style={{
                    fontSize: `${LABEL_FONT_SIZE}px`,
                    fontWeight: LABEL_FONT_WEIGHT,
                    color: LABEL_COLOR,
                    marginBottom: `${LABEL_MARGIN_BOTTOM}px`,
                  }}
                >
                  계약 완료 시 받으실 선물 선택
                </label>
                <div className="flex flex-col" style={{ gap: `${OPTION_GAP}px` }}>
                  {GIFT_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center border cursor-pointer transition-all"
                      style={{
                        gap: `${OPTION_GAP + 4}px`,
                        paddingLeft: `${FIELD_PADDING_X}px`,
                        paddingRight: `${FIELD_PADDING_X}px`,
                        paddingTop: `${FIELD_PADDING_Y}px`,
                        paddingBottom: `${FIELD_PADDING_Y}px`,
                        borderRadius: `${FIELD_BORDER_RADIUS}px`,
                        borderColor: formData.gift === option.value ? PRIMARY_COLOR : INPUT_BORDER_COLOR,
                        backgroundColor: formData.gift === option.value ? PRIMARY_HOVER_BG : "white",
                      }}
                    >
                      <input
                        type="radio"
                        name="gift"
                        value={option.value}
                        checked={formData.gift === option.value}
                        onChange={(e) => setFormData({ ...formData, gift: e.target.value })}
                        style={{ width: `${CHECKBOX_SIZE}px`, height: `${CHECKBOX_SIZE}px` }}
                        className="accent-blue-500"
                      />
                      <span
                        style={{
                          fontSize: `${OPTION_FONT_SIZE}px`,
                          color: formData.gift === option.value ? PRIMARY_COLOR : LABEL_COLOR,
                          fontWeight: formData.gift === option.value ? OPTION_FONT_WEIGHT_SELECTED : OPTION_FONT_WEIGHT_NORMAL,
                        }}
                      >
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 개인정보 동의 */}
              <div>
                <label className="flex items-start cursor-pointer" style={{ gap: `${OPTION_GAP + 4}px` }}>
                  <input
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                    style={{ width: `${CHECKBOX_SIZE}px`, height: `${CHECKBOX_SIZE}px`, marginTop: '2px' }}
                    className="accent-blue-500"
                  />
                  <span style={{ fontSize: `${CHECKBOX_LABEL_SIZE}px`, color: LABEL_COLOR }}>
                    개인정보 수집 및 이용에 동의합니다.
                  </span>
                </label>
                <p
                  className="mt-2"
                  style={{
                    fontSize: `${PRIVACY_TEXT_SIZE}px`,
                    color: SUB_TEXT_COLOR,
                    backgroundColor: PRIVACY_BG_COLOR,
                    padding: `${PRIVACY_PADDING}px`,
                    borderRadius: `${FIELD_BORDER_RADIUS}px`,
                    lineHeight: PRIVACY_LINE_HEIGHT,
                  }}
                >
                  입력하신 정보(이름, 연락처, 연령대 등)는 군산 지곡 성원상떼빌 잔여세대 조회 및 상담, 모델하우스 방문 예약을 위해서만 활용됩니다. 수집된 정보는 분양/임대 일정 종료 후 안전하게 파기됩니다. 이에 동의하십니까?
                </p>
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  fontSize: `${SUBMIT_BUTTON_FONT_SIZE}px`,
                  fontWeight: SUBMIT_BUTTON_FONT_WEIGHT,
                  paddingTop: `${FIELD_PADDING_Y}px`,
                  paddingBottom: `${FIELD_PADDING_Y}px`,
                  borderRadius: `${FIELD_BORDER_RADIUS}px`,
                  backgroundColor: PRIMARY_COLOR,
                }}
              >
                {isSubmitting ? "예약 접수 중..." : SUBMIT_BUTTON_TEXT}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />

      {/* 성공 팝업 모달 */}
      {showSuccessPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowSuccessPopup(false)}
        >
          <div
            className="flex flex-col items-center text-center"
            style={{
              backgroundColor: POPUP_BG,
              borderRadius: `${POPUP_BORDER_RADIUS}px`,
              padding: `${POPUP_PADDING}px`,
              maxWidth: `${POPUP_MAX_WIDTH}px`,
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 체크 아이콘 */}
            <div
              className="flex items-center justify-center"
              style={{
                width: `${POPUP_ICON_SIZE}px`,
                height: `${POPUP_ICON_SIZE}px`,
                backgroundColor: POPUP_ICON_BG,
                borderRadius: `${POPUP_ICON_SIZE / 4}px`,
                marginBottom: "24px",
              }}
            >
              <svg
                width={POPUP_ICON_SIZE * 0.5}
                height={POPUP_ICON_SIZE * 0.5}
                viewBox="0 0 24 24"
                fill="none"
                stroke={POPUP_ICON_COLOR}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* 타이틀 */}
            <h3
              style={{
                fontSize: `${POPUP_TITLE_SIZE}px`,
                fontWeight: POPUP_TITLE_WEIGHT,
                color: LABEL_COLOR,
                marginBottom: "12px",
              }}
            >
              {POPUP_TITLE}
            </h3>

            {/* 메시지 */}
            <p
              style={{
                fontSize: `${POPUP_MESSAGE_SIZE}px`,
                color: POPUP_MESSAGE_COLOR,
                marginBottom: "28px",
              }}
            >
              {POPUP_MESSAGE}
            </p>

            {/* 확인 버튼 */}
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="text-white transition-all hover:opacity-90"
              style={{
                width: `${POPUP_BUTTON_WIDTH}px`,
                fontSize: `${SUBMIT_BUTTON_FONT_SIZE}px`,
                fontWeight: SUBMIT_BUTTON_FONT_WEIGHT,
                paddingTop: `${FIELD_PADDING_Y - 4}px`,
                paddingBottom: `${FIELD_PADDING_Y - 4}px`,
                borderRadius: `${FIELD_BORDER_RADIUS}px`,
                backgroundColor: PRIMARY_COLOR,
              }}
            >
              {POPUP_BUTTON_TEXT}
            </button>
          </div>
        </div>
      )}

      {/* 카카오톡 플로팅 버튼 */}
      {KAKAO_ENABLED && (
        <a
          href={KAKAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed flex items-center justify-center transition-transform hover:scale-110 z-40"
          style={{
            width: `${KAKAO_SIZE}px`,
            height: `${KAKAO_SIZE}px`,
            bottom: `${KAKAO_BOTTOM}px`,
            right: `${KAKAO_RIGHT}px`,
            backgroundColor: KAKAO_BG,
            borderRadius: "50%",
            boxShadow: KAKAO_SHADOW,
          }}
          aria-label="카카오톡 상담"
        >
          {/* 카카오톡 아이콘 */}
          <svg
            width={KAKAO_SIZE * 0.5}
            height={KAKAO_SIZE * 0.5}
            viewBox="0 0 24 24"
            fill="#3C1E1E"
          >
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.86 5.33 4.64 6.74-.15.54-.97 3.48-1 3.63 0 .11.04.22.12.29.08.07.19.1.29.08.14-.02 3.55-2.33 4.1-2.71.61.09 1.23.13 1.85.13 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
          </svg>
        </a>
      )}
    </main>
  )
}
