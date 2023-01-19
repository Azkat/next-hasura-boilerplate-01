import { NextRequest, NextResponse } from 'next/server'

export function middleware(req) {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview') return

  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':')

    if (
      user === process.env.NEXT_PUBLIC_BASIC_USER &&
      pwd === process.env.NEXT_PUBLIC_BASIC_PASS
    ) {
      return NextResponse.next()
    }
  }
  url.pathname = '/api/basicAuth'

  return NextResponse.rewrite(url)
}
