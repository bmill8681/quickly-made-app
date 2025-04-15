// Most of this is from NextJS Documentation
// https://nextjs.org/docs/pages/building-your-application/authentication

// The valuable items here are that we need to securely store the token returned for
// future requests. Having an auth url for revalidating the token would be beneficial.
// In the past, I had used Auth0 by Okta to handle authentication.
// It's also good when working on sensitive tech to review the OWASP standards/recommendations

import { serialize } from "cookie"
import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { login } from "@/app/actions/login"
import { encryptSession } from "@/utilities/sessions"

const expiration = 60 * 60 * 24 * 7 // One Week

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json()
		const loginResp = await login({ email, password })

		if (!loginResp?.success) {
			return NextResponse.json({ message: "Invalid credentials." }, { status: 401 })
		}
		const encryptedSessionData = await encryptSession({ token: loginResp.token })

		const cookie = serialize("session", encryptedSessionData, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: expiration,
			path: "/",
		})

		const _cookies = await cookies()

		_cookies.set("session", cookie, {
			httpOnly: true, 
			secure: process.env.NODE_ENV === 'production',
			maxAge: expiration, 
		})

		return new Response("Success!", {
			status: 200,
		})
	} catch (error) {
		console.error(error)
		return NextResponse.json({ message: "Invalid credentials." }, { status: 500 })
	}
}
