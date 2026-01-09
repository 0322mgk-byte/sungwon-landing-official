"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  QUICK_NAV_ENABLED,
  QUICK_NAV_BTN_FONT_SIZE,
  QUICK_NAV_BTN_MOBILE_FONT_SIZE,
  QUICK_NAV_BTN_FONT_WEIGHT,
  QUICK_NAV_ITEMS,
} from "./Hero.config"

// 스타일 설정
const ACTIVE_BG = "rgba(0,28,61,1)"        // 네이비 배경 (활성)
const ACTIVE_COLOR = "rgba(255,255,255,1)" // 흰색 텍스트 (활성)
const INACTIVE_BG = "rgba(255,255,255,1)"  // 흰색 배경 (비활성)
const INACTIVE_COLOR = "rgba(100,100,100,1)" // 회색 텍스트 (비활성)
const HOVER_BG = "rgba(0,28,61,0.1)"       // 연한 네이비 (호버)
const BORDER_COLOR = "rgba(200,200,200,1)" // 테두리/구분선 색상

export default function QuickNav() {
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!QUICK_NAV_ENABLED) return null

  // 현재 페이지인지 확인
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <div
      className="flex justify-center"
      style={{
        marginTop: '24px',
        marginBottom: isMobile ? '24px' : '48px',
      }}
    >
      {/* 하나의 박스로 감싸기 */}
      <div
        className="flex"
        style={{
          border: `1px solid ${BORDER_COLOR}`,
          borderRadius: '0px',
          overflow: 'hidden',
        }}
      >
        {QUICK_NAV_ITEMS.map((item, index) => {
          const active = isActive(item.href)
          const hovered = hoveredBtn === index && !active

          return (
            <div key={item.href} className="flex">
              {/* 구분선 (첫 번째 아이템 제외) */}
              {index > 0 && (
                <div
                  style={{
                    width: '1px',
                    backgroundColor: BORDER_COLOR,
                  }}
                />
              )}
              <Link
                href={item.href}
                onMouseEnter={() => setHoveredBtn(index)}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  backgroundColor: active ? ACTIVE_BG : (hovered ? HOVER_BG : INACTIVE_BG),
                  color: active ? ACTIVE_COLOR : INACTIVE_COLOR,
                  padding: isMobile ? '8px 12px' : '10px 24px',
                  fontSize: `${isMobile ? QUICK_NAV_BTN_MOBILE_FONT_SIZE : QUICK_NAV_BTN_FONT_SIZE}px`,
                  fontWeight: QUICK_NAV_BTN_FONT_WEIGHT,
                  whiteSpace: 'nowrap',
                  width: isMobile ? '80px' : '200px',
                  textAlign: 'center',
                }}
              >
                {item.label}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
