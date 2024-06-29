import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const token: any = request.cookies.get('token');
  const url = request.nextUrl.clone();
  const { pathname } = url;
  // Redirect logged-in users away from the login page
  if (pathname === '/login') {
    if (token?.value) {
      try {
        // Token exists, assuming user is logged in, redirect to the home page
        url.pathname = '/';
        return NextResponse.redirect(url);
      } catch (error) {
        // If there's an error (e.g., invalid token), allow user to proceed to login
      }
    }
    // No token, allow to stay on login page
  } else {
    // For other pages, enforce authentication
    try {
      if (!token?.value) throw new Error('No token found');
      // Token is found, proceed to the requested page
    } catch (error) {
      // No token or invalid token, redirect to login
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/', '/login'], // Include login in matcher for specific handling
};
