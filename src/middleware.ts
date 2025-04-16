// based on Nextjs docs: https://nextjs.org/docs/pages/building-your-application/authentication
import { NextRequest, NextResponse } from "next/server"
import { decrypt, deleteSession } from "@/utilities/sessions"
import { cookies } from "next/headers"

// TODO: In an actual app, refactor this. These should be stored in a constant PAGES enum
const protectedRoutes = ["/profile"]
// const publicRoutes = ["/"] // This is included in the documentation, but isn't needed in this implementation. 
const loginRoute = "/"

type SessionData = {
	token: string
	expires: string
}

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname
	const isProtectedRoute = protectedRoutes.includes(path)
	const isLoginRoute = path === loginRoute

	const cookie = (await cookies()).get("session")?.value

	if (isProtectedRoute && !cookie) {
		return NextResponse.redirect(new URL("/", req.nextUrl))
	}

	const session = cookie && (await decrypt(cookie))

	if (isProtectedRoute && !(session as SessionData)?.token) {
		await deleteSession();
		return NextResponse.redirect(new URL("/", req.nextUrl))
	}
	
	if (isLoginRoute && (session as SessionData)?.token){
		return NextResponse.redirect(new URL("/profile", req.nextUrl))
	}

	// These are the remaining public routes. May result in 404
	return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}