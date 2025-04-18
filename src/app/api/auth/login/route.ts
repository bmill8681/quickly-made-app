// Most of this is from NextJS Documentation
// https://nextjs.org/docs/pages/building-your-application/authentication

// The valuable items here are that we need to securely store the token returned for
// future requests. Having an auth url for revalidating the token would be beneficial.
// In the past, I had used Auth0 by Okta to handle authentication.
// It's also good when working on sensitive tech to review the OWASP standards/recommendations

import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { login } from "@/app/actions/login"
import { createSession } from "@/utilities/sessions"

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json()
		const loginResp = await login({ email, password })
		
		if (!loginResp?.success) {
			return NextResponse.json({ message: "Invalid credentials." }, { status: 401 })
		}
		const sessionCreated = await createSession(loginResp.token as string)

		if (!sessionCreated) throw new Error("Failed to create session")
			
		return NextResponse.redirect(new URL("/profile", req.nextUrl))
	} catch (error) {
		console.error(error)
		return NextResponse.json({ message: "Invalid credentials." }, { status: 500 })
	}
}
