import { NextResponse } from 'next/server'
import { getStats } from '@/lib/googleSheets'

export async function GET() {
  try {
    const result = await getStats()

    if (result.success) {
      return NextResponse.json(result.data)
    } else {
      return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
    }
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
