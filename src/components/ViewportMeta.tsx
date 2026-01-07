"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// ============================================
// 모바일 뷰포트 설정
// ============================================
// 모바일에서 데스크톱 레이아웃(1080px)을 유지하도록 설정
// 가로 스크롤 없이 화면에 맞게 축소하여 표시
// 단, 모바일 반응형이 필요한 페이지는 제외
// ============================================

const MOBILE_VIEWPORT_WIDTH = 1080  // 모바일에서 고정할 가로 너비 (px)

// 모바일 반응형 레이아웃을 사용하는 페이지 (뷰포트 강제 비활성화)
const RESPONSIVE_PAGES = ["/reservation"]

export default function ViewportMeta() {
  const pathname = usePathname()

  useEffect(() => {
    const updateViewport = () => {
      const viewport = document.querySelector('meta[name="viewport"]')
      const screenWidth = screen.width

      // 반응형 페이지는 뷰포트 강제 설정 비활성화
      const isResponsivePage = RESPONSIVE_PAGES.some(page => pathname?.startsWith(page))

      if (isResponsivePage) {
        // 반응형 페이지: 일반 모바일 뷰포트 사용
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1')
        }
        document.documentElement.style.overflowX = ''
        document.body.style.overflowX = ''
        return
      }

      // 실제 디바이스 화면 너비가 1080px 미만이면 모바일로 판단
      if (screenWidth < MOBILE_VIEWPORT_WIDTH) {
        // 모바일: 1080px 고정 너비로 축소 표시
        if (viewport) {
          viewport.setAttribute(
            'content',
            `width=${MOBILE_VIEWPORT_WIDTH}, initial-scale=${screenWidth / MOBILE_VIEWPORT_WIDTH}, maximum-scale=${screenWidth / MOBILE_VIEWPORT_WIDTH}, user-scalable=no`
          )
        }
        // 가로 스크롤 방지
        document.documentElement.style.overflowX = 'hidden'
        document.body.style.overflowX = 'hidden'
      } else {
        // 데스크톱: 기본 반응형
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1')
        }
        document.documentElement.style.overflowX = ''
        document.body.style.overflowX = ''
      }
    }

    // 초기 실행
    updateViewport()

    // orientation 변경 시에도 업데이트
    window.addEventListener('orientationchange', updateViewport)

    return () => {
      window.removeEventListener('orientationchange', updateViewport)
    }
  }, [pathname])

  return null
}
