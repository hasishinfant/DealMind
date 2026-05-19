import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })

  // Clear auth cookies
  response.cookies.delete('instagram_token')
  response.cookies.delete('instagram_user')

  return response
}
