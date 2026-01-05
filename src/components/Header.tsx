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
const LEFT_GROUP_POSITION: number = 15;      // 그룹 위치 (%) - 0=왼쪽 끝, 50=중앙, 100=오른쪽 끝
const LEFT_GROUP_X = 0;                      // 미세 조정 좌우 (px)
const LEFT_GROUP_Y = 0;                      // 미세 조정 상하 (px)

// 로고 이미지 설정
const LOGO_SRC = "/gunsan_logo_from_original_rgb1_69_154.png";   // 로고 이미지 경로 (public 폴더)
const LOGO_SIZE = 200;                       // 로고 크기 (px) - 너비 기준, 높이는 비율 자동
const LOGO_X = 0;                            // 로고 좌우 위치 (px)
const LOGO_Y = 0;                            // 로고 상하 위치 (px)

// ============================================
// 📋 중간 그룹 설정 (네비게이션)
// ============================================
const NAV_GROUP_POSITION: number = 50;       // 그룹 위치 (%) - 0=왼쪽 끝, 50=중앙, 100=오른쪽 끝
const NAV_GROUP_X = 0;                       // 미세 조정 좌우 (px)
const NAV_GROUP_Y = 0;                       // 미세 조정 상하 (px)
const NAV_GAP = 100;                          // 메뉴 사이 간격 (px)

// 네비게이션 메뉴 항목 (서브메뉴 포함)
const NAV_ITEMS = [
  {
    label: "사업개요",
    href: "/business",
    subItems: []
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
    href: "/complex",
    subItems: [
      { label: "단지배치도", href: "/complex/layout" },
      { label: "동호수배치도", href: "/complex/unit-layout" },
      { label: "커뮤니티", href: "/complex/community" },
    ]
  },
  {
    label: "세대안내",
    href: "/unit",
    subItems: [
      { label: "인테리어", href: "/unit/interior" },
      { label: "타입안내", href: "/unit/type" },
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
const DROPDOWN_ENABLED = true;                        // 드롭다운 메뉴 사용 여부
const DROPDOWN_BG = "rgba(255,255,255,1)";            // 드롭다운 배경색
const DROPDOWN_HEIGHT = 180;                          // 드롭다운 높이 (px)
const DROPDOWN_BORDER_COLOR = "rgba(230,230,230,1)";  // 드롭다운 테두리 색상
const DROPDOWN_ANIM_DURATION = 0.3;                   // 드롭다운 애니메이션 시간 (초)
const DROPDOWN_PADDING_TOP = 24;                      // 드롭다운 상단 여백 (px)

// 드롭다운 서브메뉴 글자 설정
const DROPDOWN_ITEM_COLOR = "rgba(100,100,100,1)";    // 서브메뉴 글자색
const DROPDOWN_ITEM_HOVER_COLOR = "rgba(200,50,50,1)"; // 서브메뉴 호버 글자색 (빨간색)
const DROPDOWN_ITEM_SIZE = 14;                        // 서브메뉴 글자 크기 (px)
const DROPDOWN_ITEM_WEIGHT = 400;                     // 서브메뉴 글자 굵기 - 100~900
const DROPDOWN_ITEM_LINE_HEIGHT = 1.5;                // 서브메뉴 줄 높이 - 1.0=글자크기, 1.5=1.5배
const DROPDOWN_ITEM_LETTER_SPACING = 0;               // 서브메뉴 자간 (px)
const DROPDOWN_ITEM_GAP = 16;                         // 서브메뉴 항목 세로 간격 (px)
const DROPDOWN_ITEM_PADDING_X = 12;                   // 서브메뉴 항목 좌우 여백 (px)
const DROPDOWN_ITEM_PADDING_Y = 6;                    // 서브메뉴 항목 상하 여백 (px)

// 드롭다운 컬럼 설정
const DROPDOWN_COLUMN_MIN_WIDTH = 100;                // 컬럼 최소 너비 (px) - 자간/여백에 따라 자동 확장

// 네비게이션 스타일
const NAV_FONT_SIZE = 15;                    // 글자 크기 (px)
const NAV_HOVER_SCALE = 1.1;                 // 호버 시 확대 비율 - 1.0=원본, 1.1=10% 확대
const NAV_FONT_WEIGHT = 300;                 // 글자 굵기 - 100~900
const NAV_HOVER_FONT_WEIGHT = 500;           // 호버 시 글자 굵기 - 100~900
const NAV_COLOR = "rgba(0, 0, 0, 1)";        // 글자 색상 (R,G,B,투명도 0~1)
const NAV_HOVER_COLOR = "rgba(0, 28, 61,1)"; // 호버 시 색상 (R,G,B,투명도 0~1)
const NAV_LETTER_SPACING = 0;                // 기본 자간 (px)
const NAV_HOVER_LETTER_SPACING = 2;          // 호버 시 자간 (px)
const NAV_HOVER_ANIM_DURATION = 0.3;         // 호버 애니메이션 시간 (초)
const NAV_ITEM_WIDTH = 80;                   // 메뉴 항목 고정 너비 (px) - 자간 변화 시 레이아웃 유지

// ============================================
// 📞 우측 그룹 설정 (전화번호)
// ============================================
const RIGHT_GROUP_POSITION: number = 85;     // 그룹 위치 (%) - 0=왼쪽 끝, 50=중앙, 100=오른쪽 끝
const RIGHT_GROUP_X = 0;                     // 미세 조정 좌우 (px)
const RIGHT_GROUP_Y = 0;                     // 미세 조정 상하 (px)

// 전화번호 박스 설정
const PHONE_NUMBER = "1833-5859";            // 전화번호
const PHONE_BOX_BG = "rgba(0,28,61,1)";      // 박스 배경색 - rgba(R,G,B,투명도 0~1)
const PHONE_BOX_PADDING_X = 24;              // 박스 좌우 패딩 (px)
const PHONE_BOX_PADDING_Y = 8;               // 박스 상하 패딩 (px)
const PHONE_BOX_RADIUS = 9999;               // 박스 둥글기 (px) - 9999 = 완전 둥글게
const PHONE_BOX_BORDER = "rgba(255,255,255,0.1)"; // 박스 테두리 색상 - rgba(R,G,B,투명도 0~1)

// 전화 아이콘 설정
const PHONE_ICON_SIZE = 20;                  // 아이콘 크기 (px)
const PHONE_ICON_COLOR = "rgba(255,255,255,1)"; // 아이콘 색상 - rgba(R,G,B,투명도 0~1)
const PHONE_ICON_FILL = true;                // 아이콘 채우기 여부

// 전화번호 텍스트 설정
const PHONE_FONT_SIZE = 20;                  // 글자 크기 (px)
const PHONE_FONT_WEIGHT = 700;               // 글자 굵기 - 100~900
const PHONE_COLOR = "rgba(255,255,255,1)";   // 글자 색상 - rgba(R,G,B,투명도 0~1)
const PHONE_GAP = 12;                        // 아이콘과 번호 사이 간격 (px)

// 전화번호 깜빡임 애니메이션 설정
const PHONE_BLINK_ENABLED = true;            // 깜빡임 사용 여부
const PHONE_BLINK_COLOR = "rgba(255,100,0,1)"; // 깜빡임 색상 (강렬한 주황색) - rgba(R,G,B,투명도 0~1)
const PHONE_BLINK_DURATION = 0.8;            // 깜빡임 속도 (초) - 한 색상에서 다른 색상으로 전환 시간

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
  const phoneNumberRef = useRef(null)
  const phoneIconRef = useRef(null)
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

  // 전화번호 깜빡임 애니메이션
  useEffect(() => {
    if (PHONE_BLINK_ENABLED && phoneNumberRef.current && phoneIconRef.current) {
      const blinkConfig = {
        color: PHONE_BLINK_COLOR,
        duration: PHONE_BLINK_DURATION,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)"
      }
      gsap.to(phoneNumberRef.current, blinkConfig)
      gsap.to(phoneIconRef.current, blinkConfig)
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
          <a href="/" className="cursor-pointer">
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
          </a>
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
                  scale: NAV_HOVER_SCALE,
                  fontWeight: NAV_HOVER_FONT_WEIGHT,
                  duration: NAV_HOVER_ANIM_DURATION,
                  ease: "power2.out"
                })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  color: NAV_COLOR,
                  letterSpacing: `${NAV_LETTER_SPACING}px`,
                  scale: 1,
                  fontWeight: NAV_FONT_WEIGHT,
                  duration: NAV_HOVER_ANIM_DURATION,
                  ease: "power2.out"
                })
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* 우측: 전화번호 (데스크톱) */}
        <div
          className="absolute hidden md:flex items-center"
          style={{
            left: `${RIGHT_GROUP_POSITION}%`,
            transform: `translateX(${RIGHT_GROUP_POSITION === 0 ? 0 : RIGHT_GROUP_POSITION === 100 ? -100 : -50}%) translate(${RIGHT_GROUP_X}px, ${RIGHT_GROUP_Y}px)`
          }}
        >
          <div
            className="flex items-center shadow-xl"
            style={{
              backgroundColor: PHONE_BOX_BG,
              paddingLeft: `${PHONE_BOX_PADDING_X}px`,
              paddingRight: `${PHONE_BOX_PADDING_X}px`,
              paddingTop: `${PHONE_BOX_PADDING_Y}px`,
              paddingBottom: `${PHONE_BOX_PADDING_Y}px`,
              borderRadius: `${PHONE_BOX_RADIUS}px`,
              border: `1px solid ${PHONE_BOX_BORDER}`,
              gap: `${PHONE_GAP}px`
            }}
          >
            <span ref={phoneIconRef} style={{ color: PHONE_ICON_COLOR, display: 'flex' }}>
              <Phone
                size={PHONE_ICON_SIZE}
                className={PHONE_ICON_FILL ? "fill-current" : ""}
              />
            </span>
            <span
              ref={phoneNumberRef}
              style={{
                fontSize: `${PHONE_FONT_SIZE}px`,
                fontWeight: PHONE_FONT_WEIGHT,
                color: PHONE_COLOR
              }}
            >
              {PHONE_NUMBER}
            </span>
          </div>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <Button
          variant="ghost"
          className="md:hidden text-white hover:bg-white/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* 데스크톱 드롭다운 메가메뉴 */}
      {DROPDOWN_ENABLED && isHovered && (
        <div
          className="absolute left-0 w-full hidden lg:block"
          style={{
            top: `${HEADER_HEIGHT}px`,
            height: `${DROPDOWN_HEIGHT}px`,
            backgroundColor: DROPDOWN_BG,
            borderTop: `1px solid ${DROPDOWN_BORDER_COLOR}`,
            borderBottom: `1px solid ${DROPDOWN_BORDER_COLOR}`,
            animation: `slideDown ${DROPDOWN_ANIM_DURATION}s ease-out`,
            paddingTop: `${DROPDOWN_PADDING_TOP}px`,
          }}
        >
          <div
            className="w-full h-full flex justify-center"
            style={{ gap: `${NAV_GAP}px` }}
          >
            {NAV_ITEMS.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
                style={{ minWidth: `${DROPDOWN_COLUMN_MIN_WIDTH}px` }}
              >
                {/* 서브메뉴 항목들 */}
                <div className="flex flex-col items-center" style={{ gap: `${DROPDOWN_ITEM_GAP}px` }}>
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.href}
                      className="transition-colors cursor-pointer whitespace-nowrap"
                      style={{
                        fontSize: `${DROPDOWN_ITEM_SIZE}px`,
                        fontWeight: DROPDOWN_ITEM_WEIGHT,
                        color: DROPDOWN_ITEM_COLOR,
                        lineHeight: DROPDOWN_ITEM_LINE_HEIGHT,
                        letterSpacing: `${DROPDOWN_ITEM_LETTER_SPACING}px`,
                        paddingLeft: `${DROPDOWN_ITEM_PADDING_X}px`,
                        paddingRight: `${DROPDOWN_ITEM_PADDING_X}px`,
                        paddingTop: `${DROPDOWN_ITEM_PADDING_Y}px`,
                        paddingBottom: `${DROPDOWN_ITEM_PADDING_Y}px`,
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = DROPDOWN_ITEM_HOVER_COLOR}
                      onMouseLeave={(e) => e.currentTarget.style.color = DROPDOWN_ITEM_COLOR}
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 모바일 메뉴 드롭다운 */}
      {isMenuOpen && (
        <div
          className="lg:hidden text-center shadow-lg"
          style={{
            backgroundColor: MOBILE_MENU_BG,
            paddingTop: `${MOBILE_MENU_PADDING_Y}px`,
            paddingBottom: `${MOBILE_MENU_PADDING_Y}px`,
          }}
        >
          <div className="flex flex-col" style={{ gap: `${MOBILE_MENU_ITEM_GAP}px` }}>
            {NAV_ITEMS.map((item, index) => (
              <div key={index}>
                <a
                  href={item.href}
                  className="block transition-colors font-medium"
                  style={{ color: MOBILE_MENU_TEXT_COLOR }}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) => e.currentTarget.style.color = MOBILE_MENU_HOVER_COLOR}
                  onMouseLeave={(e) => e.currentTarget.style.color = MOBILE_MENU_TEXT_COLOR}
                >
                  {item.label}
                </a>
                {/* 모바일 서브메뉴 */}
                {item.subItems.length > 0 && (
                  <div className="flex flex-col mt-2" style={{ gap: '8px' }}>
                    {item.subItems.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.href}
                        className="block transition-colors text-sm"
                        style={{ color: DROPDOWN_ITEM_COLOR }}
                        onClick={() => setIsMenuOpen(false)}
                        onMouseEnter={(e) => e.currentTarget.style.color = DROPDOWN_ITEM_HOVER_COLOR}
                        onMouseLeave={(e) => e.currentTarget.style.color = DROPDOWN_ITEM_COLOR}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
