"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import Link from "next/link"
import { Phone, Menu, X } from "lucide-react"
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
  DROPDOWN_HEIGHT,
  DROPDOWN_BORDER_COLOR,
  DROPDOWN_ANIM_DURATION,
  DROPDOWN_PADDING_TOP,
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

  // 배경색 결정: 호버 > 스크롤(서브페이지) > 기본
  const getHeaderBg = () => {
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
    <header
      ref={headerRef}
      className="fixed top-0 w-full z-50"
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

        {/* 좌측: 로고 */}
        <div
          className="absolute flex items-center"
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
                className="relative flex flex-col items-center"
                style={{ width: `${NAV_ITEM_WIDTH}px` }}
              >
                {/* 컬럼 왼쪽 구분선 */}
                <div
                  className="absolute"
                  style={{
                    top: `-${DROPDOWN_PADDING_TOP}px`,
                    left: `-${NAV_GAP / 2}px`,
                    width: `${DROPDOWN_DIVIDER_WIDTH}px`,
                    backgroundColor: DROPDOWN_DIVIDER_COLOR,
                    height: `${DROPDOWN_HEIGHT}px`,
                  }}
                />
                {/* 마지막 컬럼 오른쪽 구분선 */}
                {index === NAV_ITEMS.length - 1 && (
                  <div
                    className="absolute"
                    style={{
                      top: `-${DROPDOWN_PADDING_TOP}px`,
                      right: `-${NAV_GAP / 2}px`,
                      width: `${DROPDOWN_DIVIDER_WIDTH}px`,
                      backgroundColor: DROPDOWN_DIVIDER_COLOR,
                      height: `${DROPDOWN_HEIGHT}px`,
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
                <Link
                  href={item.href}
                  className="block transition-colors font-medium"
                  style={{ color: MOBILE_MENU_TEXT_COLOR }}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) => e.currentTarget.style.color = MOBILE_MENU_HOVER_COLOR}
                  onMouseLeave={(e) => e.currentTarget.style.color = MOBILE_MENU_TEXT_COLOR}
                >
                  {item.label}
                </Link>
                {/* 모바일 서브메뉴 */}
                {item.subItems.length > 0 && (
                  <div className="flex flex-col mt-2" style={{ gap: '8px' }}>
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="block transition-colors text-sm"
                        style={{ color: DROPDOWN_ITEM_COLOR }}
                        onClick={() => setIsMenuOpen(false)}
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
  )
}
