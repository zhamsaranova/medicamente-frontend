import {NextRequest, NextResponse} from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {

  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {return}

  const res = NextResponse.next()

  const query = req.nextUrl.search;

  if (query.includes("utm") && !req.cookies.get('utm')) {
      res.cookies.set('utm', query, {
        httpOnly: false, path: '/'
    })
  }
  return res
}