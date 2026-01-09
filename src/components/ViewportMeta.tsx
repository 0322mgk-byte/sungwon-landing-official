"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// ============================================
// 모바일 뷰포트 설정
// ============================================
// 모든 페이지에서 모바일 반응형 레이아웃 사용
// ============================================

export default function ViewportMeta() {
  const pathname = usePathname()

  useEffect(() => {
    const updateViewport = () => {
      const viewport = document.querySelector('meta[name="viewport"]')

      // 모든 페이지에서 일반 모바일 뷰포트 사용 (반응형)
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1')
      }
      document.documentElement.style.overflowX = ''
      document.body.style.overflowX = ''
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
