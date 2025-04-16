import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const key = new TextEncoder().encode(process.env.SIGNING_KEY)
const sessionExpiration = "1 day"

export async function encrypt(token: string) {
	return await new SignJWT({ token }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(sessionExpiration).sign(key)
}

export async function decrypt(jwt: string | undefined) {
	if (!jwt) return
	try {
		const { payload } = await jwtVerify(jwt, key, {
			algorithms: ["HS256"],
		})
		return payload
	} catch (err) {
		console.error(err)
		return null
	}
}

const cookie = {
	name: "session",
	options: {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
	},
	expiration: 1000 * 60 * 60 * 24 * 7 , // One week.. but this should ideally be set up to auto-refresh the token if it hasn't expired.
}

export async function createSession(token: string) {
	const expires = new Date(Date.now() + cookie.expiration)
	const session = await encrypt(token)
	const _cookies = await cookies()
	_cookies.set(cookie.name, session, { ...cookie.options, expires })
	return !!session
}

export async function verifySession() {
	const cookie = (await cookies()).get("session")?.value
	const session = await decrypt(cookie)
	return session
}

export async function deleteSession() {
	const _cookies = await cookies()
	_cookies.delete("session")
}
