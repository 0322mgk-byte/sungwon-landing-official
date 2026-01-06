import { NextRequest, NextResponse } from 'next/server'
import { saveSession, savePageView, updatePageViewExit } from '@/lib/googleSheets'

// IP에서 지역 정보 조회 (ip-api.com 사용 - 무료)
async function getGeoInfo(ip: string) {
  try {
    // localhost인 경우 기본값 반환
    if (ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') {
      return {
        city: '로컬',
        region: '개발환경',
        country: 'KR',
      }
    }

    const response = await fetch(`http://ip-api.com/json/${ip}?lang=ko`)
    const data = await response.json()

    if (data.status === 'success') {
      return {
        city: data.city || '알 수 없음',
        region: data.regionName || '알 수 없음',
        country: data.countryCode || 'KR',
      }
    }

    return { city: '알 수 없음', region: '알 수 없음', country: 'KR' }
  } catch (error) {
    console.error('IP 조회 오류:', error)
    return { city: '알 수 없음', region: '알 수 없음', country: 'KR' }
  }
}

// User-Agent에서 기기 정보 추출
function parseUserAgent(userAgent: string) {
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  const device = isMobile ? 'mobile' : 'desktop'

  let browser = 'unknown'
  if (userAgent.includes('Chrome')) browser = 'Chrome'
  else if (userAgent.includes('Safari')) browser = 'Safari'
  else if (userAgent.includes('Firefox')) browser = 'Firefox'
  else if (userAgent.includes('Edge')) browser = 'Edge'
  else if (userAgent.includes('Opera')) browser = 'Opera'

  return { device, browser }
}

// Referrer 분류
function classifyReferrer(referrer: string) {
  if (!referrer) return 'direct'
  return referrer
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, sessionId, page, enterTime, exitTime, duration, referrer } = body

    // 클라이언트 IP 가져오기
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || '127.0.0.1'

    // User-Agent 가져오기
    const userAgent = request.headers.get('user-agent') || ''

    if (action === 'session_start') {
      // 새 세션 시작: IP 조회 + 세션 저장
      const geoInfo = await getGeoInfo(ip)
      const { device, browser } = parseUserAgent(userAgent)
      const classifiedReferrer = classifyReferrer(referrer)

      await saveSession({
        sessionId,
        ip,
        city: geoInfo.city,
        region: geoInfo.region,
        country: geoInfo.country,
        device,
        browser,
        referrer: classifiedReferrer,
        startTime: new Date().toISOString(),
      })

      return NextResponse.json({ success: true, geoInfo })
    }

    if (action === 'page_enter') {
      // 페이지 진입 기록
      await savePageView({
        sessionId,
        page,
        enterTime,
      })

      return NextResponse.json({ success: true })
    }

    if (action === 'page_exit') {
      // 페이지 이탈 기록
      await updatePageViewExit({
        sessionId,
        page,
        exitTime,
        duration,
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Tracking error:', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
