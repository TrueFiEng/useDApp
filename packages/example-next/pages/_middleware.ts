import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl

  if (pathname == '/') {
    return NextResponse.redirect(`${origin}/balance`)
  }

  return NextResponse.next()
}
