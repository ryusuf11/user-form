import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/", "/register"];
const protectedRoutes = ["/home"];
const logoutRoute = "/logout";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("auth_token")?.value;

	const isAuthRoute = authRoutes.some((route) =>
		request.nextUrl.pathname.startsWith(route),
	);

	const isProtectedRoute = protectedRoutes.some((route) =>
		request.nextUrl.pathname.startsWith(route),
	);

	const isLogoutRoute = request.nextUrl.pathname === logoutRoute;

	// Handle logout route
	if (isLogoutRoute) {
		const response = NextResponse.next();
		response.cookies.set("auth_token", "", { maxAge: 0 }); // Clear the token
		return response;
	}

	// If the user has a token and is on a protected route, allow them to access it
	if (token && isProtectedRoute) {
		return NextResponse.next();
	}

	// If the user doesn't have a token and is on a protected route (home), redirect to login
	if (!token && isProtectedRoute) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	// If the user has a token and is on an auth route (login/register), redirect to home
	if (token && isAuthRoute) {
		return NextResponse.redirect(new URL("/home", request.url));
	}

	// Allow other requests to proceed normally
	return NextResponse.next();
}

export const config = {
	matcher: ["/home", "/profile", "/edit-profile", "/logout", "/"],
};
