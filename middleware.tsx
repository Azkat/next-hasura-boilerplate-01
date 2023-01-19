import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'staging') return

  const url = req.nextUrl
  if (!url.pathname.startsWith('/')) return

  const basicAuth = req.headers.get('authorization')

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
