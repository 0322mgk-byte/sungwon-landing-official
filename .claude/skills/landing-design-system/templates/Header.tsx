"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// ============================================
// 🎨 헤더 설정
// ============================================

// 전체 레이아웃
const HEADER_HEIGHT = 80;                    // 헤더 높이 (px)
const HEADER_BG = "rgba(0,0,0,0.1)";         // 배경색 - rgba(R,G,B,투명도 0~1) | 예: rgba(0,0,0,0.1) = 검정 10% 불투명
const HEADER_HOVER_BG = "rgba(255,255,255,1)"; // 호버 시 배경색 - rgba(R,G,B,투명도 0~1)
const HEADER_PADDING_X = 20;                 // 좌우 패딩 (px)

// 애니메이션 설정
const ANIM_ENABLED = true;                   // 진입 애니메이션 사용 여부
const ANIM_DURATION = 1;                     // 애니메이션 시간 (초)
const ANIM_EASE = "power3.inOut";            // 이징 - power1~4 + .in(천천히시작) / .out(천천히끝) / .inOut(양쪽천천히)

// ============================================
// 🖼️ 좌측 그룹 설정 (로고)
// ============================================
const LEFT_GROUP_POSITION: number = 0;       // 그룹 위치 (%) - 0=왼쪽 끝, 50=중앙, 100=오른쪽 끝
const LEFT_GROUP_X = 0;                      // 미세 조정 좌우 (px)
const LEFT_GROUP_Y = 0;                      // 미세 조정 상하 (px)

// 로고 이미지 설정
const LOGO_SRC = "/logo.png";                // 로고 이미지 경로 (public 폴더)
const LOGO_SIZE = 150;                       // 로고 크기 (px) - 너비 기준, 높이는 비율 자동
const LOGO_X = 0;                            // 로고 좌우 위치 (px)
const LOGO_Y = 0;                            // 로고 상하 위치 (px)

// ============================================
// 📋 중간 그룹 설정 (네비게이션)
// ============================================
const NAV_GROUP_POSITION: number = 50;       // 그룹 위치 (%) - 0=왼쪽 끝, 50=중앙, 100=오른쪽 끝
const NAV_GROUP_X = 0;                       // 미세 조정 좌우 (px)
const NAV_GROUP_Y = 0;                       // 미세 조정 상하 (px)
const NAV_GAP = 60;                          // 메뉴 사이 간격 (px)

// 네비게이션 메뉴 항목 (원하는 대로 수정)
const NAV_ITEMS = [
  { label: "소개", href: "#intro" },
  { label: "서비스", href: "#services" },
  { label: "포트폴리오", href: "#portfolio" },
  { label: "문의", href: "#contact" },
];

// 네비게이션 스타일
const NAV_FONT_SIZE = 15;                    // 글자 크기 (px)
const NAV_FONT_WEIGHT = 400;                 // 글자 굵기 - 100~900
const NAV_COLOR = "rgba(255,255,255,0.9)";   // 글자 색상 (R,G,B,투명도 0~1)
const NAV_HOVER_COLOR = "rgba(255,255,255,1)"; // 호버 시 색상 (R,G,B,투명도 0~1)
const NAV_LETTER_SPACING = 0;                // 기본 자간 (px)
const NAV_HOVER_LETTER_SPACING = 2;          // 호버 시 자간 (px)
const NAV_HOVER_ANIM_DURATION = 0.3;         // 호버 애니메이션 시간 (초)
const NAV_ITEM_WIDTH = 80;                   // 메뉴 항목 고정 너비 (px) - 자간 변화 시 레이아웃 유지

// ============================================
// 📞 우측 그룹 설정 (CTA 버튼/전화번호)
// ============================================
const RIGHT_GROUP_POSITION: number = 100;    // 그룹 위치 (%) - 0=왼쪽 끝, 50=중앙, 100=오른쪽 끝
const RIGHT_GROUP_X = 0;                     // 미세 조정 좌우 (px)
const RIGHT_GROUP_Y = 0;                     // 미세 조정 상하 (px)

// CTA 박스 설정
const CTA_TEXT = "1234-5678";                // 표시할 텍스트 (전화번호 또는 버튼 텍스트)
const CTA_BOX_BG = "rgba(0,28,61,1)";        // 박스 배경색 - rgba(R,G,B,투명도 0~1)
const CTA_BOX_PADDING_X = 24;                // 박스 좌우 패딩 (px)
const CTA_BOX_PADDING_Y = 8;                 // 박스 상하 패딩 (px)
const CTA_BOX_RADIUS = 9999;                 // 박스 둥글기 (px) - 9999 = 완전 둥글게
const CTA_BOX_BORDER = "rgba(255,255,255,0.1)"; // 박스 테두리 색상 - rgba(R,G,B,투명도 0~1)

// CTA 아이콘 설정
const CTA_ICON_SIZE = 20;                    // 아이콘 크기 (px)
const CTA_ICON_COLOR = "rgba(255,255,255,1)"; // 아이콘 색상 - rgba(R,G,B,투명도 0~1)
const CTA_ICON_FILL = true;                  // 아이콘 채우기 여부
const CTA_SHOW_ICON = true;                  // 아이콘 표시 여부

// CTA 텍스트 설정
const CTA_FONT_SIZE = 18;                    // 글자 크기 (px)
const CTA_FONT_WEIGHT = 700;                 // 글자 굵기 - 100~900
const CTA_COLOR = "rgba(255,255,255,1)";     // 글자 색상 - rgba(R,G,B,투명도 0~1)
const CTA_GAP = 12;                          // 아이콘과 텍스트 사이 간격 (px)

// ============================================
// 📱 모바일 메뉴 설정
// ============================================
const MOBILE_MENU_BG = "rgba(255,255,255,1)";       // 모바일 메뉴 배경색 - rgba(R,G,B,투명도 0~1)
const MOBILE_MENU_TEXT_COLOR = "rgba(0,0,0,1)";     // 모바일 메뉴 글자색 - rgba(R,G,B,투명도 0~1)
const MOBILE_MENU_HOVER_COLOR = "rgba(37,99,235,1)"; // 모바일 메뉴 호버 색상 - rgba(R,G,B,투명도 0~1)
const MOBILE_MENU_PADDING_Y = 16;            // 모바일 메뉴 상하 패딩 (px)
const MOBILE_MENU_ITEM_GAP = 16;             // 모바일 메뉴 항목 간격 (px)

// ============================================

export default function Header() {
  const headerRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (ANIM_ENABLED && headerRef.current) {
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: ANIM_DURATION,
        ease: ANIM_EASE
      })
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full z-50 transition-colors duration-300"
      style={{ height: `${HEADER_HEIGHT}px`, backgroundColor: isHovered ? HEADER_HOVER_BG : HEADER_BG }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full h-full relative flex items-center"
        style={{ paddingLeft: `${HEADER_PADDING_X}px`, paddingRight: `${HEADER_PADDING_X}px` }}
      >

        {/* 좌측: 로고 */}
        <div
          className="absolute flex items-center"
          style={{
            left: `${LEFT_GROUP_POSITION}%`,
            transform: `translateX(${LEFT_GROUP_POSITION === 0 ? 0 : LEFT_GROUP_POSITION === 100 ? -100 : -50}%) translate(${LEFT_GROUP_X}px, ${LEFT_GROUP_Y}px)`
          }}
        >
          <Image
            src={LOGO_SRC}
            alt="로고"
            width={LOGO_SIZE}
            height={0}
            className="object-contain h-auto"
            style={{
              width: `${LOGO_SIZE}px`,
              height: 'auto',
              transform: `translate(${LOGO_X}px, ${LOGO_Y}px)`
            }}
          />
        </div>

        {/* 중간: 네비게이션 (데스크톱) */}
        <nav
          className="absolute hidden lg:flex"
          style={{
            left: `${NAV_GROUP_POSITION}%`,
            transform: `translateX(${NAV_GROUP_POSITION === 0 ? 0 : NAV_GROUP_POSITION === 100 ? -100 : -50}%) translate(${NAV_GROUP_X}px, ${NAV_GROUP_Y}px)`,
            gap: `${NAV_GAP}px`
          }}
        >
          {NAV_ITEMS.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="cursor-pointer text-center"
              style={{
                fontSize: `${NAV_FONT_SIZE}px`,
                fontWeight: NAV_FONT_WEIGHT,
                color: NAV_COLOR,
                letterSpacing: `${NAV_LETTER_SPACING}px`,
                width: `${NAV_ITEM_WIDTH}px`,
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  color: NAV_HOVER_COLOR,
                  letterSpacing: `${NAV_HOVER_LETTER_SPACING}px`,
                  duration: NAV_HOVER_ANIM_DURATION,
                  ease: "power2.out"
                })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  color: NAV_COLOR,
                  letterSpacing: `${NAV_LETTER_SPACING}px`,
                  duration: NAV_HOVER_ANIM_DURATION,
                  ease: "power2.out"
                })
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* 우측: CTA 버튼 (데스크톱) */}
        <div
          className="absolute hidden md:flex items-center"
          style={{
            left: `${RIGHT_GROUP_POSITION}%`,
            transform: `translateX(${RIGHT_GROUP_POSITION === 0 ? 0 : RIGHT_GROUP_POSITION === 100 ? -100 : -50}%) translate(${RIGHT_GROUP_X}px, ${RIGHT_GROUP_Y}px)`
          }}
        >
          <div
            className="flex items-center shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: CTA_BOX_BG,
              paddingLeft: `${CTA_BOX_PADDING_X}px`,
              paddingRight: `${CTA_BOX_PADDING_X}px`,
              paddingTop: `${CTA_BOX_PADDING_Y}px`,
              paddingBottom: `${CTA_BOX_PADDING_Y}px`,
              borderRadius: `${CTA_BOX_RADIUS}px`,
              border: `1px solid ${CTA_BOX_BORDER}`,
              gap: `${CTA_GAP}px`
            }}
          >
            {CTA_SHOW_ICON && (
              <Phone
                size={CTA_ICON_SIZE}
                style={{ color: CTA_ICON_COLOR }}
                className={CTA_ICON_FILL ? "fill-current" : ""}
              />
            )}
            <span
              style={{
                fontSize: `${CTA_FONT_SIZE}px`,
                fontWeight: CTA_FONT_WEIGHT,
                color: CTA_COLOR
              }}
            >
              {CTA_TEXT}
            </span>
          </div>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <Button
          variant="ghost"
          className="absolute right-4 md:hidden text-white hover:bg-white/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* 모바일 메뉴 드롭다운 */}
      {isMenuOpen && (
        <div
          className="md:hidden text-center shadow-lg"
          style={{
            backgroundColor: MOBILE_MENU_BG,
            paddingTop: `${MOBILE_MENU_PADDING_Y}px`,
            paddingBottom: `${MOBILE_MENU_PADDING_Y}px`,
          }}
        >
          <div className="flex flex-col" style={{ gap: `${MOBILE_MENU_ITEM_GAP}px` }}>
            {NAV_ITEMS.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block transition-colors"
                style={{ color: MOBILE_MENU_TEXT_COLOR }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => e.currentTarget.style.color = MOBILE_MENU_HOVER_COLOR}
                onMouseLeave={(e) => e.currentTarget.style.color = MOBILE_MENU_TEXT_COLOR}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
