"use client"

import { useState, useRef, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import QuickNav from "@/components/QuickNav"
import Image from "next/image"

// 설정값 import (config.ts에서 값 수정 가능)
import {
  SECTION_BG,
  SECTION_PADDING_TOP,
  SECTION_PADDING_BOTTOM,
  CONTENT_MAX_WIDTH,
  CONTENT_PADDING_X,
  CONTENT_GAP,
  RESERVATION_IMAGES,
  MOBILE_RESERVATION_IMAGES,
  IMAGE_GAP,
  FORM_MAX_WIDTH,
  FORM_PADDING_X,
  FORM_PADDING_Y,
  FORM_BG,
  FORM_BORDER_RADIUS,
  FORM_ITEM_GAP,
  PRIMARY_COLOR,
  PRIMARY_HOVER_BG,
  LABEL_COLOR,
  SUB_TEXT_COLOR,
  INPUT_BORDER_COLOR,
  INPUT_FOCUS_BORDER_COLOR,
  PRIVACY_BG_COLOR,
  FORM_TITLE,
  FORM_TITLE_SIZE,
  FORM_TITLE_WEIGHT,
  FORM_TITLE_MARGIN_BOTTOM,
  FORM_SUBTITLE,
  FORM_SUBTITLE_SIZE,
  FORM_SUBTITLE_WEIGHT,
  FORM_HEADER_MARGIN_BOTTOM,
  LABEL_FONT_SIZE,
  LABEL_FONT_WEIGHT,
  LABEL_MARGIN_BOTTOM,
  FIELD_PADDING_X,
  FIELD_PADDING_Y,
  FIELD_BORDER_RADIUS,
  INPUT_FONT_SIZE,
  OPTION_FONT_SIZE,
  OPTION_FONT_WEIGHT_NORMAL,
  OPTION_FONT_WEIGHT_SELECTED,
  OPTION_GAP,
  AGE_BUTTON_GAP,
  CHECKBOX_SIZE,
  CHECKBOX_LABEL_SIZE,
  PRIVACY_TEXT_SIZE,
  PRIVACY_LINE_HEIGHT,
  PRIVACY_PADDING,
  SUBMIT_BUTTON_TEXT,
  SUBMIT_BUTTON_FONT_SIZE,
  SUBMIT_BUTTON_FONT_WEIGHT,
  AGE_OPTIONS,
  TIME_OPTIONS,
  GIFT_OPTIONS,
  APPS_SCRIPT_URL,
  POPUP_BG,
  POPUP_BORDER_RADIUS,
  POPUP_PADDING,
  POPUP_MAX_WIDTH,
  POPUP_ICON_SIZE,
  POPUP_ICON_BG,
  POPUP_ICON_COLOR,
  POPUP_TITLE,
  POPUP_TITLE_SIZE,
  POPUP_TITLE_WEIGHT,
  POPUP_MESSAGE,
  POPUP_MESSAGE_SIZE,
  POPUP_MESSAGE_COLOR,
  POPUP_BUTTON_TEXT,
  POPUP_BUTTON_WIDTH,
  KAKAO_ENABLED,
  KAKAO_URL,
  KAKAO_SIZE,
  KAKAO_BOTTOM,
  KAKAO_LEFT,
  KAKAO_BG,
  KAKAO_SHADOW,
  // 모바일 설정
  MOBILE_FORM_PADDING_X,
  MOBILE_FORM_PADDING_Y,
  MOBILE_FORM_ITEM_GAP,
  MOBILE_FORM_TITLE_SIZE,
  MOBILE_FORM_SUBTITLE_SIZE,
  MOBILE_LABEL_FONT_SIZE,
  MOBILE_INPUT_FONT_SIZE,
  MOBILE_OPTION_FONT_SIZE,
  MOBILE_FIELD_PADDING_X,
  MOBILE_FIELD_PADDING_Y,
  MOBILE_AGE_BUTTON_GAP,
} from "./config"

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
  const [isMobile, setIsMobile] = useState(false);
  const [showPhonePrefixPopup, setShowPhonePrefixPopup] = useState(false);
  const [showPcDropdown, setShowPcDropdown] = useState(false);

  // 전화번호 앞자리 옵션
  const PHONE_PREFIX_OPTIONS = ["010", "011", "016", "017", "018", "019"];

  // 모바일 감지 (뷰포트 너비 기준 - 768px 미만)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("orientationchange", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", checkMobile);
    };
  }, []);

  // 모바일/데스크톱 값 선택 헬퍼
  const formPaddingX = isMobile ? MOBILE_FORM_PADDING_X : FORM_PADDING_X;
  const formPaddingY = isMobile ? MOBILE_FORM_PADDING_Y : FORM_PADDING_Y;
  const formItemGap = isMobile ? MOBILE_FORM_ITEM_GAP : FORM_ITEM_GAP;
  const titleSize = isMobile ? MOBILE_FORM_TITLE_SIZE : FORM_TITLE_SIZE;
  const subtitleSize = isMobile ? MOBILE_FORM_SUBTITLE_SIZE : FORM_SUBTITLE_SIZE;
  const labelFontSize = isMobile ? MOBILE_LABEL_FONT_SIZE : LABEL_FONT_SIZE;
  const inputFontSize = isMobile ? MOBILE_INPUT_FONT_SIZE : INPUT_FONT_SIZE;
  const optionFontSize = isMobile ? MOBILE_OPTION_FONT_SIZE : OPTION_FONT_SIZE;
  const fieldPaddingX = isMobile ? MOBILE_FIELD_PADDING_X : FIELD_PADDING_X;
  const fieldPaddingY = isMobile ? MOBILE_FIELD_PADDING_Y : FIELD_PADDING_Y;
  const ageButtonGap = isMobile ? MOBILE_AGE_BUTTON_GAP : AGE_BUTTON_GAP;

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
        {/* 빠른 네비게이션 버튼 */}
        <QuickNav />

        {/* 콘텐츠 컨테이너 */}
        <div
          className="w-full flex flex-col items-center"
          style={{
            maxWidth: isMobile ? '100%' : `${CONTENT_MAX_WIDTH}px`,
            paddingLeft: isMobile ? 0 : `${CONTENT_PADDING_X}px`,
            paddingRight: isMobile ? 0 : `${CONTENT_PADDING_X}px`,
            gap: isMobile ? '16px' : `${CONTENT_GAP}px`,
          }}
        >
          {/* 방문예약 이미지 */}
          <div className="w-full flex flex-col" style={{ gap: `${IMAGE_GAP}px` }}>
            {(isMobile ? MOBILE_RESERVATION_IMAGES : RESERVATION_IMAGES).map((src, index) => (
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
              maxWidth: isMobile ? '100%' : `${FORM_MAX_WIDTH}px`,
              backgroundColor: FORM_BG,
              borderRadius: isMobile ? 0 : `${FORM_BORDER_RADIUS}px`,
              paddingLeft: `${formPaddingX}px`,
              paddingRight: `${formPaddingX}px`,
              paddingTop: `${formPaddingY}px`,
              paddingBottom: `${formPaddingY}px`,
            }}
          >
            {/* 폼 타이틀 */}
            <div className="text-center" style={{ marginBottom: `${FORM_HEADER_MARGIN_BOTTOM}px` }}>
              <h2
                style={{
                  fontSize: `${titleSize}px`,
                  fontWeight: FORM_TITLE_WEIGHT,
                  color: LABEL_COLOR,
                  marginBottom: `${FORM_TITLE_MARGIN_BOTTOM}px`,
                }}
              >
                {FORM_TITLE}
              </h2>
              <p style={{ fontSize: `${subtitleSize}px`, fontWeight: FORM_SUBTITLE_WEIGHT, color: SUB_TEXT_COLOR }}>
                {FORM_SUBTITLE}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: `${formItemGap}px` }}>
              {/* 연령대 선택 */}
              <div>
                <label
                  className="block"
                  style={{
                    fontSize: `${labelFontSize}px`,
                    fontWeight: LABEL_FONT_WEIGHT,
                    color: LABEL_COLOR,
                    marginBottom: `${LABEL_MARGIN_BOTTOM}px`,
                  }}
                >
                  연령대 선택 (혜택 안내용)
                </label>
                <div className="flex" style={{ gap: `${ageButtonGap}px` }}>
                  {AGE_OPTIONS.map((age) => (
                    <button
                      key={age}
                      type="button"
                      onClick={() => setFormData({ ...formData, age })}
                      className="flex-1 border transition-all"
                      style={{
                        fontSize: `${optionFontSize}px`,
                        fontWeight: formData.age === age ? OPTION_FONT_WEIGHT_SELECTED : OPTION_FONT_WEIGHT_NORMAL,
                        paddingLeft: `${fieldPaddingX}px`,
                        paddingRight: `${fieldPaddingX}px`,
                        paddingTop: `${fieldPaddingY}px`,
                        paddingBottom: `${fieldPaddingY}px`,
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
                    fontSize: `${labelFontSize}px`,
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
                    fontSize: `${inputFontSize}px`,
                    paddingLeft: `${fieldPaddingX}px`,
                    paddingRight: `${fieldPaddingX}px`,
                    paddingTop: `${fieldPaddingY}px`,
                    paddingBottom: `${fieldPaddingY}px`,
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
                    fontSize: `${labelFontSize}px`,
                    fontWeight: LABEL_FONT_WEIGHT,
                    color: LABEL_COLOR,
                    marginBottom: `${LABEL_MARGIN_BOTTOM}px`,
                  }}
                >
                  연락처
                </label>
                <div className="flex items-center" style={{ gap: isMobile ? '4px' : '8px' }}>
                  {/* PC: 커스텀 드롭다운 */}
                  {!isMobile ? (
                    <div className="relative flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => setShowPcDropdown(!showPcDropdown)}
                        className="w-full border outline-none transition-colors text-center cursor-pointer flex items-center justify-center"
                        style={{
                          fontSize: `${inputFontSize}px`,
                          paddingLeft: `${fieldPaddingX}px`,
                          paddingRight: `${fieldPaddingX}px`,
                          paddingTop: `${fieldPaddingY}px`,
                          paddingBottom: `${fieldPaddingY}px`,
                          borderRadius: `${FIELD_BORDER_RADIUS}px`,
                          borderColor: showPcDropdown ? INPUT_FOCUS_BORDER_COLOR : INPUT_BORDER_COLOR,
                          backgroundColor: 'white',
                          gap: '6px',
                        }}
                      >
                        <span>{formData.phone1}</span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#666"
                          strokeWidth="2"
                          style={{
                            transform: showPcDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                          }}
                        >
                          <path d="M6 9l6 6 6-6"/>
                        </svg>
                      </button>
                      {/* PC 드롭다운 메뉴 */}
                      {showPcDropdown && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowPcDropdown(false)}
                          />
                          <div
                            className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-lg z-20 overflow-hidden"
                            style={{ borderColor: INPUT_BORDER_COLOR }}
                          >
                            {PHONE_PREFIX_OPTIONS.map((prefix, index) => (
                              <button
                                key={prefix}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, phone1: prefix });
                                  setShowPcDropdown(false);
                                }}
                                className="w-full text-center transition-colors hover:bg-gray-50"
                                style={{
                                  padding: '12px 16px',
                                  fontSize: `${inputFontSize}px`,
                                  color: formData.phone1 === prefix ? PRIMARY_COLOR : LABEL_COLOR,
                                  fontWeight: formData.phone1 === prefix ? 600 : 400,
                                  backgroundColor: formData.phone1 === prefix ? PRIMARY_HOVER_BG : 'transparent',
                                  borderBottom: index < PHONE_PREFIX_OPTIONS.length - 1 ? '1px solid #f0f0f0' : 'none',
                                }}
                              >
                                {prefix}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    /* 모바일: 버튼 클릭 시 팝업 */
                    <button
                      type="button"
                      onClick={() => setShowPhonePrefixPopup(true)}
                      className="flex-1 min-w-0 border outline-none transition-colors text-center flex items-center justify-center"
                      style={{
                        fontSize: `${inputFontSize}px`,
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        paddingTop: `${fieldPaddingY}px`,
                        paddingBottom: `${fieldPaddingY}px`,
                        borderRadius: `${FIELD_BORDER_RADIUS}px`,
                        borderColor: INPUT_BORDER_COLOR,
                        backgroundColor: 'white',
                        gap: '4px',
                      }}
                    >
                      <span>{formData.phone1}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                  )}
                  <span style={{ color: LABEL_COLOR, fontSize: isMobile ? '14px' : '18px' }}>-</span>
                  <input
                    ref={phone2Ref}
                    type="tel"
                    placeholder="1234"
                    value={formData.phone2}
                    onChange={(e) => handlePhoneChange('phone2', e.target.value, 4)}
                    maxLength={4}
                    className="flex-1 min-w-0 border outline-none transition-colors text-center"
                    style={{
                      fontSize: `${inputFontSize}px`,
                      paddingLeft: isMobile ? '8px' : `${fieldPaddingX}px`,
                      paddingRight: isMobile ? '8px' : `${fieldPaddingX}px`,
                      paddingTop: `${fieldPaddingY}px`,
                      paddingBottom: `${fieldPaddingY}px`,
                      borderRadius: `${FIELD_BORDER_RADIUS}px`,
                      borderColor: INPUT_BORDER_COLOR,
                    }}
                    onFocus={(e) => e.target.style.borderColor = INPUT_FOCUS_BORDER_COLOR}
                    onBlur={(e) => e.target.style.borderColor = INPUT_BORDER_COLOR}
                  />
                  <span style={{ color: LABEL_COLOR, fontSize: isMobile ? '14px' : '18px' }}>-</span>
                  <input
                    ref={phone3Ref}
                    type="tel"
                    placeholder="5678"
                    value={formData.phone3}
                    onChange={(e) => handlePhoneChange('phone3', e.target.value, 4)}
                    maxLength={4}
                    className="flex-1 min-w-0 border outline-none transition-colors text-center"
                    style={{
                      fontSize: `${inputFontSize}px`,
                      paddingLeft: isMobile ? '8px' : `${fieldPaddingX}px`,
                      paddingRight: isMobile ? '8px' : `${fieldPaddingX}px`,
                      paddingTop: `${fieldPaddingY}px`,
                      paddingBottom: `${fieldPaddingY}px`,
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
                    fontSize: `${labelFontSize}px`,
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
                        paddingLeft: `${fieldPaddingX}px`,
                        paddingRight: `${fieldPaddingX}px`,
                        paddingTop: `${fieldPaddingY}px`,
                        paddingBottom: `${fieldPaddingY}px`,
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
                        style={{ width: `${isMobile ? 18 : CHECKBOX_SIZE}px`, height: `${isMobile ? 18 : CHECKBOX_SIZE}px` }}
                        className="accent-blue-500"
                      />
                      <span
                        style={{
                          fontSize: `${optionFontSize}px`,
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
                    fontSize: `${labelFontSize}px`,
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
                        paddingLeft: `${fieldPaddingX}px`,
                        paddingRight: `${fieldPaddingX}px`,
                        paddingTop: `${fieldPaddingY}px`,
                        paddingBottom: `${fieldPaddingY}px`,
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
                        style={{ width: `${isMobile ? 18 : CHECKBOX_SIZE}px`, height: `${isMobile ? 18 : CHECKBOX_SIZE}px` }}
                        className="accent-blue-500"
                      />
                      <span
                        style={{
                          fontSize: `${optionFontSize}px`,
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
                    style={{ width: `${isMobile ? 18 : CHECKBOX_SIZE}px`, height: `${isMobile ? 18 : CHECKBOX_SIZE}px`, marginTop: '2px' }}
                    className="accent-blue-500"
                  />
                  <span style={{ fontSize: `${isMobile ? 13 : CHECKBOX_LABEL_SIZE}px`, color: LABEL_COLOR }}>
                    개인정보 수집 및 이용에 동의합니다.
                  </span>
                </label>
                <p
                  className="mt-2"
                  style={{
                    fontSize: `${isMobile ? 11 : PRIVACY_TEXT_SIZE}px`,
                    color: SUB_TEXT_COLOR,
                    backgroundColor: PRIVACY_BG_COLOR,
                    padding: `${isMobile ? 10 : PRIVACY_PADDING}px`,
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
                  fontSize: `${isMobile ? 15 : SUBMIT_BUTTON_FONT_SIZE}px`,
                  fontWeight: SUBMIT_BUTTON_FONT_WEIGHT,
                  paddingTop: `${fieldPaddingY}px`,
                  paddingBottom: `${fieldPaddingY}px`,
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
              padding: isMobile ? `${POPUP_PADDING * 0.7}px` : `${POPUP_PADDING}px`,
              maxWidth: `${POPUP_MAX_WIDTH}px`,
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 체크 아이콘 */}
            <div
              className="flex items-center justify-center"
              style={{
                width: isMobile ? `${POPUP_ICON_SIZE * 0.8}px` : `${POPUP_ICON_SIZE}px`,
                height: isMobile ? `${POPUP_ICON_SIZE * 0.8}px` : `${POPUP_ICON_SIZE}px`,
                backgroundColor: POPUP_ICON_BG,
                borderRadius: `${POPUP_ICON_SIZE / 4}px`,
                marginBottom: isMobile ? "16px" : "24px",
              }}
            >
              <svg
                width={isMobile ? POPUP_ICON_SIZE * 0.4 : POPUP_ICON_SIZE * 0.5}
                height={isMobile ? POPUP_ICON_SIZE * 0.4 : POPUP_ICON_SIZE * 0.5}
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
                fontSize: isMobile ? `${POPUP_TITLE_SIZE * 0.82}px` : `${POPUP_TITLE_SIZE}px`,
                fontWeight: POPUP_TITLE_WEIGHT,
                color: LABEL_COLOR,
                marginBottom: isMobile ? "8px" : "12px",
              }}
            >
              {POPUP_TITLE}
            </h3>

            {/* 메시지 */}
            <p
              style={{
                fontSize: isMobile ? `${POPUP_MESSAGE_SIZE * 0.87}px` : `${POPUP_MESSAGE_SIZE}px`,
                color: POPUP_MESSAGE_COLOR,
                marginBottom: isMobile ? "20px" : "28px",
              }}
            >
              {POPUP_MESSAGE}
            </p>

            {/* 확인 버튼 */}
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="text-white transition-all hover:opacity-90"
              style={{
                width: isMobile ? `${POPUP_BUTTON_WIDTH * 0.9}px` : `${POPUP_BUTTON_WIDTH}px`,
                fontSize: isMobile ? `${SUBMIT_BUTTON_FONT_SIZE * 0.9}px` : `${SUBMIT_BUTTON_FONT_SIZE}px`,
                fontWeight: SUBMIT_BUTTON_FONT_WEIGHT,
                paddingTop: isMobile ? `${FIELD_PADDING_Y - 6}px` : `${FIELD_PADDING_Y - 4}px`,
                paddingBottom: isMobile ? `${FIELD_PADDING_Y - 6}px` : `${FIELD_PADDING_Y - 4}px`,
                borderRadius: `${FIELD_BORDER_RADIUS}px`,
                backgroundColor: PRIMARY_COLOR,
              }}
            >
              {POPUP_BUTTON_TEXT}
            </button>
          </div>
        </div>
      )}

      {/* 모바일 전화번호 앞자리 선택 팝업 */}
      {showPhonePrefixPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowPhonePrefixPopup(false)}
        >
          <div
            className="bg-white"
            style={{
              width: "280px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #eee",
              }}
            >
              <span style={{ fontSize: "16px", fontWeight: 600, color: LABEL_COLOR }}>
                - 선택 -
              </span>
              <button
                type="button"
                onClick={() => setShowPhonePrefixPopup(false)}
                style={{ padding: "4px", color: "#666" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* 옵션 목록 */}
            <div className="flex flex-col">
              {PHONE_PREFIX_OPTIONS.map((prefix, index) => (
                <button
                  key={prefix}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, phone1: prefix });
                    setShowPhonePrefixPopup(false);
                  }}
                  className="w-full text-center transition-colors"
                  style={{
                    padding: "14px 20px",
                    fontSize: "15px",
                    color: formData.phone1 === prefix ? PRIMARY_COLOR : LABEL_COLOR,
                    fontWeight: formData.phone1 === prefix ? 600 : 400,
                    backgroundColor: formData.phone1 === prefix ? PRIMARY_HOVER_BG : "transparent",
                    borderBottom: index < PHONE_PREFIX_OPTIONS.length - 1 ? "1px solid #f0f0f0" : "none",
                  }}
                >
                  {prefix}
                  {formData.phone1 === prefix && " ✓"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 카카오톡 플로팅 버튼 (모바일에서만 표시) */}
      {KAKAO_ENABLED && (
        <a
          href={KAKAO_URL}
          className="fixed flex items-center justify-center transition-transform hover:scale-110 z-40 md:hidden"
          style={{
            width: `${KAKAO_SIZE}px`,
            height: `${KAKAO_SIZE}px`,
            bottom: `${KAKAO_BOTTOM}px`,
            left: `${KAKAO_LEFT}px`,
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
