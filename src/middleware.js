import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req) {
	const token = req.cookies.get("token");
	const tokenValue = req.cookies.get("token")?.value;

	if (token) {
		const dataLogin = jwtDecode(tokenValue);
		const role = dataLogin?.role;

		if (req.nextUrl.pathname.startsWith("/login") && token) {
			return NextResponse.redirect(new URL("/", req.nextUrl));
		}

		if (req.nextUrl.pathname.startsWith("/register") && token) {
			return NextResponse.redirect(new URL("/", req.nextUrl));
		}

		if (req.nextUrl.pathname.startsWith("/dashboard") && token && role === "user") {
			return NextResponse.redirect(new URL("/", req.nextUrl));
		}

		if (req.nextUrl.pathname.startsWith("/dashboard") && token && role === "admin") {
			return NextResponse.next();
		}
	}

	if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
		return NextResponse.redirect(new URL("/", req.nextUrl));
	}
}
