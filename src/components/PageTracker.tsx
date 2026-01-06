"use client"

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// 세션 ID 생성 (브라우저 세션 동안 유지)
function getSessionId() {
  if (typeof window === 'undefined') return ''

  let sessionId = sessionStorage.getItem('visitor_session_id')
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    sessionStorage.setItem('visitor_session_id', sessionId)
  }
  return sessionId
}

// 세션 시작 여부 확인
function isNewSession() {
  if (typeof window === 'undefined') return false
  return !sessionStorage.getItem('session_started')
}

// 세션 시작 표시
function markSessionStarted() {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('session_started', 'true')
}

export default function PageTracker() {
  const pathname = usePathname()
  const enterTimeRef = useRef<string>('')
  const currentPageRef = useRef<string>('')

  useEffect(() => {
    // 관리자 페이지, 로그인 페이지는 추적 제외
    if (pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/api')) {
      return
    }

    const sessionId = getSessionId()

    // 새 세션이면 세션 시작 기록
    if (isNewSession()) {
      const referrer = document.referrer || 'direct'

      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'session_start',
          sessionId,
          referrer,
        }),
      }).catch(console.error)

      markSessionStarted()
    }

    // 페이지 진입 기록
    const enterTime = new Date().toISOString()
    enterTimeRef.current = enterTime
    currentPageRef.current = pathname

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'page_enter',
        sessionId,
        page: pathname,
        enterTime,
      }),
    }).catch(console.error)

    // 페이지 이탈 시 기록 (다른 페이지로 이동 또는 탭 닫기)
    const handlePageExit = () => {
      if (!enterTimeRef.current || !currentPageRef.current) return

      const exitTime = new Date().toISOString()
      const duration = Math.round(
        (new Date(exitTime).getTime() - new Date(enterTimeRef.current).getTime()) / 1000
      )

      // sendBeacon 사용 (페이지 떠날 때도 확실히 전송)
      const data = JSON.stringify({
        action: 'page_exit',
        sessionId,
        page: currentPageRef.current,
        exitTime,
        duration,
      })

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/track', data)
      } else {
        // fallback
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: data,
          keepalive: true,
        }).catch(console.error)
      }
    }

    // 페이지 이탈 이벤트 리스너
    window.addEventListener('beforeunload', handlePageExit)
    window.addEventListener('pagehide', handlePageExit)

    // cleanup: 다른 페이지로 이동 시
    return () => {
      handlePageExit()
      window.removeEventListener('beforeunload', handlePageExit)
      window.removeEventListener('pagehide', handlePageExit)
    }
  }, [pathname])

  // 아무것도 렌더링하지 않음
  return null
}
