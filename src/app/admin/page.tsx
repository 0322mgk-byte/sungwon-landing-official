"use client"

import { useState, useEffect } from "react"
import { Users, TrendingUp, Calendar, Globe, Monitor, Smartphone, RefreshCw, MapPin, Clock } from "lucide-react"

// 설정값 import (config.ts에서 값 수정 가능)
import {
  ADMIN_BG,
  CARD_BG,
  CARD_BORDER_RADIUS,
  CARD_SHADOW,
  PRIMARY_COLOR,
  ACCENT_COLOR,
  TEXT_COLOR,
  TEXT_LIGHT,
  REFERRER_ICONS,
  REFERRER_COLORS,
  PAGE_NAMES,
  StatsData,
} from "./config"

export default function AdminPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 시간 업데이트 (클라이언트에서만)
  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // 통계 데이터 로드
  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/stats')
      if (!response.ok) throw new Error('통계 데이터를 불러올 수 없습니다')
      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류')
      // 에러 시 샘플 데이터 표시
      setStats({
        visitors: { daily: 0, weekly: 0, monthly: 0, total: 0 },
        referrers: [
          { name: '직접 유입', value: 0, count: 0 },
          { name: '네이버', value: 0, count: 0 },
          { name: '카카오', value: 0, count: 0 },
          { name: '인스타그램', value: 0, count: 0 },
          { name: '기타', value: 0, count: 0 },
        ],
        devices: { mobile: 0, desktop: 0 },
        regions: [],
        pages: [],
        dailyTrend: [],
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  // 요일 변환
  const getDayLabel = (dateStr: string) => {
    const date = new Date(dateStr)
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return days[date.getDay()]
  }

  const maxDailyCount = stats?.dailyTrend?.length
    ? Math.max(...stats.dailyTrend.map(d => d.count), 1)
    : 1

  const totalPageViews = stats?.pages?.reduce((sum, p) => sum + p.visits, 0) || 1

  return (
    <main className="min-h-screen" style={{ backgroundColor: ADMIN_BG }}>
      {/* 상단 헤더 */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ backgroundColor: PRIMARY_COLOR }}
      >
        <h1 className="text-xl font-bold text-white">
          성원상떼빌 관리자 대시보드
        </h1>
        <div className="flex items-center gap-6">
          <span className="text-white/80 text-sm">
            {currentTime ? (
              <>
                {currentTime.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })} {currentTime.toLocaleTimeString('ko-KR')}
              </>
            ) : (
              '로딩 중...'
            )}
          </span>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            새로고침
          </button>
          <a
            href="/"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
          >
            사이트로 이동
          </a>
          <a
            href="/login"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
          >
            로그아웃
          </a>
        </div>
      </header>

      {/* 에러 메시지 */}
      {error && (
        <div className="mx-8 mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            ⚠️ {error} - Google Sheets 연동 설정을 확인해주세요.
          </p>
        </div>
      )}

      {/* 대시보드 컨텐츠 */}
      <div className="p-8">
        {/* 방문자 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* 일 방문자 */}
          <div
            className="p-6"
            style={{
              backgroundColor: CARD_BG,
              borderRadius: `${CARD_BORDER_RADIUS}px`,
              boxShadow: CARD_SHADOW,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(65,105,225,0.1)' }}
              >
                <Users size={24} style={{ color: ACCENT_COLOR }} />
              </div>
              <span style={{ color: TEXT_LIGHT, fontSize: '14px' }}>오늘 방문자</span>
            </div>
            <p className="text-3xl font-bold" style={{ color: TEXT_COLOR }}>
              {loading ? '-' : stats?.visitors.daily.toLocaleString()}
              <span className="text-lg font-normal ml-1" style={{ color: TEXT_LIGHT }}>명</span>
            </p>
          </div>

          {/* 주 방문자 */}
          <div
            className="p-6"
            style={{
              backgroundColor: CARD_BG,
              borderRadius: `${CARD_BORDER_RADIUS}px`,
              boxShadow: CARD_SHADOW,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0,200,83,0.1)' }}
              >
                <Calendar size={24} style={{ color: 'rgba(0,180,70,1)' }} />
              </div>
              <span style={{ color: TEXT_LIGHT, fontSize: '14px' }}>이번 주</span>
            </div>
            <p className="text-3xl font-bold" style={{ color: TEXT_COLOR }}>
              {loading ? '-' : stats?.visitors.weekly.toLocaleString()}
              <span className="text-lg font-normal ml-1" style={{ color: TEXT_LIGHT }}>명</span>
            </p>
          </div>

          {/* 월 방문자 */}
          <div
            className="p-6"
            style={{
              backgroundColor: CARD_BG,
              borderRadius: `${CARD_BORDER_RADIUS}px`,
              boxShadow: CARD_SHADOW,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(255,150,0,0.1)' }}
              >
                <TrendingUp size={24} style={{ color: 'rgba(255,150,0,1)' }} />
              </div>
              <span style={{ color: TEXT_LIGHT, fontSize: '14px' }}>이번 달</span>
            </div>
            <p className="text-3xl font-bold" style={{ color: TEXT_COLOR }}>
              {loading ? '-' : stats?.visitors.monthly.toLocaleString()}
              <span className="text-lg font-normal ml-1" style={{ color: TEXT_LIGHT }}>명</span>
            </p>
          </div>

          {/* 전체 방문자 */}
          <div
            className="p-6"
            style={{
              backgroundColor: CARD_BG,
              borderRadius: `${CARD_BORDER_RADIUS}px`,
              boxShadow: CARD_SHADOW,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(150,100,200,0.1)' }}
              >
                <Globe size={24} style={{ color: 'rgba(150,100,200,1)' }} />
              </div>
              <span style={{ color: TEXT_LIGHT, fontSize: '14px' }}>전체 누적</span>
            </div>
            <p className="text-3xl font-bold" style={{ color: TEXT_COLOR }}>
              {loading ? '-' : stats?.visitors.total.toLocaleString()}
              <span className="text-lg font-normal ml-1" style={{ color: TEXT_LIGHT }}>명</span>
            </p>
          </div>
        </div>

        {/* 중간 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* 유입 경로 */}
          <div
            className="p-6 lg:col-span-1"
            style={{
              backgroundColor: CARD_BG,
              borderRadius: `${CARD_BORDER_RADIUS}px`,
              boxShadow: CARD_SHADOW,
            }}
          >
            <h2 className="text-lg font-bold mb-6" style={{ color: TEXT_COLOR }}>
              유입 경로
            </h2>
            <div className="space-y-4">
              {stats?.referrers.map((source, index) => {
                const Icon = REFERRER_ICONS[source.name] || Globe
                const color = REFERRER_COLORS[source.name] || 'rgba(150,150,150,1)'
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span style={{ color: TEXT_COLOR, fontSize: '14px' }}>{source.name}</span>
                        <span style={{ color: TEXT_LIGHT, fontSize: '14px', fontWeight: 600 }}>
                          {source.value}% ({source.count}명)
                        </span>
                      </div>
                      <div
                        className="h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'rgba(230,230,230,1)' }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${source.value}%`,
                            backgroundColor: color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 주간 방문자 차트 */}
          <div
            className="p-6 lg:col-span-1"
            style={{
              backgroundColor: CARD_BG,
              borderRadius: `${CARD_BORDER_RADIUS}px`,
              boxShadow: CARD_SHADOW,
            }}
          >
            <h2 className="text-lg font-bold mb-6" style={{ color: TEXT_COLOR }}>
              최근 7일 방문자 추이
            </h2>
            <div className="flex items-end justify-between gap-2 h-48">
              {stats?.dailyTrend.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <span style={{ color: TEXT_LIGHT, fontSize: '11px' }}>{day.count}</span>
                  <div
                    className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80"
                    style={{
                      height: `${(day.count / maxDailyCount) * 100}%`,
                      backgroundColor: index === (stats?.dailyTrend.length || 0) - 1 ? ACCENT_COLOR : 'rgba(200,210,225,1)',
                      minHeight: '20px',
                    }}
                  />
                  <span style={{ color: TEXT_LIGHT, fontSize: '12px' }}>{getDayLabel(day.date)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 접속 기기 */}
          <div
            className="p-6 lg:col-span-1"
            style={{
              backgroundColor: CARD_BG,
              borderRadius: `${CARD_BORDER_RADIUS}px`,
              boxShadow: CARD_SHADOW,
            }}
          >
            <h2 className="text-lg font-bold mb-6" style={{ color: TEXT_COLOR }}>
              접속 기기
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} style={{ color: TEXT_LIGHT }} />
                    <span style={{ color: TEXT_COLOR, fontSize: '14px' }}>모바일</span>
                  </div>
                  <span style={{ color: ACCENT_COLOR, fontSize: '20px', fontWeight: 700 }}>
                    {stats?.devices.mobile || 0}%
                  </span>
                </div>
                <div
                  className="h-3 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'rgba(230,230,230,1)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${stats?.devices.mobile || 0}%`,
                      backgroundColor: ACCENT_COLOR,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Monitor size={20} style={{ color: TEXT_LIGHT }} />
                    <span style={{ color: TEXT_COLOR, fontSize: '14px' }}>데스크톱</span>
                  </div>
                  <span style={{ color: 'rgba(150,170,200,1)', fontSize: '20px', fontWeight: 700 }}>
                    {stats?.devices.desktop || 0}%
                  </span>
                </div>
                <div
                  className="h-3 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'rgba(230,230,230,1)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${stats?.devices.desktop || 0}%`,
                      backgroundColor: 'rgba(150,170,200,1)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 지역별 통계 */}
            {stats?.regions && stats.regions.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: TEXT_COLOR }}>
                  <MapPin size={16} /> 방문자 지역
                </h3>
                <div className="space-y-2">
                  {stats.regions.slice(0, 5).map((region, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span style={{ color: TEXT_LIGHT }}>{region.name}</span>
                      <span style={{ color: TEXT_COLOR, fontWeight: 500 }}>{region.count}명</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 페이지별 방문 현황 */}
        <div
          className="p-6"
          style={{
            backgroundColor: CARD_BG,
            borderRadius: `${CARD_BORDER_RADIUS}px`,
            boxShadow: CARD_SHADOW,
          }}
        >
          <h2 className="text-lg font-bold mb-6" style={{ color: TEXT_COLOR }}>
            페이지별 방문 현황
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(230,230,230,1)' }}>
                  <th className="text-left py-3 px-4" style={{ color: TEXT_LIGHT, fontSize: '13px', fontWeight: 500 }}>페이지</th>
                  <th className="text-right py-3 px-4" style={{ color: TEXT_LIGHT, fontSize: '13px', fontWeight: 500 }}>방문수</th>
                  <th className="text-right py-3 px-4" style={{ color: TEXT_LIGHT, fontSize: '13px', fontWeight: 500 }}>비율</th>
                  <th className="text-right py-3 px-4" style={{ color: TEXT_LIGHT, fontSize: '13px', fontWeight: 500 }}>
                    <span className="flex items-center justify-end gap-1">
                      <Clock size={14} /> 평균 체류
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats?.pages.map((row, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(240,240,240,1)' }}>
                    <td className="py-3 px-4" style={{ color: TEXT_COLOR, fontSize: '14px' }}>
                      {PAGE_NAMES[row.page] || row.page}
                    </td>
                    <td className="text-right py-3 px-4" style={{ color: TEXT_COLOR, fontSize: '14px', fontWeight: 600 }}>
                      {row.visits.toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-4" style={{ color: ACCENT_COLOR, fontSize: '14px', fontWeight: 600 }}>
                      {Math.round((row.visits / totalPageViews) * 100)}%
                    </td>
                    <td className="text-right py-3 px-4" style={{ color: TEXT_LIGHT, fontSize: '14px' }}>
                      {row.avgDuration > 60
                        ? `${Math.floor(row.avgDuration / 60)}분 ${row.avgDuration % 60}초`
                        : `${row.avgDuration}초`}
                    </td>
                  </tr>
                ))}
                {(!stats?.pages || stats.pages.length === 0) && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center" style={{ color: TEXT_LIGHT }}>
                      아직 방문 데이터가 없습니다
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
