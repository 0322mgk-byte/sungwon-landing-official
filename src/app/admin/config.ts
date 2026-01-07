// ============================================
// 📊 관리자 대시보드 설정
// ============================================
// 이 파일은 비개발자도 쉽게 수정할 수 있도록 설정값만 모아놓은 파일입니다.
// 값을 수정한 후 저장하면 페이지에 바로 반영됩니다.
// ============================================

import { Globe, Search, MessageCircle, Share2, TrendingUp } from "lucide-react"

// ============================================
// 🎨 색상 설정
// ============================================
export const ADMIN_BG = "rgba(245,247,250,1)"          // 배경색 - rgba(R,G,B,투명도 0~1)
export const CARD_BG = "rgba(255,255,255,1)"           // 카드 배경색
export const CARD_BORDER_RADIUS = 12                    // 카드 둥글기 (px)
export const CARD_SHADOW = "0 2px 8px rgba(0,0,0,0.08)" // 카드 그림자

export const PRIMARY_COLOR = "rgba(0,28,61,1)"         // 주요 색상
export const ACCENT_COLOR = "rgba(65,105,225,1)"       // 강조 색상
export const TEXT_COLOR = "rgba(50,50,50,1)"           // 기본 텍스트 색상
export const TEXT_LIGHT = "rgba(120,120,120,1)"        // 연한 텍스트 색상

// ============================================
// 🔗 유입 경로 설정
// ============================================
// 유입 경로 아이콘 매핑
export const REFERRER_ICONS: Record<string, typeof Globe> = {
  '직접 유입': Globe,
  '네이버': Search,
  '구글': Search,
  '카카오': MessageCircle,
  '당근마켓': Share2,
  '인스타그램': Share2,
  '기타': TrendingUp,
}

// 유입 경로별 색상
export const REFERRER_COLORS: Record<string, string> = {
  '직접 유입': 'rgba(65,105,225,1)',      // 파란색
  '네이버': 'rgba(0,200,83,1)',           // 녹색
  '구글': 'rgba(66,133,244,1)',           // 구글 파란색
  '카카오': 'rgba(250,225,0,1)',          // 노란색
  '당근마켓': 'rgba(255,126,51,1)',       // 주황색
  '인스타그램': 'rgba(225,48,108,1)',     // 분홍색
  '기타': 'rgba(150,150,150,1)',          // 회색
}

// ============================================
// 📄 페이지 이름 설정
// ============================================
export const PAGE_NAMES: Record<string, string> = {
  '/': '메인 페이지',
  '/location': '입지환경',
  '/premium': '프리미엄',
  '/complex/site-plan': '단지배치도',
  '/complex/unit-layout': '동호수배치도',
  '/complex/community': '커뮤니티',
  '/unit/type': '타입안내',
  '/unit/interior': '인테리어',
  '/reservation': '방문예약',
}

// ============================================
// 📈 통계 데이터 타입
// ============================================
export interface StatsData {
  visitors: {
    daily: number
    weekly: number
    monthly: number
    total: number
  }
  referrers: { name: string; value: number; count: number }[]
  devices: { mobile: number; desktop: number }
  regions: { name: string; count: number }[]
  pages: { page: string; visits: number; avgDuration: number }[]
  dailyTrend: { date: string; count: number }[]
}
