import { google } from 'googleapis'

// Google Sheets API 인증 설정
const getAuth = () => {
  const credentials = {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

// Google Sheets 인스턴스
const getSheets = async () => {
  const auth = getAuth()
  return google.sheets({ version: 'v4', auth })
}

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID

// ============================================
// 세션 데이터 저장 (Sessions 시트)
// ============================================
export async function saveSession(data: {
  sessionId: string
  ip: string
  city: string
  region: string
  country: string
  device: string
  browser: string
  referrer: string
  startTime: string
}) {
  try {
    const sheets = await getSheets()

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sessions!A:I',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.sessionId,
          data.ip,
          data.city,
          data.region,
          data.country,
          data.device,
          data.browser,
          data.referrer,
          data.startTime,
        ]],
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Session 저장 오류:', error)
    return { success: false, error }
  }
}

// ============================================
// 페이지뷰 데이터 저장 (PageViews 시트)
// ============================================
export async function savePageView(data: {
  sessionId: string
  page: string
  enterTime: string
  exitTime?: string
  duration?: number
}) {
  try {
    const sheets = await getSheets()

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'PageViews!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.sessionId,
          data.page,
          data.enterTime,
          data.exitTime || '',
          data.duration || '',
        ]],
      },
    })

    return { success: true }
  } catch (error) {
    console.error('PageView 저장 오류:', error)
    return { success: false, error }
  }
}

// ============================================
// 페이지뷰 업데이트 (이탈 시간 기록)
// ============================================
export async function updatePageViewExit(data: {
  sessionId: string
  page: string
  exitTime: string
  duration: number
}) {
  try {
    const sheets = await getSheets()

    // 해당 세션의 페이지뷰 찾기
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'PageViews!A:E',
    })

    const rows = response.data.values || []
    let rowIndex = -1

    // 마지막으로 해당 세션/페이지의 레코드 찾기 (exitTime이 비어있는 것)
    for (let i = rows.length - 1; i >= 0; i--) {
      if (rows[i][0] === data.sessionId && rows[i][1] === data.page && !rows[i][3]) {
        rowIndex = i + 1 // 시트는 1부터 시작
        break
      }
    }

    if (rowIndex > 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `PageViews!D${rowIndex}:E${rowIndex}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[data.exitTime, data.duration]],
        },
      })
    }

    return { success: true }
  } catch (error) {
    console.error('PageView 업데이트 오류:', error)
    return { success: false, error }
  }
}

// ============================================
// 통계 데이터 조회
// ============================================
export async function getStats() {
  try {
    const sheets = await getSheets()

    // Sessions 데이터 조회
    const sessionsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sessions!A:I',
    })

    // PageViews 데이터 조회
    const pageViewsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'PageViews!A:E',
    })

    const sessions = sessionsResponse.data.values || []
    const pageViews = pageViewsResponse.data.values || []

    // 헤더 제외
    const sessionData = sessions.slice(1)
    const pageViewData = pageViews.slice(1)

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    // 방문자 통계 계산
    let dailyVisitors = 0
    let weeklyVisitors = 0
    let monthlyVisitors = 0

    // 유입 경로 통계
    const referrerStats: Record<string, number> = {
      '직접 유입': 0,
      '네이버': 0,
      '구글': 0,
      '카카오': 0,
      '당근마켓': 0,
      '인스타그램': 0,
      '기타': 0,
    }

    // 기기 통계
    const deviceStats: Record<string, number> = {
      mobile: 0,
      desktop: 0,
    }

    // 지역 통계
    const regionStats: Record<string, number> = {}

    sessionData.forEach((row) => {
      const startTime = new Date(row[8])
      const referrer = row[7] || ''
      const device = row[5] || ''
      const region = row[3] || '알 수 없음'

      // 일/주/월 방문자 계산
      if (startTime >= today) dailyVisitors++
      if (startTime >= weekAgo) weeklyVisitors++
      if (startTime >= monthAgo) monthlyVisitors++

      // 유입 경로 분류
      if (!referrer || referrer === 'direct') {
        referrerStats['직접 유입']++
      } else if (referrer.includes('naver')) {
        referrerStats['네이버']++
      } else if (referrer.includes('google')) {
        referrerStats['구글']++
      } else if (referrer.includes('kakao')) {
        referrerStats['카카오']++
      } else if (referrer.includes('daangn') || referrer.includes('karrot')) {
        referrerStats['당근마켓']++
      } else if (referrer.includes('instagram')) {
        referrerStats['인스타그램']++
      } else {
        referrerStats['기타']++
      }

      // 기기 분류
      if (device.toLowerCase().includes('mobile')) {
        deviceStats.mobile++
      } else {
        deviceStats.desktop++
      }

      // 지역 통계
      regionStats[region] = (regionStats[region] || 0) + 1
    })

    // 페이지별 방문 통계
    const pageStats: Record<string, { visits: number; totalDuration: number }> = {}

    pageViewData.forEach((row) => {
      const page = row[1] || '/'
      const duration = parseInt(row[4]) || 0

      if (!pageStats[page]) {
        pageStats[page] = { visits: 0, totalDuration: 0 }
      }
      pageStats[page].visits++
      pageStats[page].totalDuration += duration
    })

    // 일별 방문자 (최근 7일)
    const dailyStats: { date: string; count: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
      const dateStr = date.toISOString().split('T')[0]
      const count = sessionData.filter((row) => {
        const rowDate = new Date(row[8]).toISOString().split('T')[0]
        return rowDate === dateStr
      }).length
      dailyStats.push({ date: dateStr, count })
    }

    const totalSessions = sessionData.length

    return {
      success: true,
      data: {
        visitors: {
          daily: dailyVisitors,
          weekly: weeklyVisitors,
          monthly: monthlyVisitors,
          total: totalSessions,
        },
        referrers: Object.entries(referrerStats).map(([name, value]) => ({
          name,
          value: totalSessions > 0 ? Math.round((value / totalSessions) * 100) : 0,
          count: value,
        })),
        devices: {
          mobile: totalSessions > 0 ? Math.round((deviceStats.mobile / totalSessions) * 100) : 0,
          desktop: totalSessions > 0 ? Math.round((deviceStats.desktop / totalSessions) * 100) : 0,
        },
        regions: Object.entries(regionStats)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10),
        pages: Object.entries(pageStats)
          .map(([page, stats]) => ({
            page,
            visits: stats.visits,
            avgDuration: stats.visits > 0 ? Math.round(stats.totalDuration / stats.visits) : 0,
          }))
          .sort((a, b) => b.visits - a.visits),
        dailyTrend: dailyStats,
      },
    }
  } catch (error) {
    console.error('통계 조회 오류:', error)
    return { success: false, error }
  }
}
