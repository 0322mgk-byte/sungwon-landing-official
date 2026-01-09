"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import Link from "next/link"
import { Phone, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { usePathname } from "next/navigation"

// 설정값 import (Header.config.ts에서 값 수정 가능)
import {
  HEADER_HEIGHT,
  HEADER_BG,
  HEADER_HOVER_BG,
  HEADER_SCROLL_BG,
  HEADER_SCROLL_THRESHOLD,
  HEADER_SCROLL_BORDER_COLOR,
  HEADER_SCROLL_BORDER_WIDTH,
  HEADER_PADDING_X,
  LEFT_GROUP_POSITION,
  LEFT_GROUP_X,
  LEFT_GROUP_Y,
  LOGO_SRC,
  LOGO_SIZE,
  LOGO_X,
  LOGO_Y,
  NAV_GROUP_POSITION,
  NAV_GROUP_X,
  NAV_GROUP_Y,
  NAV_GAP,
  NAV_ITEMS,
  DROPDOWN_ENABLED,
  DROPDOWN_BG,
  DROPDOWN_BORDER_COLOR,
  DROPDOWN_ANIM_DURATION,
  DROPDOWN_PADDING_TOP,
  DROPDOWN_PADDING_BOTTOM,
  DROPDOWN_ITEM_COLOR,
  DROPDOWN_ITEM_HOVER_COLOR,
  DROPDOWN_ITEM_SIZE,
  DROPDOWN_ITEM_WEIGHT,
  DROPDOWN_ITEM_LINE_HEIGHT,
  DROPDOWN_ITEM_LETTER_SPACING,
  DROPDOWN_ITEM_GAP,
  DROPDOWN_ITEM_PADDING_X,
  DROPDOWN_ITEM_PADDING_Y,
  DROPDOWN_DIVIDER_COLOR,
  DROPDOWN_DIVIDER_WIDTH,
  NAV_FONT_SIZE,
  NAV_HOVER_SCALE,
  NAV_FONT_WEIGHT,
  NAV_HOVER_FONT_WEIGHT,
  NAV_COLOR,
  NAV_HOVER_COLOR,
  NAV_LETTER_SPACING,
  NAV_HOVER_LETTER_SPACING,
  NAV_HOVER_ANIM_DURATION,
  NAV_ITEM_WIDTH,
  RIGHT_GROUP_POSITION,
  RIGHT_GROUP_X,
  RIGHT_GROUP_Y,
  PHONE_NUMBER,
  PHONE_BOX_BG,
  PHONE_BOX_PADDING_X,
  PHONE_BOX_PADDING_Y,
  PHONE_BOX_RADIUS,
  PHONE_BOX_BORDER,
  PHONE_ICON_SIZE,
  PHONE_ICON_COLOR,
  PHONE_ICON_FILL,
  PHONE_FONT_SIZE,
  PHONE_FONT_WEIGHT,
  PHONE_COLOR,
  PHONE_GAP,
  PHONE_BLINK_ENABLED,
  PHONE_BLINK_COLOR,
  PHONE_BLINK_DURATION,
  MOBILE_HEADER_BG,
  MOBILE_LOGO_SRC,
  MOBILE_LOGO_SIZE,
  MOBILE_MENU_BG,
  MOBILE_MENU_TEXT_COLOR,
  MOBILE_MENU_HOVER_COLOR,
  MOBILE_MENU_PADDING_Y,
  MOBILE_MENU_ITEM_GAP,
} from "./Header.config"

export default function Header() {
  const headerRef = useRef(null)
  const phoneNumberRef = useRef(null)
  const phoneIconRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // 서브페이지에서 스크롤 감지
  useEffect(() => {
    if (isHomePage) return // 홈에서는 스크롤 감지 안함

    const handleScroll = () => {
      setIsScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // 초기 상태 확인

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

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

  // 모바일 여부 감지
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // 모바일 메뉴 바깥 클릭 시 닫기
  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const header = headerRef.current as HTMLElement | null
      if (header && !header.contains(e.target as Node)) {
        setIsMenuOpen(false)
        setOpenSubMenu(null)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMenuOpen])

  // 배경색 결정: 모바일 > 호버 > 스크롤(서브페이지) > 기본
  const getHeaderBg = () => {
    if (isMobile) return MOBILE_HEADER_BG
    if (isHovered) return HEADER_HOVER_BG
    if (!isHomePage && isScrolled) return HEADER_SCROLL_BG
    return HEADER_BG
  }

  // 하단 테두리 결정: 서브페이지 스크롤 시에만 표시
  const getHeaderBorder = () => {
    if (!isHomePage && isScrolled) {
      return `${HEADER_SCROLL_BORDER_WIDTH}px solid ${HEADER_SCROLL_BORDER_COLOR}`
    }
    return `${HEADER_SCROLL_BORDER_WIDTH}px solid transparent`
  }

  return (
    <>
      {/* 모바일 배경색 CSS */}
      <style jsx global>{`
        @media (max-width: 767px) {
          .header-mobile-bg {
            background-color: ${MOBILE_HEADER_BG} !important;
          }
        }
      `}</style>
      <header
        ref={headerRef}
        className="fixed top-0 w-full z-50 header-mobile-bg"
        style={{
          height: `${HEADER_HEIGHT}px`,
          backgroundColor: getHeaderBg(),
          borderBottom: getHeaderBorder()
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      <div
        className="w-full h-full relative flex items-center"
        style={{ paddingLeft: `${HEADER_PADDING_X}px`, paddingRight: `${HEADER_PADDING_X}px` }}
      >

        {/* 좌측: 로고 (데스크톱) */}
        <div
          className="absolute hidden md:flex items-center"
          style={{
            left: `${LEFT_GROUP_POSITION}%`,
            transform: `translateX(${LEFT_GROUP_POSITION === 0 ? 0 : LEFT_GROUP_POSITION === 100 ? -100 : -50}%) translate(${LEFT_GROUP_X}px, ${LEFT_GROUP_Y}px)`
          }}
        >
          <Link href="/" className="cursor-pointer">
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
          </Link>
        </div>

        {/* 모바일 메뉴 버튼 (좌측) */}
        <button
          className="md:hidden text-white hover:bg-white/10 -ml-2 p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X size={32} strokeWidth={1.5} />
          ) : (
            <svg width="36" height="32" viewBox="0 0 36 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="6" x2="30" y2="6" />
              <line x1="2" y1="16" x2="30" y2="16" />
              <line x1="2" y1="26" x2="30" y2="26" />
            </svg>
          )}
        </button>

        {/* 중앙: 로고 (모바일) */}
        <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
          <Link href="/" className="cursor-pointer">
            <Image
              src={MOBILE_LOGO_SRC}
              alt="로고"
              width={MOBILE_LOGO_SIZE}
              height={0}
              className="object-contain h-auto"
              style={{
                width: `${MOBILE_LOGO_SIZE}px`,
                height: 'auto',
              }}
            />
          </Link>
        </div>

        {/* 우측: 전화버튼 (모바일) */}
        <a
          href={`tel:${PHONE_NUMBER.replace(/-/g, '')}`}
          className="md:hidden absolute right-4 flex items-center gap-1"
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD700 100%)',
            padding: '6px 10px',
            borderRadius: '20px',
            boxShadow: '0 3px 12px rgba(255, 107, 53, 0.4), 0 0 15px rgba(255, 215, 0, 0.25)',
            animation: 'pulse-glow 1.5s ease-in-out infinite',
          }}
        >
          <Phone size={14} className="text-white" fill="white" />
          <span
            style={{
              color: 'white',
              fontSize: '12px',
              fontWeight: 700,
              textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            전화상담
          </span>
        </a>

        {/* 중간: 네비게이션 (데스크톱) */}
        <nav
          className="absolute hidden lg:flex"
          style={{
            left: `${NAV_GROUP_POSITION}%`,
            transform: `translateX(${NAV_GROUP_POSITION === 0 ? 0 : NAV_GROUP_POSITION === 100 ? -100 : -50}%) translate(${NAV_GROUP_X}px, ${NAV_GROUP_Y}px)`,
            gap: `${NAV_GAP}px`
          }}
        >
          {NAV_ITEMS.filter(item => !item.mobileOnly).map((item, index) => (
            <Link
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
            </Link>
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
                color: PHONE_COLOR,
                whiteSpace: 'nowrap'
              }}
            >
              {PHONE_NUMBER}
            </span>
          </div>
        </div>

      </div>

      {/* 데스크톱 드롭다운 메가메뉴 */}
      {DROPDOWN_ENABLED && isHovered && (
        <div
          className="absolute left-0 w-full hidden lg:block"
          style={{
            top: `${HEADER_HEIGHT}px`,
            backgroundColor: DROPDOWN_BG,
            borderTop: `1px solid ${DROPDOWN_BORDER_COLOR}`,
            borderBottom: `1px solid ${DROPDOWN_BORDER_COLOR}`,
            animation: `slideDown ${DROPDOWN_ANIM_DURATION}s ease-out`,
            paddingTop: `${DROPDOWN_PADDING_TOP}px`,
            paddingBottom: `${DROPDOWN_PADDING_BOTTOM}px`,
          }}
        >
          <div
            className="w-full flex justify-center"
            style={{ gap: `${NAV_GAP}px` }}
          >
            {NAV_ITEMS.filter(item => !item.mobileOnly).map((item, index, filteredItems) => (
              <div
                key={index}
                className="relative flex flex-col items-center"
                style={{ width: `${NAV_ITEM_WIDTH}px` }}
              >
                {/* 컬럼 왼쪽 구분선 */}
                <div
                  className="absolute"
                  style={{
                    top: `-${DROPDOWN_PADDING_TOP}px`,
                    bottom: `-${DROPDOWN_PADDING_BOTTOM}px`,
                    left: `-${NAV_GAP / 2}px`,
                    width: `${DROPDOWN_DIVIDER_WIDTH}px`,
                    backgroundColor: DROPDOWN_DIVIDER_COLOR,
                  }}
                />
                {/* 마지막 컬럼 오른쪽 구분선 */}
                {index === filteredItems.length - 1 && (
                  <div
                    className="absolute"
                    style={{
                      top: `-${DROPDOWN_PADDING_TOP}px`,
                      bottom: `-${DROPDOWN_PADDING_BOTTOM}px`,
                      right: `-${NAV_GAP / 2}px`,
                      width: `${DROPDOWN_DIVIDER_WIDTH}px`,
                      backgroundColor: DROPDOWN_DIVIDER_COLOR,
                    }}
                  />
                )}
                {/* 서브메뉴 항목들 */}
                <div className="flex flex-col items-center" style={{ gap: `${DROPDOWN_ITEM_GAP}px` }}>
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
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
                    </Link>
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
          className="lg:hidden shadow-lg"
          style={{
            backgroundColor: MOBILE_MENU_BG,
            paddingTop: `${MOBILE_MENU_PADDING_Y}px`,
            paddingBottom: `${MOBILE_MENU_PADDING_Y}px`,
          }}
        >
          <div className="flex flex-col">
            {NAV_ITEMS.map((item, index) => (
              <div key={index}>
                {/* 구분선 (첫 번째 항목 제외) */}
                {index > 0 && (
                  <div
                    style={{
                      height: '1px',
                      backgroundColor: DROPDOWN_DIVIDER_COLOR,
                      marginLeft: '20px',
                      marginRight: '20px',
                    }}
                  />
                )}
                {/* 메인 메뉴 항목 */}
                {item.subItems.length > 0 ? (
                  <button
                    className="w-full flex items-center justify-between transition-colors font-medium"
                    style={{
                      color: MOBILE_MENU_TEXT_COLOR,
                      paddingTop: `${MOBILE_MENU_ITEM_GAP}px`,
                      paddingBottom: `${MOBILE_MENU_ITEM_GAP}px`,
                      paddingLeft: '36px',
                      paddingRight: '36px',
                    }}
                    onClick={() => setOpenSubMenu(openSubMenu === index ? null : index)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={18}
                      className="transition-transform"
                      style={{
                        transform: openSubMenu === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-left transition-colors font-medium"
                    style={{
                      color: MOBILE_MENU_TEXT_COLOR,
                      paddingTop: `${MOBILE_MENU_ITEM_GAP}px`,
                      paddingBottom: `${MOBILE_MENU_ITEM_GAP}px`,
                      paddingLeft: '36px',
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
                {/* 모바일 서브메뉴 (아코디언) */}
                {item.subItems.length > 0 && openSubMenu === index && (
                  <div
                    className="flex flex-col"
                    style={{
                      backgroundColor: 'rgba(245,245,245,1)',
                      paddingTop: '16px',
                      paddingBottom: '16px',
                    }}
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="block text-left transition-colors"
                        style={{
                          color: 'rgba(60,60,60,1)',
                          fontSize: '15px',
                          paddingTop: '12px',
                          paddingBottom: '12px',
                          paddingLeft: '48px',
                        }}
                        onClick={() => {
                          setIsMenuOpen(false)
                          setOpenSubMenu(null)
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = DROPDOWN_ITEM_HOVER_COLOR}
                        onMouseLeave={(e) => e.currentTarget.style.color = DROPDOWN_ITEM_COLOR}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
    </>
  )
}
