"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// 설정값 import (Footer.config.ts에서 값 수정 가능)
import {
  FOOTER_BG,
  FOOTER_HEIGHT,
  FOOTER_PADDING_X,
  CONTENT_GAP,
  LEFT_GROUP_X,
  LEFT_GROUP_Y,
  LEFT_GROUP_GAP,
  LEFT_GROUP_ALIGN_X,
  LEFT_GROUP_ALIGN_Y,
  LOGO_SRC,
  LOGO_SIZE,
  MOBILE_LOGO_SIZE,
  LOGO_X,
  LOGO_Y,
  COMPANY_INFO_X,
  COMPANY_INFO_Y,
  COMPANY_INFO,
  COMPANY_LABEL_WIDTH,
  COMPANY_INFO_SIZE,
  COMPANY_LABEL_COLOR,
  COMPANY_VALUE_COLOR,
  COMPANY_INFO_GAP,
  COPYRIGHT_X,
  COPYRIGHT_Y,
  COPYRIGHT_LINES,
  COPYRIGHT_SIZE,
  COPYRIGHT_WEIGHT,
  COPYRIGHT_COLOR,
  COPYRIGHT_GAP,
  RIGHT_GROUP_X,
  RIGHT_GROUP_Y,
  RIGHT_GROUP_GAP,
  RIGHT_GROUP_ALIGN_X,
  RIGHT_GROUP_ALIGN_Y,
  PHONE_X,
  PHONE_Y,
  PHONE_LABEL,
  PHONE_LABEL_X,
  PHONE_LABEL_Y,
  PHONE_LABEL_SIZE,
  PHONE_LABEL_WEIGHT,
  PHONE_LABEL_COLOR,
  PHONE_NUMBER,
  PHONE_NUMBER_X,
  PHONE_NUMBER_Y,
  PHONE_NUMBER_SIZE,
  PHONE_NUMBER_WEIGHT,
  PHONE_NUMBER_COLOR,
  PHONE_GAP,
  PHONE_BLINK_ENABLED,
  PHONE_BLINK_COLOR,
  PHONE_BLINK_DURATION,
  EXPLORE_X,
  EXPLORE_Y,
  EXPLORE_TITLE,
  EXPLORE_TITLE_SIZE,
  EXPLORE_TITLE_WEIGHT,
  EXPLORE_TITLE_COLOR,
  SNS_X,
  SNS_Y,
  SNS_ICONS,
  SNS_ICON_SIZE,
  SNS_ICON_GAP,
} from "./Footer.config"

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
  const phoneNumberRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // 전화번호 깜빡임 애니메이션 (헤더와 반대: 주황색에서 시작)
  useEffect(() => {
    if (PHONE_BLINK_ENABLED && phoneNumberRef.current) {
      gsap.fromTo(phoneNumberRef.current,
        { color: PHONE_BLINK_COLOR },
        {
          color: PHONE_NUMBER_COLOR,
          duration: PHONE_BLINK_DURATION,
          repeat: -1,
          yoyo: true,
          ease: "steps(1)"
        }
      )
    }
  }, [])

  return (
    <footer className={`text-gray-400 ${FOOTER_PADDING_X} overflow-hidden`} style={{ height: isMobile ? 'auto' : `${FOOTER_HEIGHT}px`, backgroundColor: FOOTER_BG, paddingTop: isMobile ? '40px' : 0, paddingBottom: isMobile ? '40px' : 0 }}>
      <div className={`max-w-7xl mx-auto h-full flex flex-col md:flex-row ${isMobile ? 'items-center' : 'items-stretch'} justify-between ${CONTENT_GAP}`}>

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
            width={isMobile ? MOBILE_LOGO_SIZE : LOGO_SIZE}
            height={isMobile ? MOBILE_LOGO_SIZE : LOGO_SIZE}
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
                <span style={{ minWidth: `${COMPANY_LABEL_WIDTH}px`, flexShrink: 0, color: COMPANY_LABEL_COLOR }}>{info.label}</span>
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

        {/* 오른쪽: 대표번호 + 더 알아보기 + SNS 로고 (PC에서만 표시) */}
        {!isMobile && (
        <div
          className={`flex flex-col ${getAlignX(RIGHT_GROUP_ALIGN_X)} ${getAlignY(RIGHT_GROUP_ALIGN_Y)}`}
          style={{
            transform: `translate(${RIGHT_GROUP_X}px, ${RIGHT_GROUP_Y}px)`,
            gap: `${RIGHT_GROUP_GAP}px`
          }}
        >
          {/* 대표번호 */}
          <div
            className="flex items-center"
            style={{
              transform: `translate(${PHONE_X}px, ${PHONE_Y}px)`,
              gap: `${PHONE_GAP}px`
            }}
          >
            <span style={{
              fontSize: `${PHONE_LABEL_SIZE}px`,
              fontWeight: PHONE_LABEL_WEIGHT,
              color: PHONE_LABEL_COLOR,
              transform: `translate(${PHONE_LABEL_X}px, ${PHONE_LABEL_Y}px)`
            }}>
              {PHONE_LABEL}
            </span>
            <span
              ref={phoneNumberRef}
              style={{
                fontSize: `${PHONE_NUMBER_SIZE}px`,
                fontWeight: PHONE_NUMBER_WEIGHT,
                color: PHONE_BLINK_COLOR,
                transform: `translate(${PHONE_NUMBER_X}px, ${PHONE_NUMBER_Y}px)`
              }}
            >
              {PHONE_NUMBER}
            </span>
          </div>

          {/* 더 알아보기 */}
          <p
            style={{
              transform: `translate(${EXPLORE_X}px, ${EXPLORE_Y}px)`,
              fontSize: `${EXPLORE_TITLE_SIZE}px`,
              fontWeight: EXPLORE_TITLE_WEIGHT,
              color: EXPLORE_TITLE_COLOR
            }}
          >
            {EXPLORE_TITLE}
          </p>

          {/* SNS 로고 */}
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

          {/* 로그인 */}
          <a
            href="/login"
            className="hover:opacity-70 transition-opacity cursor-pointer"
            style={{
              fontSize: '14px',
              color: 'rgba(150,150,150,1)',
              marginTop: '8px',
            }}
          >
            로그인
          </a>
        </div>
        )}

      </div>
    </footer>
  );
}
