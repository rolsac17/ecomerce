// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import endPoints from '@services/api';
import Cookies from 'js-cookie';

const privateRoutes = ['/admin', '/wishlist', '/profile'];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const COOKIE_NAME: string = 'token';
  let token = request.cookies[COOKIE_NAME];
  if (
    privateRoutes.find((route) => route === request.nextUrl.pathname) ||
    request.nextUrl.pathname.includes('/admin')
  ) {
    if (token === undefined) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    try {
      let converterToken = Cookies.converter.read(token, 'token-name');
      const res = await fetch(endPoints.users.currentUser, {
        headers: {
          Authorization: `Bearer ${converterToken}`,
        },
      });

      const { ok } = res;
      if (ok) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL('/auth/login', request.url));
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }
  return NextResponse.next();
}
