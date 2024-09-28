import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req) {
	const token = req.cookies.get("token");

	if (token) {
		const tokenValue = req.cookies.get("token")?.value;
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
	} else {
		if (req.nextUrl.pathname.startsWith("/dashboard")) {
			return NextResponse.redirect(new URL("/", req.nextUrl));
		}
	}
}
